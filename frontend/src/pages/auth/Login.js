import React, {useState, useContext} from "react";
import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import TextInput from "../../components/TextInput";
import axios from "axios";
import {AuthContext} from "../../utils/auth-context";

const Login = () => {
    const auth = useContext(AuthContext);
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);

    const setEmailInput = (input) => {
        setEmail(input);
    }

    const setPasswordInput = (input) => {
        setPassword(input);
    }

    const login = () => {
        axios.post("http://localhost:5000/login", {
            email: email,
            password: password,
        })
            .then(response => {
                auth.login(response.data.userId, response.data.username, response.data.token);
                setError(null);
                navigate('/')
            })
            .catch(function (error) {
            if (error.response)
                setError("Invalid credentials, Please try again.");
            })
    }

    return (
        <div>
            <div className="login-title">Login</div>
            <div className="signup-con">
                <TextInput title="Email"
                           setInput = {setEmailInput}/>
                <TextInput title ="Password"
                           setInput={setPasswordInput}/>
                <div className="valid-error">{error}</div>
                <div className='signup-buttons'>
                    <Link to="/"><div className='btn'>Back </div></Link>
                    <div className='btn' onClick={login}>Login</div>
                </div>
            </div>
        </div>
    )
}

export default Login;