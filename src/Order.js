import React from 'react'
import './Order.css';
import Product from './Product';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct'
function Order({order}) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                Order ID : {order.id}
            </p>
            {order.data.basket.map(item => (
                <CheckoutProduct 
                id = {item.id}
                title = {item.title}
                image = {item.image}
                price = {item.price}
                rating = {item.rating}
                hidebutton = {true}
                />
            ))}
            <h3 className="order__total">Order Total : ${order.data.amount}</h3>
        </div>
    )
}

export default Order
