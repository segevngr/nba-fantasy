import React, {useContext, useEffect, useState} from 'react';
import './SelectPlayers.css';
import PlayersSelector from "../../components/selection/PlayersSelector";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import createOrJoinTournament from "./createOrJoinTournament";
import {AuthContext} from "../../utils/auth-context";

const SelectPlayers = () => {
    const auth = useContext(AuthContext);
    const {mode, tournament, tid1, tid2, tid3, tid4, tid5} = useParams();

    const [allPlayers, setAllPlayers] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState(Array(4).fill([null, null]));
    const [inputCount, setInputCount] = useState(Array(4).fill(0));
    const [isValid, setIsValid] = useState(true);

    const updatePlayers = (id, inputPlayers) => {
        let newPlayers = selectedPlayers.slice();
        newPlayers[id] = inputPlayers;
        setSelectedPlayers(newPlayers);
    }

    const updateInputCount = (id, count) => {
        let newCount = inputCount.slice();
        newCount[id] = count;
        setInputCount(newCount);
    }

    const isValidInput = () => {
        for(let count of inputCount) {
            if (count !== 2)
                return false;
        }
        return true;
    }

    useEffect(() => {
        axios.get("http://localhost:5000/get-players", {
            headers: {'Authorization': `Bearer ${auth.token}`,},
        }).then(response => {
            let players = response.data;
            players.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            players = players.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i)
            setAllPlayers(players);
        })
    }, []);

    const validateInputAndContinue = () => {
        if(!isValidInput())
            setIsValid(false);
        else
            createOrJoinTournament(auth, mode, tournament, tid1, tid2, tid3, tid4, tid5, selectedPlayers);
    }

    return (
        <div>
            <div className="players">Choose 2 players under each category: </div>
            {!allPlayers ?  '' :
                <div className="players-container">
                    <PlayersSelector allPlayers = {allPlayers}
                                     input = {"Scorers"}
                                     updatePlayers={updatePlayers}
                                     updateInputCount={updateInputCount}
                                     id={0}
                    />
                    <PlayersSelector allPlayers = {allPlayers}
                                     input = {"3-Point Scorers"}
                                     updatePlayers={updatePlayers}
                                     updateInputCount={updateInputCount}
                                     id={1}/>
                    <PlayersSelector allPlayers = {allPlayers}
                                     input = {"Assists"}
                                     updatePlayers={updatePlayers}
                                     updateInputCount={updateInputCount}
                                     id={2}/>
                    <PlayersSelector allPlayers = {allPlayers}
                                     input = {"Defenders"}
                                     updatePlayers={updatePlayers}
                                     updateInputCount={updateInputCount}
                                     id={3}/>
                    {!isValid? <div className="valid-error">  Please choose 2 players under each category.</div> : null}
                    <div className="players-btn-con">
                        <Link to={`"/${mode}/${tournament}`}><div className="btn">Back</div></Link>
                        <div onClick={validateInputAndContinue} className="btn">Finish</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SelectPlayers;