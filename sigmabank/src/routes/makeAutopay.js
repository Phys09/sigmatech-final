import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from "react-router-dom";
import {endpoint, POST_FETCH} from "../APIfunctions"
import NavbarHome from "../components/navbarHome"
import '../css/App.css';
import '../css/makeAutopay.css'

export function SetupAutoPay() {
    var navigate = useNavigate();
    const [cookies] = useCookies(["user"]);
    const aid = cookies.userId;
    const [success, setSuccess] = useState(-1);
    const [fromAccount, setFromAccount] = useState(null);
    const [toAccount, setToAccount] = useState(null);
    const [amount, setAmount] = useState(0);
    const [recurring, setRecurring] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (!aid) {
            alert("Please login to use this page.");
            navigate("/login");
        }
    }, [])

    function handleChange(value) {
        return (event) => {
            event.preventDefault();
            if (value == "O") {
                setRecurring(false);
            } else if (value == "M") {
                setRecurring(true);
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        var payload = Object.assign({
            body: JSON.stringify(
                {
                    ownerId: aid,
                    senderId: fromAccount,
                    receiverId: toAccount,
                    amount: amount,
                    recurring: recurring,
                    paymentDate: date
                }
            )
        }, POST_FETCH);
        fetch(endpoint("setup_automatic_payment"), payload)
            .then((resp) => {
                setSuccess(resp.status);
                if (resp.status == 400) {
                    return Promise.reject("Enter information");
                } else if (resp.status == 404) {
                    return Promise.reject("Invalid bank account");
                } else {
                    return resp.json();
                }
            })
            .catch((err) => console.log(err)
        );
    }

    function successText() {
        switch (success) {
            case 400:
                return <p style={{color: "red"}}>Enter information!</p>
            case 404:
                return <p style={{color: "red"}}>Invalid bank account!</p>
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
                <br/>
                <label htmlFor="frequencyInput">Payment Type:</label>
                <div>
                    <input type="radio" value="One-Time" name="recurring" onChange={handleChange("O")}/> One-Time
                    <br/>
                    <input type="radio" value="Monthly" name="recurring" onChange={handleChange("M")}/> Monthly
                </div>
                <br/>
                <label htmlFor="dateInput">Payment Date:</label>
                <input id="dateInput" type="date" className="TransactionInput" placeholder='Payment Date' onFocus={() => setSuccess(-1)} onChange={(event) => setDate(event.target.value)}/>
                <button className="TransactionButtons" type="submit">Submit</button>
            </form>
            {successText()}
        </div>
    )
}
