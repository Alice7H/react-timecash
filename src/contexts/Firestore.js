import {db} from '../firebase';

    export async function getById(table, id) {
       const snapshot =  await db.collection(table).doc(id).get();
       return {...snapshot.data(), id: snapshot.id};
    }

    export async function getServicesByUser(userId) {
        const postData = [];
        const snapshot = await db.collection("services").where("userId", "==", userId).get();
        snapshot.docs.map( doc => postData.push({ ...doc.data(), id: doc.id }));

        if(postData.length > 0) {
            return postData;
        }
        return null;
    }

    export async function getProductsByService(id) {
        const postData = [];
        const snapshot = await db.collection("products").where("serviceId", "==", id).get();
        snapshot.docs.map( doc => postData.push({ ...doc.data(), id: doc.id }));
  
        return postData;
    }

    export async function getProductsServices(id){
        const postData = [];
        const snapshot = await db.collection("products_services").where("serviceId", "==", id).get();
        snapshot.docs.map( doc => postData.push({ ...doc.data(), id: doc.id }));
        return postData; 
    }

    export function createService(userId) {
        // firebase.firestore.FieldValue.serverTimestamp()
        db.collection("services").add({
            userId: userId,
            status: "in progress",
            startTime: new Date(),
            endTime:  "",
            name: "New service ",
            otherCost: 0,
            priceHour: 0,
            serviceHour: 0,
            travelCost: 0,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
          
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

    export function createProducts(serviceId, t) {
        const total = calculateProduct(t.quantity, t.price)
        db.collection("products").add({
            description: t.description,
            name: t.name,
            price: t.price,
            quantity: t.quantity,
            serviceId: serviceId,
            total: total
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    export async function updateService(tId, t) {
        const endTime = new Date(t.endTime)
        const priceHour = await calculatePriceHour(endTime, t.startTime, t.serviceHour) 
        try {
            db.collection("services").doc(tId).update({
                status: "done",
                endTime: endTime,
                name: t.name,
                otherCost: t.otherCost,
                priceHour: priceHour,
                serviceHour: t.serviceHour,
                travelCost: t.travelCost,
            }).then( () => {
                console.log('Atualizado com sucesso!');
            })
            .catch( error => { // The document probably doesn't exist.
                console.error('Erro ao atualizar: ', error);
            });
        }catch {
            console.log("Erro ao criar products_services ou atualizar services");
        }  
        
        return priceHour;
    }

    export function updateProducts(tId, t) {
        const total = calculateProduct(t.quantity, t.price)
        db.collection("products").doc(tId).update({
            description: t.description,
            name: t.name,
            price: t.price,
            quantity: t.quantity,
            total: total  
        }).then( () => {
           console.log('Atualizado com sucesso!');
        })
        .catch( error => { // The document probably doesn't exist.
            console.error('Erro ao atualizar: ', error);
        });
    }

    export async function updateProdService(tId, t, priceHour) {
        const prod = await getProductsByService(tId);
        let totalProd = 0;
        prod.length === 1 ? totalProd = prod[0].total : 
        prod.length === 0 ? totalProd = 0 : 
        totalProd = prod.reduce((a, b) => a.total + b.total)
        
        const totalService = calculateService(t.travelCost, t.otherCost, priceHour)
        const total = totalService + totalProd;

        db.collection("products_services").add({
            serviceId: tId,
            totalService: totalService,
            totalProduct: totalProd,
            total: total,
        }).then(() => {
            console.log('product_service criado com sucesso!');
        })
        .catch( error => { // The document probably doesn't exist.
            console.error('Erro ao criar o doc: ', error);
        });
    }

    function calculatePriceHour(endTime, startTime, serviceHour) {
        endTime = new Date(endTime);
        let miliseconds =  endTime.getTime() - startTime.getTime();
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

    function calculateProduct(quantity, price){
        quantity = parseFloat(quantity);
        price = parseFloat(price);
        let total = quantity * price;
        return total;
    }
