import React, { useState, useCallback, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import Navigation from "./components/Navigation";
import Game from './pages/game/Game';
import NewGame from "./pages/new-game/NewGame";
import ChooseTeam from "./pages/new-game/ChooseTeam";
import ChoosePlayers from "./pages/new-game/ChoosePlayers";
import NoGames from "./pages/game/NoGames";
import JoinGame from "./pages/join-game/JoinGame";
import JoinGameTeams from "./pages/join-game/JoinGameTeams";
import JoinGamePlayers from "./pages/join-game/JoinGamePlayers";
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
                <Route path="/" element={<NoGames/>}/>
                <Route path="/game/:gid" element={<Game/>}/>
                <Route path="/joingame" element={<JoinGame/>}/>
                <Route path="/joingame/:gid" element={<JoinGameTeams/>}/>
                <Route path="/joingame/:gid/:tid1/:tid2/:tid3/:tid4/:tid5" element={<JoinGamePlayers/>}/>
                <Route path="/newgame" element={<NewGame/>}/>
                <Route path="/newgame/:gname" element={<ChooseTeam/>}/>
                <Route path="/newgame/:gname/:tid1/:tid2/:tid3/:tid4/:tid5" element={<ChoosePlayers/>}/>
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
