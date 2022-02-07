import React, {Component} from 'react';
import {endpoint, POST_FETCH} from './APIfunctions';

export default class LoginForm extends Component {
    state = {
        "email": null,
        "passwd": null
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
        fetch(endpoint("login"), payload).then(resp => console.log(resp));
    }

    render() {
        return (
            <div className='LoginForm'>
                <header>{/*<Link className="logolink" to="/">*/}
                <span className='logo'>ΣBank </span><span className='logoSecondHalf'>| Home</span>
                {/*</Link>*/}</header>
                <h1>SigmaBank Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input className="AccountInput" type="text" name="username" placeholder="Email" onChange={this.handleChange("email")}/>
                    <br/>
                    <input className="AccountInput" type="text" name="password" placeholder="Password" onChange={this.handleChange("passwd")}/>
                    <br/>
                    <button className="AccountButtons" type="submit">Login</button>
                </form>
            </div>
        );
    }
}
