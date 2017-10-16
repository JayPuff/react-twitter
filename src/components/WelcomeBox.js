import React, { Component } from 'react';
import './WelcomeBox.css';
import esportsImage from '../assets/esportscheck.png';

class WelcomeBox extends Component {

    render() {
        let descString;
        let buttonStuff = [];
        if(this.props.signedIn !== true) {
            if(this.props.signingIn) {
                descString = "Signing in...";
            } else {
                descString = "Just how #Esports is your Twitter account? Esports Check™ will perfectly assess your Esports levels using revolutionary software";
                buttonStuff.push(
                    <div className="twitter-sign-in noselect" onClick={this.props.onSignIn} key="0"> Sign in &nbsp; 
                        <i className="fa fa-twitter fa-lg"></i>
                    </div>
                );
                buttonStuff.push(
                    <div className="twitter-sign-in-desc" key="1"> Log in with your twitter account </div>
                );
            }
           
        } else {
            descString = "Welcome Back!";
        }

        return (
            <div className="WelcomeBox">

                <img src={esportsImage} alt="esports logo" height="135" width="285"/>
                <div className="WelcomeBox-desc"> {descString} </div>
                {buttonStuff}
            </div>
        );
    }
}

WelcomeBox.defaultProps = {
    signedIn: false
};

export default WelcomeBox;