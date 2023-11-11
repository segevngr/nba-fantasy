import React from 'react';

const Defender = (props) => {

    return(
        <tr>
            <td>
                Defensive bonus for {props.name}
            </td>
            <td style={{textAlign: "right"}}>
                +{props.points}
            </td>
        </tr>
    )
}

export default Defender;