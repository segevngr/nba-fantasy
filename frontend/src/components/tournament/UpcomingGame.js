import React from 'react';
import './UpcomingGame.css'
import LOGOS from "../../assets/team-logos/logos";

const UpcomingGame = (props) => {
    let homeName = '-';
    let awayName = '-';
    let date = '-';
    let homeId = '0';
    let awayId = '0';

    if(props.data) {
        homeName = props.data.homeName;
        awayName = props.data.awayName;
        date = props.data.date;
        homeId=props.data.homeId;
        awayId=props.data.awayId;
    }

    return (
        <div>
            <table className={props.id%2 === 0? "upcoming-even" : "upcoming-odd"}>
                <tbody>
                <tr>
                    <td className="upcoming-logo"><img src={LOGOS.get(homeId)} alt ="" height='25px' width='25px'/></td>
                    <td className="upcoming-team"> {homeName}</td>
                    <td className="upcoming-logo"><img src={LOGOS.get(awayId)} alt ="" height='25px' width='25px'/></td>
                    <td className="upcoming-team"> {awayName} </td>
                    <td className="date">{date}</td>
                </tr>
                </tbody>
            </table>
        </div>

    );
}

export default UpcomingGame;
