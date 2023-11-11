import React, {useEffect, useState} from "react";
import axios from "axios";
import UpcomingGamesList from "../../components/upcoming-games/UpcomingGamesList";
import {Link} from "react-router-dom";
import './LoggedOut.css'


const LoggedOut = () => {
    const [upcomingResponse, setUpcomingResponse] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/get-upcoming-games").then(response => {
            setUpcomingResponse(response.data);
        })
    }, []);

    return (
        <div>
            <div className='upcoming-container'>
                <div className='container-title'>Upcoming Games</div>
                <UpcomingGamesList upcomingResponse = {upcomingResponse}/>
            </div>
            <div className="login-sign-in">
                <Link to="/login"> <u>Login</u></Link>
                <span> or </span>
                <Link to="/signup"><u>Sign-Up</u></Link>
                <span> To Start Playing! </span>
            </div>
        </div>
    )
}

export default LoggedOut;