import React, {useState} from 'react';
import LARGE_LOGOS from "../../assets/team-logos-large/large-logos";
import './TeamButton.css';

const TeamButton = (props) => {

    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        if (!selected && props.teamsSelected === 5)
        {
            return;
        }
        if(selected) {
            props.decSelected();
            props.updateTeamIds(props.teamId);
        }
        else {
            props.incSelected();
            props.updateTeamIds(props.teamId);
        }
        setSelected(!selected);
    }

    return (
        <div className={selected ? "team-btn-selected" : "team-btn"}
             onClick={handleClick}>
            <img src={LARGE_LOGOS.get(props.teamId.toString())} alt ="" height='80px' width='80px'/>
        </div>

    );
}

export default TeamButton;
