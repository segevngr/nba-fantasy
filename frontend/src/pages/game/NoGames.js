import React, {useEffect, useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import UpcomingGamesList from "../../components/game/UpcomingGamesList";
import './NoGames.css'
import {AuthContext} from "../../utils/auth-context";

const NoGames = () => {
    const [upcomingResponse, setUpcomingResponse] = useState('');
    let navigate = useNavigate();

    const auth = useContext(AuthContext);

    useEffect(() => {
        axios.get("http://localhost:5000/upcoming").then(response => {
            setUpcomingResponse(response.data);
        })
    }, []);


    if(auth.userId) {
        axios.get(`http://localhost:5000/users/${auth.userId}`)
            .then(response => {
                console.log(response.data.games)
                if(response.data.games.length > 0) {
                    navigate(`/game/${response.data.games[0]._id.toString()}`)
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
                <Link to="/joingame"><u>Join game</u></Link>
                <span> or </span>
                <Link to="/newgame"><u>Create a new one</u></Link>
            </div>
        </div>
    )
}

export default NoGames;