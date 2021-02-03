import React, { Component } from 'react';
import { render } from 'react-dom';

export default class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div>
                <div class="container">
                    <h1>Create New Room</h1>
                </div>
                <div class="container">
                    <p>Hi <span class="text-green">{ this.state.name }</span>! This is where to add a new room.</p>
                </div>
            </div>
        )
    }
}