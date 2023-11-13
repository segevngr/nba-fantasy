import UpcomingGamesList from "../../components/upcoming-games/UpcomingGamesList";
import './Tournament.css';
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import RankingTable from "../../components/ranking/RankingTable";
import GamesStatsList from "../../components/lastest-games/GamesStatsList";
import {AuthContext} from "../../utils/auth-context";

const Tournament = () => {
    const auth = useContext(AuthContext);

    const { tid } = useParams();

    const [upcomingResponse, setUpcomingResponse] = useState('');
    const [latestGamesStatsResponse, setLatestGamesStatsResponse] = useState('');
    const [tournamentResponse, setTournamentResponse] = useState('');
    const [usersResponse, setUsersResponse] = useState('');
    console.log(latestGamesStatsResponse)

    useEffect(() => {
        axios.get("http://localhost:5000/get-upcoming-games").then(response => {
            setUpcomingResponse(response.data);
        })

        axios.get(`http://localhost:5000/users`,
            {
                headers: {'Authorization': `Bearer ${auth.token}`,},
            }).then(response => {
            setUsersResponse(response.data);
        });

        axios.get(`http://localhost:5000/tournament/${tid}`,
            {
                headers: {'Authorization': `Bearer ${auth.token}`,},
            }).then(response => {
            setTournamentResponse(response.data);
        });

        axios.get("http://localhost:5000/get-latest-nba-games",
            {
                headers: {'Authorization': `Bearer ${auth.token}`,},
            }).then(response => {
            setLatestGamesStatsResponse(response.data);
        });

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
                            tournamentData = {tournamentResponse}
                        />
                    </td>
                    <td className='games-stats-container'>
                        <div className='game-stats-title'>Latest Games</div>
                        {latestGamesStatsResponse ?
                            <GamesStatsList
                                gamesStats = {latestGamesStatsResponse}
                                tournamentData = {tournamentResponse}
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