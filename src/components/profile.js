import React, {Component} from 'react';
import Navbar from './navbar/navbar';
import '../resources/css/profile.css';

export default class Profile extends Component {
    render() {
        return(
            <React.Fragment>
                <Navbar heading="Profile" />
                <div className="profileWrapper">
                    <p>
                        <h2>Username</h2>
                        <span>username</span>
                    </p>
                    <p>
                        <h2>Password</h2>
                        <span>********</span>
                        <a href="#" className="button">Change</a>
                    </p>
                    <p>
                        <h2>Location</h2>
                        <span>On</span>
                        <a href="#" className="button">Turn Off</a>
                    </p>
                    <p>
                        <a href="#" className="button"><h2>Logout</h2></a>
                    </p>
                </div>
            </React.Fragment>
        );
    }
}