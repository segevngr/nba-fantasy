import React, {useState, useContext} from "react";
import TextInput from "../../components/TextInput";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../utils/auth-context";

const JoinTournament = () => {
    const auth = useContext(AuthContext);

    const [tournamentId, setTournamentId] = useState('');
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const setId = (input) => {
        setTournamentId(input);
    }

    const handleJoin = () => {
        axios.get(`http://localhost:5000/tournament/${tournamentId}`,
            {
                headers: {'Authorization': `Bearer ${auth.token}`,},
            })
            .then(response => {
                for(let userP of response.data.users_pref) {
                    if(userP.userId === auth.userId) {
                        setError("You already joined this tournament.")
                        return;
                    }
                }
                navigate(`/selection/join/${tournamentId}`)})
            .catch(function (error) {
                    setError("The Tournament ID you entered is Invalid.");
            })
    }

    return (
        <div>
            <div className="new-tournament-title">Join Tournament</div>
            <div className="input-container">
                <TextInput title="Enter Tournament ID:"
                           setInput = {setId}/>
                <div className="valid-error">{error}</div>
                <div className="new-tournament-btn-con">
                    <Link to="/"><div className="btn">Back </div></Link>
                    <div className="btn" onClick={handleJoin}>Join </div>
                </div>
            </div>


        </div>
    )
}

export default JoinTournament;