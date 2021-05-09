import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout"
import Login from "./Login"
import Payment from "./Payment";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import { auth } from "./firebase";
import { useStateValue } from "./StateProdiver";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from "./Orders";

const promise = loadStripe(
  'pk_test_51IXNFfGsdsz8eGMeL0ThFy51YSXLfvvXgITmIKNZNe9yzLsMuXUk48fEtJlmXusWGvUPUAanzWpowRhdT6XYldN000Ye38Fd1v',
  { locale: 'en'}
);

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("The user is >>>", authUser);
      
      if(authUser){
        dispatch({
          type:"SIGN_IN",
          user: authUser
        })
      }
      else{
        dispatch({
          type:"SIGN_OUT",
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment /> 
            </Elements>
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>       
        </Switch>
        
      </div> 
    </Router>
    
  );
}

export default App;
