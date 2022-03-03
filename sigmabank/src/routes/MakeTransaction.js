import React, {useState, useContext} from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import '../css/App.css';
import '../css/MakeTransaction.css'
import {endpoint, POST_FETCH} from "../APIfunctions"
import { BrowserRouter, Routes, Route } from "react-router-dom";




export function MakeTransaction (){
    var navigate = useNavigate();
    function sendMoneyClick(){
        navigate("sendMoney")
    }
    return(
        <div>
            <header>
            <Link className="logolink" to="/">
                <span className="logo">ΣBank</span>
                <span className="logoSecondHalf">| Make Transactions</span>
            </Link>
            </header>

            <form>
                <button className='TransactionButtons' onClick={sendMoneyClick}>Send Money</button>
            </form>
            <Outlet/>
        </div>
    )
}

export function SendMoney(){
    const auth = useContext(AuthContext);
    const aid = auth.user;
    const [success, setSuccess] = useState(-1);
    const [toAccount, setToAccount] = useState(null);
    const [fromAccount, setFromAccount] = useState(null);
    const [amount, setAmount] = useState(0);
    
    function handleSubmit(event){
        event.preventDefault();
        if(toAccount && fromAccount && amount){
            fetch(endpoint("get_timestamp"))
            .then((resp) => {
                if(resp.status == 404){
                    return Promise.reject("Couldn't get the time");
                }
                else{
                    return resp.json()
            }})
            .then((data) => {
                var payload = Object.assign({
                    body: JSON.stringify({senderId: fromAccount, receiverId: toAccount, ownerId: aid , amount: amount, timestamp: data[0].now})
                }, POST_FETCH);
                fetch(endpoint("make_transaction"), payload).then((resp) => setSuccess(resp.status))
            })
        }
    }
    
    function successText(){
        switch (success){
            case 404:
                return <p style={{color: "red"}}>Unsuccessful Transaction, please check inputted account numbers</p>
            case 200:
                return <p style={{color: "green"}}>Success!</p>
            default:
                    return <p></p>
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input className="TransactionInput" placeholder='From Account' onFocus={() => setSuccess(-1)} onChange={(event) => setFromAccount(event.target.value)}/>
                <input className="TransactionInput" placeholder='To Account' onFocus={() => setSuccess(-1)} onChange={(event) => setToAccount(event.target.value)}/>
                <input className="TransactionInput" placeholder='Amount' onFocus={() => setSuccess(-1)} onChange={(event) => setAmount(event.target.value)}/>
                <button className="TransactionButtons" type="submit">Submit</button>
            </form>
            {successText()}
        </div>
    )
}