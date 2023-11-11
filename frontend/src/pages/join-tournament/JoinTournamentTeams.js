import React from "react";
import TeamPicker from "../../components/add-tournament/TeamPicker";

const JoinTournamentTeams = () => {
    return (
        <div>
            <div className="choose-team-title">Choose your 5 teams</div>
            <TeamPicker/>
        </div>
    )
}

export default JoinTournamentTeams;