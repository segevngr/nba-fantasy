import React from 'react';
import UpcomingGame from "./UpcomingGame";
import './UpcomingGamesList.css';

const UpcomingGamesList = (props) => {

    const renderUpcomingGame = (blockId) => {
        return (
            <UpcomingGame
                data = {props.upcomingResponse[blockId]}
                id = {blockId}
            />
        );
    }

    return (
        <div>
            <div>{renderUpcomingGame(0)}</div>
            <div>{renderUpcomingGame(1)}</div>
            <div>{renderUpcomingGame(2)}</div>
            <div>{renderUpcomingGame(3)}</div>
        </div>
    );
}

export default UpcomingGamesList;