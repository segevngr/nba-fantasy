import React, {useContext} from 'react';
import './GameStats.css'
import LOGOS from '../../assets/team-logos/logos';
import TeamWin from "./game-stats/TeamWin";
import Scorer from "./game-stats/Scorer";
import Tscorer from "./game-stats/Tscorer";
import Defender from "./game-stats/Defender";
import Assists from "./game-stats/Assists";
import {AuthContext} from "../../utils/auth-context";


const GameStats = (props) => {
    const auth = useContext(AuthContext);

    let userPref;

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

    const getWinner = () => {
        let winnerName;
        let winnerId;
        if (parseInt(homeScore) > parseInt(awayScore)) {
            winnerId = homeId;
            winnerName = homeName;
        } else {
            winnerId = awayId;
            winnerName = awayName;
        }

        for (let team of userPref.teams) {
            if (team === winnerId) {
                winner = winnerName;
            }
        }
    }

    const getScorers = () => {
        for (let scorer of userPref.players.scorers) {
            let i = 0;
            for (let player of props.stats.players) {
                if (player && scorer.id === player.pid && player.points !== '0') {
                    scorers[i][0] = scorer.name;
                    scorers[i][1] = player.points;
                }
            }
            i++;
        }
    }

    const getAssists = () => {
        for (let assistPlayer of userPref.players.assists) {
            let i = 0;
            for (let player of props.stats.players) {
                if (player && assistPlayer.id === player.pid && player.assists !== '0') {
                    assists[i][0] = assistPlayer.name;
                    assists[i][1] = player.assists;
                }
            }
            i++;
        }
    }

    const getTscorers = () => {
        for (let tscorer of userPref.players.tscorers) {
            let i = 0;
            for (let player of props.stats.players) {
                if (player && tscorer.id === player.pid && player.tpm !== '0') {
                    tscorers[i][0] = tscorer.name;
                    tscorers[i][1] = player.tpm;
                }
            }
            i++;
        }
    }

    const getDefenders = () => {
        for (let defender of userPref.players.defenders) {
            let i = 0;
            for (let player of props.stats.players) {
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

    if (props.stats && props.game) {
        date = props.stats.date;
        homeId = props.stats.home.id;
        homeName = props.stats.home.name;
        homeScore = props.stats.home.score;
        awayId = props.stats.away.id;
        awayName = props.stats.away.name;
        awayScore = props.stats.away.score;

        for(let userP of props.game.users_pref) {
            if (userP.userId === auth.userId)
                userPref = userP;
        }

        if(userPref) {
            getWinner();
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
