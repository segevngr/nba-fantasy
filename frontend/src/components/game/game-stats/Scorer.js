import React from 'react';

const Scorer = (props) => {

    return(
        <tr>
            <td>
                {props.points +' Points for ' +props.name}
            </td>
            <td style={{textAlign: "right"}}>
                +{props.points/2}
            </td>
        </tr>
    )
}

export default Scorer;