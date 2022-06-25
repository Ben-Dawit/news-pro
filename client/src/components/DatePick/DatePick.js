import React from 'react';
// import useStyles from './styles'
// import { Calendar } from '@material-ui/pickers'
import LoadingButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const DatePick = () =>{
    // const classes = useStyles();

    return (
        <div>
        <TextField
            id="date"
            label="News Date"
            type="date"
            defaultValue="2022-06-25"
            sx={{ width: 220 }}
            InputLabelProps={{
                shrink: true,
            }}
        />
        <LoadingButton loading variant="outlined">
            Submit
        </LoadingButton>
        </div>
    );
}

export default DatePick;