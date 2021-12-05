import React from 'react';

const Assists = (props) => {

    return(
        <tr>
            <td>
                {props.points +' Assists for ' +props.name}
            </td>
            <td style={{textAlign: "right"}}>
                +{props.points}
            </td>
        </tr>
    )
}

export default Assists;