import React, {useState, useContext} from "react";
import Input from "../../components/Input";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../utils/auth-context";

const JoinGame = () => {
    const auth = useContext(AuthContext);

    const [gameId, setGameId] = useState('');
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const setId = (input) => {
        setGameId(input);
    }

    const handleJoin = () => {
        axios.get(`http://localhost:5000/game/${gameId}`)
            .then(response => {
                for(let userP of response.data.users_pref) {
                    if(userP.userId === auth.userId) {
                        setError("You already joined this game.")
                        return;
                    }
                }
                navigate(`/joingame/${gameId}`)})
            .catch(function (error) {
                    setError("The Game ID you entered is Invalid.");
            })
    }

    return (
        <div>
            <div className="new-game-title">Join Game</div>
            <div className="input-container">
                <Input title="Enter Game ID:"
                       setInput = {setId}/>
                <div className="valid-error">{error}</div>
                <div className="new-game-btn-con">
                    <Link to="/"><div className="btn">Back </div></Link>
                    <div className="btn" onClick={handleJoin}>Join </div>
                </div>
            </div>


        </div>
    )
}

export default JoinGame;