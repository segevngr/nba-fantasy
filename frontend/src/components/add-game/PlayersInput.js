import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {createFilterOptions} from "@mui/material";

const PlayersInput = (props) => {

    const OPTIONS_LIMIT = 8;
    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
    });

    const getId = (name) => {
        for(let player of props.playerMap) {
            if(player.name === name)
                return player.id;
        }
    }

    const updatePlayers = (vals) => {
        if(vals[0] && vals[1]) {
            let player1 = {name: vals[0].name, id:getId(vals[0].name)};
            let player2 = {name: vals[1].name, id:getId(vals[1].name)};
            let players = [player1, player2];
            if(props.updateScorers)
                props.updateScorers(players);
            if(props.updateTscorers)
                props.updateTscorers(players);
            if(props.updateAssists)
                props.updateAssists(players);
            if(props.updateDefenders)
                props.updateDefenders(players);
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
                options={props.playerMap}
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

export default PlayersInput;