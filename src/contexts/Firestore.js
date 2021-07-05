import { db } from '../services/firebase';

export async function getById(table, id) {
    const snapshot = await db.collection(table).doc(id).get();
    return { ...snapshot.data(), id: snapshot.id };
}

export async function getServicesByUser(userId) {
    const postData = [];
    const snapshot = await db.collection("services").where("userId", "==", userId).get();
    snapshot.docs.map(doc => postData.push({ ...doc.data(), id: doc.id }));
    return postData;
}

export async function getProductsByService(id) {
    const postData = [];
    const snapshot = await db.collection("products").where("serviceId", "==", id).get();
    snapshot.docs.map(doc => postData.push({ ...doc.data(), id: doc.id }));
    return postData;
}

export async function getProductsServices(id) {
    const postData = [];
    const snapshot = await db.collection("products_services").where("serviceId", "==", id).get();
    snapshot.docs.map(doc => postData.push({ ...doc.data(), id: doc.id }));
    return postData;
}

export function createService(userId) {
    return db.collection("services").add({
        userId: userId,
        status: "in progress",
        startTime: new Date(),
        endTime: "",
        name: "New service",
        otherCost: 0,
        priceHour: 0,
        serviceHour: 0,
        travelCost: 0,
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            return docRef;
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            return null;
        });
}

export function createProdService(serviceId) {
    db.collection("products_services").add({
        serviceId: serviceId,
        totalService: 0,
        totalProduct: 0,
        total: 0,
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

export async function createProducts(serviceId, t) {
    const total = await calculateProduct(t.quantity, t.price)
    return db.collection("products").add({
        description: t.description,
        name: t.name,
        price: t.price,
        quantity: t.quantity,
        serviceId: serviceId,
        total: total
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            return docRef;
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            return null;
        });
}

export async function updateService(tId, t) {
    let priceHour = 0;
    let doc = null;
    const endTime = new Date(t.endTime)
    priceHour = await calculatePriceHour(endTime, t.startTime, t.serviceHour);

    doc = db.collection("services").doc(tId).update({
        status: "done",
        endTime: endTime,
        name: t.name,
        otherCost: t.otherCost,
        priceHour: priceHour,
        serviceHour: t.serviceHour,
        travelCost: t.travelCost,
    }).then((docRef) => {
        console.log('Atualizado com sucesso!');
        return docRef;
    })
        .catch(error => { // The document probably doesn't exist.
            console.error('Erro ao atualizar: ', error);
            return null;
        });

    if (doc !== null) {
        return priceHour;
    }
    return 0;
}

export function updateProducts(tId, t) {
    const total = calculateProduct(t.quantity, t.price)
    return db.collection("products").doc(tId).update({
        description: t.description,
        name: t.name,
        price: t.price,
        quantity: t.quantity,
        total: total
    }).then((docRef) => {
        console.log('Atualizado com sucesso!');
        return docRef;
    })
        .catch(error => { // The document probably doesn't exist.
            console.error('Erro ao atualizar: ', error);
            return null;
        });
}

export async function updateProdService(tId, t, priceHour) {
    const prod = await getProductsByService(tId);
    let totalProd = 0;
    prod.length === 1 ? totalProd = prod[0].total :
        prod.length === 0 ? totalProd = 0 :
            totalProd = prod.reduce((a, b) => a.total + b.total)

    const totalService = await calculateService(t.travelCost, t.otherCost, priceHour)
    const total = totalService + totalProd;

    return db.collection("products_services").add({
        serviceId: tId,
        totalService: totalService,
        totalProduct: totalProd,
        total: total,
    }).then((docRef) => {
        console.log('product_service criado com sucesso!');
        return docRef;
    })
        .catch(error => { // The document probably doesn't exist.
            console.error('Erro ao criar o doc: ', error);
            return null;
        });
}

function calculatePriceHour(endTime, startTime, serviceHour) {
    endTime = new Date(endTime);
    let miliseconds = endTime.getTime() - startTime.getTime();
    let hour = (miliseconds / 3600000);
    let priceHour = serviceHour * hour;
    priceHour = parseFloat(priceHour.toFixed(2));
    return priceHour;
}

function calculateService(travelCost, otherCost, priceHour) {
    travelCost = parseFloat(travelCost);
    otherCost = parseFloat(otherCost);
    return parseFloat((travelCost + otherCost + priceHour).toFixed(2));
}

function calculateProduct(quantity, price) {
    quantity = parseFloat(quantity);
    price = parseFloat(price);
    let total = quantity * price;
    return total;
}
