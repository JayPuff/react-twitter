import React, { Component } from 'react';
import './Footer.css';
import puffImage from '../assets/puff.png';

class Footer extends Component {
    render() {
        return (
            <div class="Footer">
                <p> Powered by JpuffEsports™ </p>
                <img src={puffImage} alt="puff logo" height="40" width="40"/>
            </div>
        );
    }
}

export default Footer;