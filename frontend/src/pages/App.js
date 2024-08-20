import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="logo-container">
                    <div className="logo">A</div>
                </div>
                <div className="content">
                    <h1 className="title">AMPLIFY</h1>
                    <button className="button login">Log in</button>
                    <button className="button signin">Sign in</button>
                </div>
            </div>
        );
    }
}

export default App;