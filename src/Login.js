import React, { useState } from 'react'
import "./Login.css"
import {Link, useHistory} from 'react-router-dom'
import { auth } from './firebase';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = (e) => {
        e.preventDefault();
        auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
            if(auth){
                history.push('/');
            }
        })
        .catch((err) => alert(err))
    }
    const register = e => {
        e.preventDefault();
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            if(auth){
                history.push('/');
            }
        })
        .catch((err) => alert(err))
    }
    return (
        <div className="login">
            <Link to="/">
              <img className="login__logo" 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"/>  
            </Link>
            <div className="login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>Email or your phone number</h5>
                    <input type="text" onChange={(event) => setEmail(event.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" onChange={(event) => setPassword(event.target.value)}/>
                    <button type='reset' className="login__signInButton" onClick={signIn}>Sign in</button>
                </form>
                <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                <button onClick={register}
                 className="login__registerButton">
                    Create your Amazon account
                </button>
            </div>
            
        </div>
    )
}

export default Login
