import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from "react-router-dom";
import {endpoint, POST_FETCH} from "../APIfunctions"
import NavbarHome from "../components/navbarHome"
import '../css/App.css';
import '../css/makeAutopay.css'

/*
[FRONT] As a customer, Kendall wants to add automatic payments for her credit card / bills

toAccount: credit card / bill account
frequency: pay every n months
*/


export function MakeTransaction() {
    var navigate = useNavigate();
    const [cookies] = useCookies(["user"]);
    const aid = cookies.userId;

    useEffect(() => {
        if (!aid) {
            alert("Please login to use this page.");
            navigate("/login");
        }
    }, [])

    function sendMoneyClick() {
        navigate("sendMoney");
    }

    return (
        <React.Fragment>
            <NavbarHome/>
            <form>
                <button className='TransactionButtons' onClick={sendMoneyClick}>Send Money</button>
            </form>
            <Outlet/>
        </React.Fragment>
    )
}

export function SetupAutoPay() {
    const [cookies] = useCookies(["user"]);
    const aid = cookies.userId;
    const [success, setSuccess] = useState(-1);
    const [toAccount, setToAccount] = useState(null);
    const [fromAccount, setFromAccount] = useState(null);
    const [amount, setAmount] = useState(0);
    const [frequency, setFrequency] = useState(1);
    const [datetime, setDatetime] = useState(null);
    const [pass, setPass] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        if (toAccount && fromAccount && amount) {
            var payload = Object.assign({
                body: JSON.stringify({bid: toAccount})
            }, POST_FETCH);
            fetch(endpoint("get_owner"), payload)
                .then((resp) => {
                    if (resp.status == 404) {
                        setSuccess(resp.status);
                        return Promise.reject("Unable to get the owner");
                    } else {
                        return resp.json();
                    }
                })
                .then((data) => {
                    if (data[0].type == -1) {
                        setSuccess(404);
                    } else {
                        fetch(endpoint("get_timestamp"))
                            .then((resp) => {
                                if (resp.status == 404) {
                                    return Promise.reject("Unable to get the time");
                                } else {
                                    return resp.json();
                                }
                            })
                            .then((data) => {
                                var payload = Object.assign({
                                    body: JSON.stringify(
                                        {passwd: pass, senderId: fromAccount, receiverId: toAccount, ownerId: aid , amount: amount, frequency: frequency, datetime: datetime, timestamp: data[0].now})
                                }, POST_FETCH);
                                fetch(endpoint("make_transaction"), payload).then((resp) => setSuccess(resp.status));
                            })
                            .catch((err) => console.log(err)
                            );
                    }
                })
                .catch((err) => console.log(err)
                );
        }
    }

    function successText() {
        switch (success) {
            case 404:
                return <p style={{color: "red"}}>Unsuccessful transaction! Please check the inputted account numbers!</p>
            case 200:
                return <p style={{color: "green"}}>Success!</p>
            default:
                return <p></p>
        }
    }

    return (
        <div>
            <h1>Setup Automatic Transaction</h1>
            <form onSubmit={handleSubmit}>
                <input className="TransactionInput" placeholder='From Account' onFocus={() => setSuccess(-1)} onChange={(event) => setFromAccount(event.target.value)}/>
                <input className="TransactionInput" placeholder='To Account' onFocus={() => setSuccess(-1)} onChange={(event) => setToAccount(event.target.value)}/>
                <input className="TransactionInput" placeholder='Amount' onFocus={() => setSuccess(-1)} onChange={(event) => setAmount(event.target.value)}/>

                <label htmlFor="frequencyInput">Frequency: every n months</label>
                <p >Enter 0 for one-time payment</p>
                <input id="frequencyInput" className="TransactionInput" placeholder='Frequency' onFocus={() => setSuccess(-1)} onChange={(event) => setFrequency(event.target.value)}/>
                
                <label htmlFor="timeInput">payment time:</label>
                <input id="timeInput" type="datetime-local" className="TransactionInput" placeholder='payment time' onFocus={() => setSuccess(-1)} onChange={(event) => setDatetime(event.target.value)}/>
                <input className="TransactionInput" placeholder='Password (optional)' onFocus={() => setSuccess(-1)} onChange={(event) => setPass(event.target.value)}/>
                <button className="TransactionButtons" type="submit">Submit</button>
            </form>
            {successText()}
        </div>
    )
}
