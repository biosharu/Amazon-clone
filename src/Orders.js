import React, { useEffect, useState } from 'react'
import './Orders.css';
import {db} from './firebase';
import { useStateValue } from './StateProdiver';
import Order from './Order';


function Orders() {
    const [orders, setOrders] = useState([]);
    const [{basket, user}, dispatch] = useStateValue();
    
    useEffect(() => {
        if(user){
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot((snapshot) => {
                setOrders(snapshot.docs.map(doc => ({
                    id : doc.id,
                    data : doc.data()
                })))
                // snapshot.forEach(doc => {
                //     setOrders(orders => [...orders,  {id : doc.id, data : doc.data()}])
                // })
            })
 
        }
        else{
            setOrders([]);
        }
        
    }, [user])
    console.log("this is  orders >>" , orders);   
    return (
        <div className="orders">
            <h1>Your Order</h1>
            <div className="orders__order">
                {orders?.map(order => {
                    return <Order order={order}/>
                })}     
            </div>

        </div>
    )
}

export default Orders
