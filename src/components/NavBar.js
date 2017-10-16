import React, { Component } from 'react';
import './NavBar.css';
import hashtagImage from '../assets/hashtag.png';

class NavBar extends Component {
    render() {
        return (
            <div className="NavBar" onClick={this.props.onSignOut}>
                <img src={hashtagImage} alt="hashtag logo" height="30" width="25"/>
            </div>
        );
    }
}

export default NavBar;

