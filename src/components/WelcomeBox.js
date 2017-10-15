import React, { Component } from 'react';
import './WelcomeBox.css';
import esportsImage from '../assets/esportscheck.png';

class WelcomeBox extends Component {
    render() {
        return (
            <div className="WelcomeBox">
                <img src={esportsImage} alt="esports logo" height="135" width="285"/>
                <div className="WelcomeBox-desc"> Just how #Esports is your Twitter account? Esports Check™ will perfectly assess your Esports levels using revolutionary software </div>
                <div className="twitter-sign-in noselect"> Sign in &nbsp; <i className="fa fa-twitter fa-lg"></i></div>
                <div className="twitter-sign-in-desc"> Log in with your twitter account </div>
            </div>
        );
    }
}

export default WelcomeBox;