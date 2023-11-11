import UpcomingGamesList from "../../components/upcoming-games/UpcomingGamesList";
import './Tournament.css';
import GamesStatsList from "../../components/tournament-games/GamesStatsList";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import RankingTable from "../../components/tournament/RankingTable";

const Tournament = () => {
    const { tid } = useParams();

    const [upcomingResponse, setUpcomingResponse] = useState('');
    const [gamesStatsResponse, setGamesStatsResponse] = useState('');
    const [tournamentResponse, setTournamentResponse] = useState('');
    const [usersResponse, setUsersResponse] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/tournament/${tid}`).then(response => {
            setTournamentResponse(response.data);
        });

        axios.get(`http://localhost:5000/users`).then(response => {
            setUsersResponse(response.data);
        });

        axios.get("http://localhost:5000/get-nba-games").then(response => {
            setGamesStatsResponse(response.data);
        });

        axios.get("http://localhost:5000/get-upcoming-games").then(response => {
            setUpcomingResponse(response.data);
        })
        }, [tid]);


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
                            game = {tournamentResponse}
                        />
                    </td>
                    <td className='games-stats-container'>
                        <div className='game-stats-title'>Latest Games</div>
                        {gamesStatsResponse ?
                            <GamesStatsList
                                gamesStatsResponse = {gamesStatsResponse}
                                gameResponse = {tournamentResponse}
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

export default Tournament;