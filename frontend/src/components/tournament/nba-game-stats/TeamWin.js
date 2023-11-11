import React from 'react';

const TeamWin = (props) => {

    return(
    <tr>
        <td>
            {props.winner +' Won!'}
        </td>
        <td style={{textAlign: "right"}}>
            +20
        </td>
    </tr>
    );
}

export default TeamWin;