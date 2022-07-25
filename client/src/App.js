import React from 'react';
import {Container, AppBar, Typography, Grow, Grid, Button} from '@material-ui/core';
import News from './components/News/News';
import DatePick from './components/DatePick/DatePick'
import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    return (
        <Container maxWidth = "lg">
            <AppBar  position = "static" color = "inherit">
                <Typography variant = "h2" align = "center">NewsPro</Typography>
                <Button className = {classes.signUp} variant="contained">Sign Up</Button>
                <Button className = {classes.logIn} variant="outlined">Log In</Button>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing = "3">
                        <Grid item xs = "12" sm = "12">
                            <News />

                        </Grid>
                        <Grid item xs = "12" sm = "12">
                            <DatePick />
                            
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
        
    )
}

export default App;