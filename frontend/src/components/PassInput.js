import React from 'react';
import validate from "../utils/validators";
import './Input.css'

const PassInput = (props) => {

    const handleChange = (val) => {
        if(props.validators) {
            let isValid = validate(val, props.validators);
            props.setValid(isValid);
        }
        props.setInput(val);
    }

    return (
        <div className="input-con">
            <div>{props.title}</div>
            <input id={props.title} type = "password" className="input"
                   onChange={event => handleChange(event.target.value)}
            />
        </div>
    );
}

export default PassInput;