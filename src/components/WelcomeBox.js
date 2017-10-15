import React, { Component } from 'react';
import './WelcomeBox.css';
import esportsImage from '../assets/esportscheck.png';

class WelcomeBox extends Component {
    render() {
        let descString;
        if(this.props.signedIn !== true) {
            descString = "Just how #Esports is your Twitter account? Esports Check™ will perfectly assess your Esports levels using revolutionary software";
        } else {
            descString = "Welcome Back!";
        }

        return (
            <div className="WelcomeBox">

                <img src={esportsImage} alt="esports logo" height="135" width="285"/>
                <div className="WelcomeBox-desc"> {descString} </div>
                { this.props.signedIn !== true ?
                    <div className="twitter-sign-in noselect"> Sign in &nbsp; <i className="fa fa-twitter fa-lg"></i></div>
                    : 
                    null
                }

                { this.props.signedIn !== true ?
                    <div className="twitter-sign-in-desc"> Log in with your twitter account </div>
                    : 
                    null
                }
            </div>
        );
    }
}

WelcomeBox.defaultProps = {
    signedIn: false
};

export default WelcomeBox;