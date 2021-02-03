import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

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
        fetch(`/api/get-room?code=#${this.roomCode}`)
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
        console.log(this.state);
        console.log(this.roomCode);
        debugger;
        return (
            <div>
                <h3>Room <span Style="color: 444">{this.roomCode}</span></h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
        );
    }
}