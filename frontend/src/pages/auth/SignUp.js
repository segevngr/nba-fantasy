import React, {useState, useContext} from "react";
import TextInput from "../../components/TextInput";
import {Link, useNavigate} from "react-router-dom";

import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../utils/validators';
import './SignUp.css'
import axios from "axios";
import {AuthContext} from "../../utils/auth-context";
import PassInput from "../../components/PassInput";

const SignUp = () => {
    const auth = useContext(AuthContext);
    let navigate = useNavigate();

    const [usernameValid, setUserValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameErr, setUsernameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const setUserInput = (input) => {
        setUsername(input);
    }

    const setEmailInput = (input) => {
        setEmail(input);
    }

    const setPasswordInput = (input) => {
        setPassword(input);
    }

    const updateValidUser = (isValid) => {
        setUserValid(isValid);
    }

    const updateEmailValid = (isValid) => {
        setEmailValid(isValid)
    }

    const updatePasswordValid = (isValid) => {
        setPasswordValid(isValid)
    }

    const signUp = () => {
        axios.post("http://localhost:5000/signup", {
            email: email,
            password: password,
            username: username,
        }).then(response => {
            auth.login(response.data.userId, username, response.data.token);
            navigate('/');
        })
    };

    const handleSignUp = () => {
        if(!usernameValid || !emailValid || !passwordValid){
            setUsernameErr(!usernameValid);
            setEmailErr(!emailValid);
            setPasswordErr(!passwordValid);
        }
        else{
            resetErrors();
            signUp();
        }

    }

    const resetErrors = () => {
        setUsernameErr(false);
        setEmailErr(false);
        setPasswordErr(false);
    }

    return (
        <div>
            <div className='signup-title'>Sign Up</div>
            <div className='signup-con'>
                <TextInput title="Username"
                           validators={[VALIDATOR_REQUIRE()]}
                           setInput ={setUserInput}
                           setValid={updateValidUser}/>
                {usernameErr? <div className="valid-error">Please enter a username.</div> : null}
                <TextInput title="Email"
                           validators={[VALIDATOR_EMAIL()]}
                           setInput = {setEmailInput}
                           setValid={updateEmailValid}/>
                {emailErr? <div className="valid-error">Please enter a valid Email.</div> : null}
                <PassInput title ="Password"
                       setInput={setPasswordInput}
                       validators={[VALIDATOR_MINLENGTH(6)]}
                       setValid={updatePasswordValid}/>
                {passwordErr? <div className="valid-error">Please enter a valid password, at least 6 characters.</div> : null}
                <div className='signup-buttons'>
                    <Link to="/"><div className='btn' onClick={resetErrors}>Back </div></Link>
                    <div className='btn' onClick={handleSignUp}>Sign Up</div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;