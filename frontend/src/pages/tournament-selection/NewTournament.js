import React, {useState} from 'react';
import './NewTournament.css';
import {Link} from "react-router-dom";
import TextInput from "../../components/TextInput";

const NewTournament = () => {
    const [tournamentName, setTournamentName] = useState('');

    const setName = (input) => {
        setTournamentName(input);
    }

    return (
        <div>
            <div className="new-tournament-title">New Game</div>
            <div className="input-container">
                <TextInput title="Enter a name for the Tournament:"
                           setInput = {setName}/>
                <div className="new-tournament-btn-con">
                    <Link to="/"><div className="btn">Back </div></Link>
                    <Link to={"/selection/new/" +tournamentName}><div className="btn">Next </div></Link>
                </div>
            </div>


        </div>
    )
}

export default NewTournament;