import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Profile from './profile';
import {withUserContext} from '../../components/wrappers/componentWrappers';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: ''
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    
    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = `username=${this.state.username}&password=${this.state.password}`;

        fetch('http://localhost:5000/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            credentials: 'include',
            body: user
        })
        .then( res => res.json())
        .then( data => {
            this.props.login(data._id);
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <React.Fragment>
            {
                this.props.isLoggedIn ?
                    <Profile />
                
                :

                    //else show button to Signup or Login
                    <React.Fragment>
                        <Navbar heading="Welcome" />

                        <main>
                            <div className="formWrapper">
                                <h2>Login</h2>
                                <form onSubmit={this.handleSubmit}>
                                    <input onChange={this.handleInputChange} name="username" type="text" value={this.state.username} placeholder="username"/>
                                    <input onChange={this.handleInputChange} name="password" type="password" value={this.state.password} placeholder="password"/>
                                    <input type="submit" value="Login" />
                                </form>
                            </div>

                            <Link to='/register'><h2>Need to Register?</h2></Link>
                        </main>
                    </React.Fragment>
                }

            </React.Fragment>
        );
    }
}

export default withUserContext(Login);