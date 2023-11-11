import React, { useState, useCallback, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import Navigation from "./components/Navigation";
import Tournament from './pages/tournament/Tournament';
import NewTournament from "./pages/new-tournament/NewTournament";
import ChooseTeam from "./pages/new-tournament/ChooseTeam";
import ChoosePlayers from "./pages/new-tournament/ChoosePlayers";
import NoTournaments from "./pages/tournament/NoTournaments";
import JoinTournament from "./pages/join-tournament/JoinTournament";
import JoinTournamentTeams from "./pages/join-tournament/JoinTournamentTeams";
import JoinTournamentPlayers from "./pages/join-tournament/JoinTournamentPlayers";
import LoggedOut from "./pages/auth/LoggedOut";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { AuthContext } from './utils/auth-context';

function App() {

    const [userId, setUserId] = useState(false);
    const [username, setUsername] = useState(false);
    const [token, setToken] = useState(false);

    const login = useCallback((uid, username, token) => {
        setUserId(uid);
        setUsername(username);
        setToken(token);
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                username: username,
                token: token,
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token) {
            login(storedData.userId, storedData.username, storedData.token, );
        }
    }, [login]);

    let routes;

    if (token) {
        routes = (
            <Routes>
                <Route path="/" element={<NoTournaments/>}/>
                <Route path="/tournament/:tid" element={<Tournament/>}/>
                <Route path="/jointournament" element={<JoinTournament/>}/>
                <Route path="/jointournament/:tid" element={<JoinTournamentTeams/>}/>
                <Route path="/jointournament/:tid/:tid1/:tid2/:tid3/:tid4/:tid5" element={<JoinTournamentPlayers/>}/>
                <Route path="/newtournament" element={<NewTournament/>}/>
                <Route path="/newtournament/:tournament_name" element={<ChooseTeam/>}/>
                <Route path="/newtournament/:tournament_name/:tid1/:tid2/:tid3/:tid4/:tid5" element={<ChoosePlayers/>}/>
            </Routes>
        );
    } else{
        routes = (
            <Routes>
                <Route path="/" element={<LoggedOut/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        )
    }

    return(
        <AuthContext.Provider
                value={{
                    token: token,
                    userId: userId,
                    username: username,
                    login: login,
                    logout: logout
                }}>
            <Router>
                <div className="frame">
                    <div className="nba-fantasy"> NBA Fantasy</div>
                    {token && <Navigation/>}
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
