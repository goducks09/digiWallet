import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../navbar/navbar';
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
    
    componentDidMount() {
        let message;
        if(this.props.location.state !== undefined) {
            message = this.props.location.state.message;
        } else if (this.props.message) {
            message = this.props.message;
        } else {
            message = null;
        }

        this.setState({message: message});
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

        fetch('/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            credentials: 'include',
            body: user
        })
        .then( res => {
            if(res.ok) {
                res.json().then( data => {
                    this.props.login(data._id, data.username);
                    this.props.history.push('/');
                });
            } else {
                if(res.status === 401) {
                 this.setState({message: "Your username or password did not match. Please try again."});
                }
            }
        });
    }

    render() {
        

        return (
            <React.Fragment>
            {
                this.props.isLoggedIn ?
                    <Redirect to='/profile' />
                
                :

                    //else show button to Signup or Login
                    <React.Fragment>
                        <Navbar heading="Welcome" message={this.state.message}/>
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