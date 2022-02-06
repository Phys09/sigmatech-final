import React, {Component} from 'react';
import './CreateAccount.css';
import './App.css';
import {endpoint, POST_FETCH} from './APIfunctions';
import { Link } from 'react-router-dom';

export default class CreateAccountForm extends Component {
    state = {
        "email": null,
        "passwd": null,
        "phonenum": null
    };

    constructor(props) {
        super(props);

        console.log("state start", this.state);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value) {
        return (event) => {
            this.setState({[value]: event.target.value});
            console.log("handle change: ", value);
            console.log(this.state);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        var payload = Object.assign({"body": JSON.stringify(this.state)}, POST_FETCH);
        fetch(endpoint("create_account"), payload).then(resp => console.log(resp));
    }

    render() {
        return (
            <div className='CreateAccountForm'>
                <header>{/*<Link className="logolink" to="/">*/}
                <span className='logo'>ΣBank </span><span className='logoSecondHalf'>| Create Account</span>
                {/*</Link>*/}</header>
                <h1>Create Account</h1>
                <form onSubmit={this.handleSubmit}>
                    <input className="AccountInput" type="text" name="username" placeholder="email" onChange={this.handleChange("email")}/>
                    <br/>
                    <input className="AccountInput" type="text" name="password" placeholder="password" onChange={this.handleChange("passwd")}/>
                    <br/>
                    <input className="AccountInput" type="text" name="phonenum" placeholder="phone number" onChange={this.handleChange("phonenum")}/>
                    <br/>
                    <button className="AccountButtons" type="submit">Create Account</button>
                </form>
            </div>
        );
    }
}
