import React, {useState} from 'react';
import TeamButton from "./TeamButton";
import './TeamPicker.css';
import {Link} from "react-router-dom";

const TeamPicker = () => {

    const [teamsSelected, setTeamsSelected] = useState(0);
    const [teamIds, setTeamIds] = useState(Array(41).fill(false));

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

    function getSelectedTeams() {
        let ids = [0, 0, 0, 0, 0];
        let idx = 0;
        for(let i=0; i<teamIds.length; i++) {
            if(teamIds[i]) {
                ids[idx] = i;
                idx++;
            }
        }
        return window.location.pathname +"/" +ids[0] +"/" +ids[1] +"/" +ids[2]
            +"/" +ids[3] +"/" +ids[4];
    }

    const getBackURL = () => {
        const currURL = window.location.pathname;
        const split = currURL.split("/");
        let back ='';
        for(let i=0; i<split.length-1; i++)
            back = back + split[i] + "/";
        return back;
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
                <Link to={getBackURL()}><div className="btn">Back</div></Link>
                <Link to={getSelectedTeams()}><div className="btn">Next</div></Link>
            </div>
        </div>

    );
}

export default TeamPicker;
