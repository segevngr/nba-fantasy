import React, { useState, useCallback, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import Navigation from "./components/Navigation";
import Tournament from './pages/home/Tournament';
import NewTournament from "./pages/tournament-selection/NewTournament";
import SelectTeams from "./pages/tournament-selection/SelectTeams";
import SelectPlayers from "./pages/tournament-selection/SelectPlayers";
import NoTournaments from "./pages/home/NoTournaments";
import JoinTournament from "./pages/tournament-selection/JoinTournament";
import LoggedOut from "./pages/auth/LoggedOut";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { AuthContext } from './utils/auth-context';
import logo from './assets/logo.png'

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
                <Route path="/selection/new" element={<NewTournament/>}/>
                <Route path="/selection/join" element={<JoinTournament/>}/>
                <Route path="/selection/:mode/:tournament" element={<SelectTeams/>}/>
                <Route path="/selection/:mode/:tournament/:tid1/:tid2/:tid3/:tid4/:tid5" element={<SelectPlayers/>}/>
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
                    <div className="nba-fantasy"> <img src={logo} alt = "logo" className="logo"/> NBA Fantasy</div>
                    {token && <Navigation/>}
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
