import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {createFilterOptions} from "@mui/material";

const PlayersSelector = (props) => {

    const OPTIONS_LIMIT = 8;
    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
    });

    const getId = (name) => {
        for(let player of props.allPlayers) {
            if(player.name === name)
                return player.id;
        }
    }

    const updatePlayers = (vals) => {
        props.updateInputCount(props.id, vals.length);
        if(vals[0] && vals[1]) {
            let player1 = {name: vals[0].name, id:getId(vals[0].name)};
            let player2 = {name: vals[1].name, id:getId(vals[1].name)};
            let players = [player1, player2];
            props.updatePlayers(props.id, players);
        }
    }

    return (
            <Autocomplete
                filterOptions={filterOptions}
                onChange={(event, value) => updatePlayers(value)}
                sx={{
                    width: 700,
                    padding: 2,
                }}
                multiple
                id="tags-outlined"
                options={props.allPlayers}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.input}
                        placeholder="Search for player"
                    />
                )}
            />
    );
}

export default PlayersSelector;