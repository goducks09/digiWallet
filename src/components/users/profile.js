import React from 'react';
import {withUserContext} from '../wrappers/componentWrappers';
import Navbar from '../navbar/navbar';
import '../../resources/css/profile.css';

const Profile = props => {
    return(
        <React.Fragment>
            <Navbar heading="Profile" />
            <div className="profileWrapper">
                <section>
                    <h2>Username</h2>
                    <span>{props.username}</span>
                </section>
                <section>
                    <h2>Password</h2>
                    <span>********</span>
                    <a href="#" className="button">Change</a>
                </section>
                <section>
                    <h2>Location Tracking</h2>
                    <span>On</span>
                    <a href="#" className="button">Turn Off</a>
                </section>
                <section>
                    <button onClick={props.logout} className="button"><h2>Logout</h2></button>
                </section>
            </div>
        </React.Fragment>
    );
}

export default withUserContext(Profile);