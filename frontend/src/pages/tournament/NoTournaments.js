import React, {useEffect, useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import UpcomingGamesList from "../../components/tournament/UpcomingGamesList";
import './NoTournaments.css'
import {AuthContext} from "../../utils/auth-context";

const NoTournaments = () => {
    const [upcomingResponse, setUpcomingResponse] = useState('');
    let navigate = useNavigate();

    const auth = useContext(AuthContext);

    useEffect(() => {
        axios.get("http://localhost:5000/get-upcoming-games").then(response => {
            setUpcomingResponse(response.data);
        })
    }, []);


    if(auth.userId) {
        axios.get(`http://localhost:5000/user/${auth.userId}`)
            .then(response => {
                console.log(response.data)
                if(response.data.tournaments.length > 0) {
                    navigate(`/tournament/${response.data.tournaments[0]._id.toString()}`)
                }
            })
    }

    return (
        <div>
            <div className='upcoming-container'>
                <div className='container-title'>Upcoming Games</div>
                <UpcomingGamesList upcomingResponse = {upcomingResponse}/>
            </div>
            <div className="no-games">
                You have no Games!<br />
                <Link to="/jointournament"><u>Join game</u></Link>
                <span> or </span>
                <Link to="/newtournament"><u>Create a new one</u></Link>
            </div>
        </div>
    )
}

export default NoTournaments;