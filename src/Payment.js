import React, { useEffect, useState } from 'react'
import './Payment.css';
import { useStateValue } from './StateProdiver';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer'
import axios from './axios';
import {db} from './firebase';

function Payment() {
    const history = useHistory();
    const [{basket, user}, dispatch] = useStateValue();
    
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);

    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();  

    }, [basket])

    console.log('The Client Secret >>>', clientSecret);

    const handleSubmit = async e =>{
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = payment confirmation
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            }) 

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders');
        })
    }

    const handleChange = e => {
        // Listen for changes in CardElement
        // and display any error as the customer types their card detail
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "")
    }
    
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout <Link to='/checkout'>({basket.length} items)</Link></h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>CT4A Xala</p>
                        <p>Ha Dong - Ha Noi</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
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
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__detail">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__price">
                                <CurrencyFormat
                                    renderText={(value) => ( 
                                        <h3> Order Total: {value} </h3>                                     
                                    )}  
                                    decimalScale={2} 
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />                                
                            </div>
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>                      
                </div>
            </div>
        </div>
    )
}

export default Payment
