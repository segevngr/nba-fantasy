import React from 'react';
import './RankingTable.css'

const RankingTable = (props) => {

    const getUsername = (id) => {
        for(let user of props.users){
            if(id === user._id.toString()){
                return user.username;
            }
        }
        return null;
    }

    const getRanking = () => {
        let rankings=[];
        for (let userP of props.game.users_pref) {
            let userId = userP.userId;
            let score = userP.score;
            let change = userP.change;
            let username = getUsername(userId);
            rankings.push([username, score, change])
        }

        rankings.sort(function (a, b) {
            return b[1] - a[1]
        });

        return renderRanking(rankings)
    }

    const renderRanking = (ranking) => {
        let rank=0;
       return ranking.map(function (user) {
            rank++;
            return (
                <tr className={"user-rank-" +rank%2}>
                    <td className="rank-col">{rank}</td>
                    <td className="name-col">{user[0]}</td>
                    <td className="score-col">{user[1]}</td>
                    <td className="change-col">{user[2]}</td>
                </tr>
            );
        });
    }

    return (
        <div className="ranking-container">
            <table className="ranking-table">
                <tbody>
                <tr className="table-headers">
                    <td>Rank</td>
                    <td>Name</td>
                    <td>Score</td>
                    <td>Change</td>
                </tr>
                {props.users && props.game && getRanking()}
                </tbody>
            </table>
        </div>
    );
}

export default RankingTable;