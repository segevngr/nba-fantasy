import UpcomingGamesList from "../../components/game/UpcomingGamesList";
import './Game.css';
import GamesStatsList from "../../components/game/GamesStatsList";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import RankingTable from "../../components/game/RankingTable";

const Game = () => {
    const { gid } = useParams();

    const [upcomingResponse, setUpcomingResponse] = useState('');
    const [gamesStatsResponse, setGamesStatsResponse] = useState('');
    const [gameResponse, setGameResponse] = useState('');
    const [usersResponse, setUsersResponse] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/game/${gid}`).then(response => {
            setGameResponse(response.data);
        });

        axios.get(`http://localhost:5000/users`).then(response => {
            setUsersResponse(response.data);
        });

        axios.get("http://localhost:5000/get-games-stats").then(response => {
            setGamesStatsResponse(response.data);
        });

        axios.get("http://localhost:5000/get-upcoming-games").then(response => {
            setUpcomingResponse(response.data);
        })
        }, [gid]);


    return (
        <div>
            <div className='upcoming-container'>
                <div className='container-title'>Upcoming Games</div>
                <UpcomingGamesList upcomingResponse = {upcomingResponse}/>
            </div>
            <table className="bottom-section">
                <tbody>
                <tr>
                    <td className='ranking-con'>
                        <div className='ranking-title'>Ranking</div>
                        <RankingTable
                            users = {usersResponse}
                            game = {gameResponse}
                        />
                    </td>
                    <td className='games-stats-container'>
                        <div className='game-stats-title'>Latest Games</div>
                        {gamesStatsResponse ?
                            <GamesStatsList
                                gamesStatsResponse = {gamesStatsResponse}
                                gameResponse = {gameResponse}
                            />
                            :
                            <div className='loader-container'><CircularProgress /></div>}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Game;