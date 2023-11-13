import React from 'react';

const Tscorer = (props) => {

    return(
        <tr>
            <td>
                {props.points +' Threes for ' +props.name}
            </td>
            <td style={{textAlign: "right"}}>
                +{props.points}
            </td>
        </tr>
    )
}

export default Tscorer;