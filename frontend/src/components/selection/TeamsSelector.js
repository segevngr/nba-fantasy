import React, {useState} from 'react';
import TeamButton from "./TeamButton";
import './TeamsSelector.css';
import {useNavigate} from "react-router-dom";

const TeamsSelector = () => {

    const [teamsSelected, setTeamsSelected] = useState(0);
    const [teamIds, setTeamIds] = useState(Array(41).fill(false));
    let navigate = useNavigate();

    const incSelected = () => {
        setTeamsSelected(teamsSelected+1);
    }
    const decSelected = () => {
        setTeamsSelected(teamsSelected-1);
    }

    const updateTeamIds = (id) => {
        let newIds = teamIds;
        newIds[id] = !newIds[id];
        setTeamIds(newIds);
    }

    function renderTeamButton(teamId) {
        return (
            <TeamButton
                teamId = {teamId}
                teamsSelected = {teamsSelected}
                incSelected = {incSelected}
                decSelected = {decSelected}
                updateTeamIds = {updateTeamIds}
            />
        );
    }

    function getSelectedTeamsAndContinue() {
        let selectedTeamsIds = teamIds.reduce((indices, element, index) => {
            if (element)
                indices.push(index);
            return indices;
        }, []);
        navigate(`${window.location.pathname}/${selectedTeamsIds[0]}/${selectedTeamsIds[1]}/${selectedTeamsIds[2]}/${selectedTeamsIds[3]}/${selectedTeamsIds[4]}`)
    }

    const navigateBack = () => {
        let url = window.location.pathname
        const lastSlashIndex = url.lastIndexOf('/');
        let backURL = lastSlashIndex !== -1 ? url.substring(0, lastSlashIndex) : url;
        navigate(backURL)
    }

    return (
        <div>
            <div className="teams-grid">
                <div>{renderTeamButton(1)}</div>
                <div>{renderTeamButton(2)}</div>
                <div>{renderTeamButton(4)}</div>
                <div>{renderTeamButton(5)}</div>
                <div>{renderTeamButton(6)}</div>
                <div>{renderTeamButton(7)}</div>
                <div>{renderTeamButton(8)}</div>
                <div>{renderTeamButton(9)}</div>
                <div>{renderTeamButton(10)}</div>
                <div>{renderTeamButton(11)}</div>

                <div>{renderTeamButton(14)}</div>
                <div>{renderTeamButton(15)}</div>
                <div>{renderTeamButton(16)}</div>
                <div>{renderTeamButton(17)}</div>
                <div>{renderTeamButton(19)}</div>
                <div>{renderTeamButton(20)}</div>
                <div>{renderTeamButton(21)}</div>
                <div>{renderTeamButton(22)}</div>
                <div>{renderTeamButton(23)}</div>
                <div>{renderTeamButton(24)}</div>

                <div>{renderTeamButton(25)}</div>
                <div>{renderTeamButton(26)}</div>
                <div>{renderTeamButton(27)}</div>
                <div>{renderTeamButton(28)}</div>
                <div>{renderTeamButton(29)}</div>
                <div>{renderTeamButton(30)}</div>
                <div>{renderTeamButton(31)}</div>
                <div>{renderTeamButton(38)}</div>
                <div>{renderTeamButton(40)}</div>
                <div>{renderTeamButton(41)}</div>
            </div>
            <div className="team-picker-btn-container">
               <div onClick={navigateBack} className="btn">Back</div>
                {teamsSelected===5 ?
                   <div className="btn" onClick={getSelectedTeamsAndContinue}>Next</div>
                    : <div className="disabled-btn">Next</div>}
            </div>
        </div>

    );
}

export default TeamsSelector;