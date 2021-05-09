import React from 'react'
import "./Checkout.css"
import Subtotal from "./Subtotal"
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from './StateProdiver';

function Checkout() {
    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ads" src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img16/CCMP/newstorefront/YACC-desktop-nonprime-banner3.png"/>
                <div>
                    <h3>{user?.email}</h3>
                    <h2 className="checkout__title">Your Shopping Basket</h2>
                    {basket.map((i) => 
                    <CheckoutProduct 
                    id={i.id}
                    title = {i.title}
                    price = {i.price}
                    rating = {i.rating}
                    image = {i.image}
                    />)}
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>

            
        </div>
    )
}

export default Checkout
