import React, {useState} from 'react';
import './NewGame.css';
import {Link} from "react-router-dom";
import Input from "../../components/Input";

const NewGame = () => {
    const [gameName, setGameName] = useState('');

    const setName = (input) => {
        setGameName(input);
    }

    return (
        <div>
            <div className="new-game-title">Pick a name for your game </div>
            <div className="input-container">
                <Input title="Game name"
                       setInput = {setName}/>
                <div className="new-game-btn-con">
                    <Link to="/"><div className="btn">Back </div></Link>
                    <Link to={"/newgame/" +gameName}><div className="btn">Next </div></Link>
                </div>
            </div>


        </div>
    )
}

export default NewGame;