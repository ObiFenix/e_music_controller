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

export default class JoinRoom extends Component {
    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes
        };
        this.handleVotesChange = this.handleVotesChange.bind(this)
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this)
        this.handleCreateRoomButtonPressed = this.handleCreateRoomButtonPressed.bind(this)
    }

    handleVotesChange(event) {
        this.setState({
            votesToSkip: event.target.value
        });
    }

    handleGuestCanPauseChange(event) {
        this.setState({
            guestCanPause: event.target.value === "true"
        });
    }

    handleCreateRoomButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_skip_song: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };

        fetch('/api/create-room', requestOptions)
            .then(response => response.json())
            .then(data => this.props.history.push(`/room/${data.code}`));
//            .then(data => console.log(data));
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h2" variant="h2">
                        Join Room Page
                    </Typography>
               </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fields">
                        <FormHelperText>
                            <p align="center">Guest Control of Playback State</p>
                            <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
                                <FormControlLabel
                                    value="true"
                                    control={<Radio color="primary" />}
                                    label="Play/Pause"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio color="secondary" />}
                                    label="No Control"
                                    labelPlacement="bottom"
                                />
                            </RadioGroup>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            defaultValue={this.defaultVotes}
                            onChange={this.handleVotesChange}
                            inputProps={{
                                min: 1,
                                style: {textAlign: "center"}
                            }}
                        />
                        <FormHelperText>
                            <div align="center">Votes Required To Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        component={Link}
                        onClick={this.handleCreateRoomButtonPressed}><span Style="width: 8rem">Create A Room</span>
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        to="/"
                        component={Link}><span Style="width: 8rem">Cancel</span>
                    </Button>
                </Grid>
            </Grid>
        );
    }
}