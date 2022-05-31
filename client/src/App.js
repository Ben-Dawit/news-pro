import React from 'react';
import {Container, AppBar, Typography, Grow, Grid, Button} from '@material-ui/core';

const App = () => {
    return (
        <Container maxWidth = "lg">
            <AppBar position = "static" color = "inherit">
                <Typography variant = "h2" align = "center">NewsPro</Typography>
                <Button variant="contained">Sign Up</Button>
                <Button variant="outlined">Log In</Button>
            </AppBar>
        </Container>
        
    )
}

export default App;