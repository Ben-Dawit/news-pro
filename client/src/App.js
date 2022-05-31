import React from 'react';
import {Container, AppBar, Typography, Grow, Grid, Button} from '@material-ui/core';
import News from './components/News/News';
import Calendar from './components/Calendar/Calendar'

const App = () => {
    return (
        <Container maxWidth = "lg">
            <AppBar position = "static" color = "inherit">
                <Typography variant = "h2" align = "center">NewsPro</Typography>
                <Button variant="contained">Sign Up</Button>
                <Button variant="outlined">Log In</Button>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing = "3">
                        <Grid item xs = "12" sm = "7">
                            <News />

                        </Grid>
                        <Grid item xs = "12" sm = "4">
                            <Calendar />
                            
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
        
    )
}

export default App;