import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom'
import RoomPage from './room/Room'
import JoinRoomPage from './room/JoinRoom'
import CreateRoomPage from './room/CreateRoom'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <div class="container">
                            <h1 class="text-muted">Home Page</h1>
                            <div class="row">
                                <p class="mt-16">Hi <span class="text-red">{ this.state.name }</span>, Welcome to the first attempt to build a responsive website</p>
                            </div>
                        </div>
                    </Route>
                    <Route path='/join' component={JoinRoomPage} name="Manuel" />
                    <Route path='/create' component={CreateRoomPage} />
                    <Route path='/room/:roomCode' component={RoomPage} />
                </Switch>
            </Router>
        );
    }
}