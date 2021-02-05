import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHost: false,
            votesToSkip: 2,
            guestCanPause: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
    }

    getRoomDetails() {
        fetch(`/api/get-room?code=${this.roomCode}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_skip_song,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            }
        );
    }

    render() {
        return (
            <Grid align="center">
                <h3>Room <span className="text-green">{this.roomCode}</span></h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause ? "Yes" : "No"}</p>
                <p>Host: {this.state.isHost ? "Owner" : "Guest"}</p>
            </Grid>
        );
    }
}