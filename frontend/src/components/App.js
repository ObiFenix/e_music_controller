import React, { Component } from 'react';
import { render } from 'react-dom';
import HomePage from './pages/Home'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <HomePage name="Miguel"/>
    }
}

render(<App />, document.getElementById("app"));
