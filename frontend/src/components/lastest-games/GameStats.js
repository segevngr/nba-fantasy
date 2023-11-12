 import React, {useContext} from 'react';
import './GameStats.css'
import LOGOS from '../../assets/team-logos/logos';
import TeamWin from "./players-stats/TeamWin";
import Scorer from "./players-stats/Scorer";
import Tscorer from "./players-stats/Tscorer";
import Defender from "./players-stats/Defender";
import Assists from "./players-stats/Assists";
import {AuthContext} from "../../utils/auth-context";


const GameStats = (props) => {
    const auth = useContext(AuthContext);

    let currentUserPref;

    let homeId = '0';
    let homeName = '-';
    let homeScore = '-';
    let awayId = '0';
    let awayName = '-';
    let awayScore = '-';
    let date = '-';

    let winner = '';
    let scorers = [['', ''], ['', '']];
    let assists = [['', ''], ['', '']];
    let tscorers = [['', ''], ['', '']];
    let defenders = [['', ''], ['', '']];

    const getWinnerTeam = () => {
        let winnerName;
        let winnerId;
        if (parseInt(homeScore) > parseInt(awayScore)) {
            winnerId = homeId;
            winnerName = homeName;
        } else {
            winnerId = awayId;
            winnerName = awayName;
        }

        for (let team of currentUserPref.teams) {
            if (team === winnerId) {
                winner = winnerName;
            }
        }
    }

    const getScorers = () => {
        for (let scorer of currentUserPref.players.scorers) {
            let i = 0;
            for (let player of props.gameStats.players) {
                if (player && scorer.id === player.pid && player.points !== '0') {
                    scorers[i][0] = scorer.name;
                    scorers[i][1] = player.points;
                }
            }
            i++;
        }
    }

    const getAssists = () => {
        for (let assistPlayer of currentUserPref.players.assists) {
            let i = 0;
            for (let player of props.gameStats.players) {
                if (player && assistPlayer.id === player.pid && player.assists !== '0') {
                    assists[i][0] = assistPlayer.name;
                    assists[i][1] = player.assists;
                }
            }
            i++;
        }
    }

    const getTscorers = () => {
        for (let tscorer of currentUserPref.players.tscorers) {
            let i = 0;
            for (let player of props.gameStats.players) {
                if (player && tscorer.id === player.pid && player.tpm !== '0') {
                    tscorers[i][0] = tscorer.name;
                    tscorers[i][1] = player.tpm;
                }
            }
            i++;
        }
    }

    const getDefenders = () => {
        for (let defender of currentUserPref.players.defenders) {
            let i = 0;
            for (let player of props.gameStats.players) {
                if (player && defender.id === player.pid) {
                    let defPoints = parseInt(player.steals) + parseInt(player.blocks);
                    if (defPoints !== 0)
                        defenders[i][0] = defender.name;
                    defenders[i][1] = defPoints;
                }
            }
            i++;
        }
    }

    if (props.gameStats && props.tournamentData) {
        date = props.gameStats.date;
        homeId = props.gameStats.home.id;
        homeName = props.gameStats.home.name;
        homeScore = props.gameStats.home.score;
        awayId = props.gameStats.away.id;
        awayName = props.gameStats.away.name;
        awayScore = props.gameStats.away.score;

        for(let userPref of props.tournamentData.users_pref) {
            if (userPref.userId === auth.userId)
                currentUserPref = userPref;
        }

        if(currentUserPref) {
            getWinnerTeam();
            getScorers();
            getAssists();
            getTscorers();
            getDefenders();
        }
    }

    return (
        <div>
            <table className={props.id%2 === 0? "game-score-even" : "game-score-odd"}>
                <tbody>
                <tr>
                    <td className="game-stats-team"><img src={LOGOS.get(homeId)} alt='' height='25px' width='25px'className="game-stats-logo"/>{homeName} </td>
                    <td className="game-stats-score"> {homeScore} </td>
                </tr>
                <tr>
                    <td className="game-stats-team"><img src={LOGOS.get(awayId)} alt='' height='25px' width='25px'className="game-stats-logo"/>{awayName} </td>
                    <td className="game-stats-score"> {awayScore} </td>
                </tr>
                {winner ==='' ? null : <TeamWin winner={winner}/>}
                {scorers[0][0]===''? null : <Scorer name={scorers[0][0]} points={scorers[0][1]}/>}
                {scorers[1][0]===''? null : <Scorer name={scorers[1][0]} points={scorers[1][1]}/>}
                {assists[0][0]===''? null : <Assists name={assists[0][0]} points={assists[0][1]}/>}
                {assists[1][0]===''? null : <Assists name={assists[1][0]} points={assists[1][1]}/>}
                {tscorers[0][0]===''? null : <Tscorer name={tscorers[0][0]} points={tscorers[0][1]}/>}
                {tscorers[1][0]===''? null : <Tscorer name={tscorers[1][0]} points={tscorers[1][1]}/>}
                {defenders[0][0]===''? null : <Defender name={defenders[0][0]} points={defenders[0][1]}/>}
                {defenders[1][0]===''? null : <Defender name={defenders[1][0]} points={defenders[1][1]}/>}
                </tbody>
            </table>
        </div>

    );
}

export default GameStats;
