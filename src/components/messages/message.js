import React from 'react';
import {withUserContext} from '../wrappers/componentWrappers';

const Message = props => {
    let message;

    if(props.location !== undefined) {
        message = props.location.state.message;
    } else if (props.message) {
        message = props.message;
    } else {
        message = null;
    }
    
    return(
        message && <section className="message">{message}</section>
    );
}

export default withUserContext(Message);