import React from 'react'
import './CheckoutProduct.css';
import { useStateValue } from './StateProdiver';

function CheckoutProduct({id ,title, image, price, rating, hidebutton}) {
    const [state, dispatch] = useStateValue();
    const remove = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id:id
        })
    }
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__img" src={image} />
            <div className="checkoutProduct__info" >
                <strong className="checkoutProduct__title">
                    {title}
                </strong>
                <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p>⭐</p>
                    ))}    
                </div>
                {hidebutton ? null :
                <button className="checkoutProduct__button" onClick={remove}>
                    Remove from basket
                </button>     
                }
                
            </div>
        </div>
    )
}

export default CheckoutProduct
