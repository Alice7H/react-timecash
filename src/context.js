import React, { useState, useContext, useEffect, useCallback } from 'react';
import { usersDb } from '../src/components/data/db';

const UserContext = React.createContext();

export function useAuth() {
    return useContext(UserContext);
}

export default function UserProvider({children}) {

    // const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    let userEmail = localStorage.getItem("userEmail");
    let userPassword = localStorage.getItem("userPassword"); 

    // async function getUsers() {
    //     let tempUsers = [];
    //     await usersDb.map(item => {
    //         const singleItem = {...item};
    //         return tempUsers = [...tempUsers, singleItem];
    //     });
    //    setUsers(tempUsers);
    // }

    // useEffect(()=>{
    //     getUsers();
    // },[])

    const signup = useCallback(async () => {
        let selectedUser = await usersDb.find(user => (user.email === userEmail && user.password === userPassword))
        setUser(selectedUser)
        setLoading(false)
    },[userEmail, userPassword])

    useEffect(() => {
        if ("userEmail" in localStorage && "userPassword" in localStorage) {
            signup();
        }
    }, [signup])

    function logout() {
        localStorage.clear();
        setUser(null);
        setLoading(false);
    }

    function handleProduct(note, prodId) {
        note.products.forEach(item => {
            return item.id === prodId ? item : null;
        }) 
    }

    function handleProducts(id) {
        const note = handleNote(id);
        return note.products; 
    }

    function handleNote(id) {
        const note = user.notes.find(note => (note.id === id));
        return note;
    }

    function register(data) {
        const lastItem = usersDb.pop();
        const index = parseInt(lastItem.id) + 1;

        const newUser = {
            id: index,
            name: data.name,
            email: data.email,
            password: data.password,
            notes: []
        }
        
        // setUsers(previewUsers => [...previewUsers, newUser]);
        setUser(newUser);
        setLoading(false);
    }

    function addNote() {  
        const newNote = {};
        newNote.id =  user.notes.length ==='undefined' ? 0 : user.notes.length.toString();
        newNote.status = "in progress";
        newNote.priceHour = "0";
        newNote.totalProducts =  "0";
        newNote.total = "0";
        newNote.service = {
            startTime: new Date().toISOString(),
            endTime: "",
            name: "New Service",
            serviceHour: "0",
            travelCost: "0",
            otherCost: "0",
            totalValue: "0",
        };
        newNote.products = [];
        
        // setNotes(prevNote => [...prevNote, newNote]);
        setUser(prevState => ({
            ...prevState, 
            notes: [...prevState.notes, newNote]})) 
    }

    function updateService(data) {
        let priceHour = calculatePriceHour(data.endTime, data.startTime, data.serviceHour);
        let priceService = calculateService(data.travelCost, data.otherCost, priceHour);
  
        let note = user.notes[data.id];
        note.status = "done";
        note.priceHour = priceHour.toString();
        note.total = parseFloat(note.total) + priceService;
        note.total = note.total.toFixed(2);
        
        note.service = {
            startTime: new Date(note.service.startTime).toISOString(),
            endTime: new Date(data.endTime).toISOString(),
            name: data.name,
            serviceHour: data.serviceHour.toString(),
            travelCost: data.travelCost.toString(),
            otherCost: data.otherCost.toString(),
            totalValue: priceService.toString(),
        };

        // setNotes(user.notes.map(item => {
        //     return (item.id === data.id ? note: item);
        // }));
   

        setUser(prevState => ({
            ...prevState,
            notes: prevState.notes.map(el => {
                if(el.id === data.id ) {
                    return note; 
                }else{
                    return el;
                }
            })
        })) 
    }

    function addProduct(data) {
        const prod = [];
        let note = handleNote(data.id);
        let index = note.products.length; 
        let item = {};
        let totalprod =  calculateProduct(data.quantity, data.price);
        item = {
            id: index,
            name: data.name,
            description: data.description,
            price: data.price.toString(),
            quantity: data.quantity.toString(),
            total: totalprod.toString(),
        }
        
        prod[index] = item;
        // update total in note
        note.total = parseFloat(note.total) + totalprod;
        // update totalProducts in note;
        note.totalProducts = parseFloat(note.totalProducts) + totalprod;
        // map note and map product
        setUser(prevState => ({
            ...prevState,
            notes: prevState.notes.map(el => {
                if(el.id === data.id ) {
                    el.total = note.total.toString();
                    el.totalProducts = note.totalProducts.toString();
                    el.products[index] =  prod[index]; 
                }
                return el;
            })
        })) 
    }

    function updateProduct(data) {
        const totalprod = calculateProduct(data.quantity, data.price);
        let note = handleNote(data.id);
        let item = note.products[data.prodId];
        let prod = [];
        let updatedItem = {
            id: data.prodId,
            description: data.description,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            total: totalprod.toString(),
        };
        
        prod[data.prodId] = updatedItem;
       
        if( parseFloat(item.total) !== totalprod ) {
            let oldProd = parseFloat(item.total);
            let oldTotalProd = parseFloat(note.totalProducts) - oldProd;
            let newTotalProd = oldTotalProd + totalprod;
            note.totalProducts = newTotalProd;
            
            let oldTotal = parseFloat(note.total) - parseFloat(item.total);
            let newTotal = oldTotal + totalprod;
            note.total = newTotal;
        }
   
        // update note and product
        setUser(prevState => ({
            ...prevState,
            notes: prevState.notes.map(el => {
                if(el.id === data.id ) {
                    let newElement = el;
                    newElement.total = note.total.toString();
                    newElement.totalProducts = note.totalProducts.toString();
                    newElement.products[data.prodId] = prod[data.prodId]; 
                    return newElement;
                }
                return el;
            })
        }))
    }

    function calculatePriceHour(endTime, startTime, serviceHour) {
        console.log("price Hour");
        endTime = new Date(endTime);
        let miliseconds =  endTime.getTime() - startTime.getTime();
        let hour = (miliseconds / 3600000);
        let priceHour = serviceHour * hour;
        priceHour = parseFloat(priceHour.toFixed(2));
        return priceHour;
    }

    function calculateService(travelCost, otherCost, priceHour) {
        console.log('total service');
        travelCost = parseFloat(travelCost);
        otherCost = parseFloat(otherCost);
        return parseFloat((travelCost + otherCost + priceHour).toFixed(2));
    }

    function calculateProduct(quantity, price){
        console.log("product added in note");
        quantity = parseFloat(quantity);
        price = parseFloat(price);
        let total = quantity * price;
        return total;
    }

    // const calculateProductsNote = (id) => {
    //     console.log("All products in note " + id);
    //     let total = 0;
    //     user.notes[id].products.map(prod => { 
    //         return total += prod.total;
    //     })
    // }

    return (
        <UserContext.Provider value = {{
            user,
            // users,
            loading,
            signup,
            register,
            logout,
            addNote,
            addProduct,
            updateProduct,
            handleProduct,
            handleProducts,
            updateService,
            handleNote,
            calculatePriceHour,
            calculateService,
            calculateProduct
        }}>
            {children}
        </UserContext.Provider>
    )
}

// const UserConsumer = UserContext.Consumer;
// export {UserProvider, UserConsumer};
