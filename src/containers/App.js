import React, { Component } from 'react';
import './App.css';
import NavBar from '../components/NavBar';
import WelcomeBox from '../components/WelcomeBox';
import Footer from '../components/Footer';
import TwitterSession from '../js/twitter-session.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      signingIn: false
    }

    this.twitterSession = new TwitterSession();

    //Function used out of context or in interval!
    this.toggleSignInState = this.toggleSignInState.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    
  }

  render() {
    return (
      <div className="App">
        <NavBar onSignOut={this.onSignOut} />
        <WelcomeBox onSignIn={this.onSignIn} signedIn={this.state.signedIn} signingIn={this.state.signingIn} />
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    this.twitterSession.init(this,function(reactThis) {
      reactThis.setState(prevState => ({ 
        signedIn: true,
        signingIn: false
      }));
    },function(reactThis) {
      reactThis.setState(prevState => ({ 
        signingIn: true
      }));
    }, function(reactThis) {
      reactThis.setState(prevState => ({ 
        signedIn: false,
        signingIn: false
      }));
    });
  }

  onSignIn() {
    if(this.state.signingIn) {
      return;
    }

    this.twitterSession.authorize(function() {
      console.log("App.js can't log in or doesn't need to!");
    })

  }

  onSignOut() {
    if(this.state.signedIn) {
      this.twitterSession.logout();
    }
  }

  toggleSignInState() {
    this.setState(prevState => ({ 
      signedIn: !prevState.signedIn
    }));
  }

}

export default App;
