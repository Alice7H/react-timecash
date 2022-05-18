import { db } from './firebase';

export async function getById(table, id) {
    const snapshot = await db.collection(table).doc(id).get();
    return { ...snapshot.data(), id: snapshot.id };
}

export async function getServicesByUser(userId) {
    const postData = [];
    const snapshot = await db.collection("services").where("userId", "==", userId).get();
    snapshot.docs.map(doc => postData.push({ ...doc.data(), id: doc.id }));
    postData.sort((a,b) => b.startTime - a.startTime);
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

export function createProducts(serviceId, t, total) {
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
        return error;
    });
}

export function updateService(tId, t, endTime, priceHour) {
    return db.collection("services").doc(tId).update({
        status: "done",
        endTime: endTime,
        name: t.name,
        otherCost: t.otherCost,
        priceHour: priceHour,
        serviceHour: t.serviceHour,
        travelCost: t.travelCost,
    })
    .then(() => {
        console.log('Atualizado com sucesso!');
        return 'ok';
    })
    .catch(error => { // The document probably doesn't exist.
        console.error('Erro ao atualizar: ', error);
    });
}

export function updateProducts(tId, t, total) {
    return db.collection("products").doc(tId).update({
        description: t.description,
        name: t.name,
        price: t.price,
        quantity: t.quantity,
        total: total
    })
    .then(() => {
        console.log('Atualizado com sucesso!');
        return 'ok';
    })
    .catch(error => { // The document probably doesn't exist.
        console.error('Erro ao atualizar: ', error);
    });
}



export async function createProdService(tId, total, totalService, totalProd) {
    return db.collection("products_services").add({
        serviceId: tId,
        totalService: totalService,
        totalProduct: totalProd,
        total: total,
    })
    .then((docRef) => {
        console.log('product_service criado com sucesso!');
        return docRef;
    })
    .catch(error => { // The document probably doesn't exist.
        console.error('Erro ao criar o doc: ', error);
    });
}
