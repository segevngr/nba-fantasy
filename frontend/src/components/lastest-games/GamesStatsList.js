import React from 'react';
import GameStats from "./GameStats";
import './GamesStatsList.css'

const GamesStatsList = (props) => {

    const renderGameStats = (blockId) => {
        return (
            <GameStats
                gameStats = {props.gamesStats[blockId]}
                tournamentData = {props.tournamentData}
                id = {blockId}
            />
        );
    }

    return (
        <div className='scores-list'>
            <div>{renderGameStats(0)}</div>
            <div>{renderGameStats(1)}</div>
            <div>{renderGameStats(2)}</div>
            <div>{renderGameStats(3)}</div>
            <div>{renderGameStats(4)}</div>
            <div>{renderGameStats(5)}</div>
            <div>{renderGameStats(6)}</div>
            <div>{renderGameStats(7)}</div>
            <div>{renderGameStats(8)}</div>
            <div>{renderGameStats(9)}</div>
        </div>
    )
}

export default GamesStatsList;