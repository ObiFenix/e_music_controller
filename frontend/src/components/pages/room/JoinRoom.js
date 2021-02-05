import React, { Component } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class JoinRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        };
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleJoinRoomButtonPressed = this.handleJoinRoomButtonPressed.bind(this);
    }

    handleTextFieldChange(event) {
        this.setState({
            roomCode: event.target.value,
            error: !event.target.value.length ? "Invalid Input" : ""
        })
    }

    handleJoinRoomButtonPressed(event) {
        const requestOption = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };

        fetch('/api/join-room', requestOption)
            .then(response => {
                response.ok ? this.props.history.push(`/room/${this.state.roomCode}`) : this.setState({
                    error: 'Room not found.'
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Join a Room
                    </Typography>
               </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        error={this.state.error}
                        label="code"
                        placeholder="Enter a Room Code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        onChange={this.handleTextFieldChange}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        component={Link}
                        onClick={this.handleJoinRoomButtonPressed}><span Style="width: 10rem">Join</span>
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        to="/"
                        component={Link}><span Style="width: 10rem">Cancel</span>
                    </Button>
                </Grid>
            </Grid>
        );
    }
}