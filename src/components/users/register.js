import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {withUserContext} from '../../components/wrappers/componentWrappers';
import '../../resources/css/addCard.css';
import Navbar from '../navbar/navbar';

class Register extends Component {
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
        
        fetch('http://localhost:5000/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            credentials: "include",
            body: user
        })
        .then( res => {
            if(res.status === 401) {
                res.text().then(data => {
                    this.props.history.push({
                        pathname: '/register',
                        state: {message: "That username is already taken. Please choose a new one."}
                    });
                });
            } else {
                res.json().then( data => {
                    this.props.login(data._id, data.username);
                    this.props.history.push('/');
                });
            }
        });
        
    }

    render() {
        return (
            <React.Fragment>
                <Navbar heading="Register" message={this.props.history.location.state ? this.props.history.location.state.message : null} />
                <div className="formWrapper">
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleInputChange} name="username" type="text" value={this.state.username} placeholder="username"/>
                        <input onChange={this.handleInputChange} name="password" type="password" value={this.state.password} placeholder="password"/>
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

//withRouter allows for redirect using history.push
export default withRouter(withUserContext(Register));