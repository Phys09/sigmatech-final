import React, { useEffect, useState } from "react";
import { endpoint, GET_FETCH } from '../APIfunctions';

function Currency(props){
    const [conversionFactor, setConversionFactor] = useState(0);
    const [currency, setCurrency] = useState("");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        setCurrency(props.currencyName);
        setConversionFactor(props.value);
    }, [])
    
    return(
        <li>
            <input placeholder={currency} onChange={(e)=> setAmount(parseFloat(e.target.value))}/>
            <input readOnly value={amount*conversionFactor ? amount*conversionFactor : 0} />
        </li>
    )
}


export default function Converter(){
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        fetch(endpoint("currency"), GET_FETCH)
        .then((resp) => resp.json())
        .then((body) => setCurrencies(body))
    }, [])

    return(
        <div>
            <p>Your currency → CAD</p>
            <ol>
                {currencies.map((row) => <Currency key={row.cid} currencyName={row.currency_name} value={row.value} />)}
            </ol>
        </div>
    )
}