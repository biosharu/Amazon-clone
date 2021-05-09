import React from 'react'
import "./Home.css";
import Product from './Product';


function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__img" 
                    src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
                    alt="home__img"/>
                <div className="home__row">
                    <Product
                        id="123123" 
                        title='The Lean Startup: How Constant Innovation 
                        Creates Radically Successful Businesses'
                        image='https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg'
                        price={19.99}
                        rating={5}/>
                    <Product 
                        id="123456"
                        title='Busineskenwood kmix stand mixer for baking'
                        image='https://images-na.ssl-images-amazon.com/images/I/51ae8jtSakL._SL1200_.jpg'
                        price={299}
                        rating={3}/>
                </div>

                <div className="home__row">
                    <Product 
                        id="123789"
                        title='Nike Air Max 1/97 Sean Wotherspoon'
                        image='https://swagger.com.vn/wp-content/uploads/2020/03/Nike-Air-Max-1-97-Sean-Wotherspoon.jpg'
                        price={929.00}
                        rating={5}/>
                    <Product 
                        id="124987"
                        title='Hero Biker Jacket - Wing of Liberty'
                        image='https://cdn.shopify.com/s/files/1/0066/2916/3081/products/Hero-biker-2_800x.jpg?v=1606727191'
                        price={300.00}
                        rating={5}/>
                    <Product 
                        id="142178"
                        title='ZARA FAUX SUEDE BOMBER JACKET'
                        image='https://img.ssensemedia.com/images/b_white,g_center,f_auto,q_auto:best/211327M175008_1/we11done-black-basic-bomber-jacket.jpg'
                        price={80.00}
                        rating={3}/>
                </div>
                
                <div className="home__row">
                    <Product 
                        id="198723"
                        title='Frito-Lay Ultimate Snack Care Package, Variety Assortment of Chips, Cookies, Crackers & More, 40 CountT'
                        image='https://images-na.ssl-images-amazon.com/images/I/91POvPM7J-L._SL1500_.jpg'
                        price={23.99}
                        rating={4}/> 
                </div>
        </div>
    </div>
    )
}

export default Home
