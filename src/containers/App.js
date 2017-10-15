import React, { Component } from 'react';
import './App.css';
import NavBar from '../components/NavBar';
import WelcomeBox from '../components/WelcomeBox';
import Footer from '../components/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false
    }

    //Function used out of context in interval!
    this.changeSignInState = this.changeSignInState.bind(this);
  }

  componentDidMount() {
    setInterval(this.changeSignInState,1000);
  }

  changeSignInState() {
    this.setState(prevState => ({ 
      signedIn: !prevState.signedIn
    }));
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <WelcomeBox signedIn={this.state.signedIn} />
        <Footer />
      </div>
    );
  }

}

export default App;
