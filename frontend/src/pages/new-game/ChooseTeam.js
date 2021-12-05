import React from 'react';
import './ChooseTeam.css';
import TeamPicker from "../../components/add-game/TeamPicker";

const ChooseTeam = () => {

    return (
        <div>
            <div className="choose-team-title">Choose your 5 Winners </div>
            <TeamPicker/>
        </div>
    )
}

export default ChooseTeam;