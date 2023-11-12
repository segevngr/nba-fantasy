import React from 'react';
import './SelectTeams.css';
import TeamsSelector from "../../components/selection/TeamsSelector";

const SelectTeams = () => {

    return (
        <div>
            <div className="choose-team-title">Choose your 5 teams: </div>
            <TeamsSelector/>
        </div>
    )
}

export default SelectTeams;