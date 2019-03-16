import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import serverURL from './serverURL';
import { Tabs, TabLink, TabContent } from '../node_modules/react-tabs-redux';
import TextField from '../node_modules/material-ui/TextField';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import './App.css';
import './tab.css';
import './home.css';
import Logo from './clip.png';
import car from './car.png';
import Task from './task.png';
import Error from './error.png';
import UserID from './UserID';

class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: '',
      password: '',
      width: 0,
      height: 0,
      logintoggle:false
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleSignUp= this.handleSignUp.bind(this);
    this.handleLogIn= this.handleLogIn.bind(this);
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  setEmail = (event) => {
      this.setState({
          email: event.target.value
      });
  }
  setPassword = (event) => {
      this.setState({
          password: event.target.value
      });
  }
  login(data){
    if(data!="Failed Login" && data!="No Email or Password"){
      UserID.setID(data.Activated.idUsers);
      this.handleOnClick()
    }
    else{
      alert("login failed");
    }
  }
  handleSignUp () {
    return axios.post('http://localhost:3000/users', { email: this.state.email, password: this.state.password })
    .then(response => console.log(response)).then(this.setState({email: '', password: ''}));
  }
  handleLogIn () {
    return axios.get('http://localhost:3000/users/'+this.state.email+'/'+this.state.password)
    .then(response => this.login(response.data));
  }
  handleOnClick = () => {
  this.setState({redirect: true});
  }
  renderLogin = () => {
    const styles = {
      errorStyle: {
        color: '#FF847C',
      },
      underlineFocusStyle: {
        borderColor: '#99B898',
      },
      floatingLabelStyle: {
        color: '#2A363B',
      },
      floatingLabelFocusStyle: {
        color: '#FF847C',
      },
    };
    return (
      <div className = "title-back">
        <h1 className = "title-small">Login</h1>
        <p>Welcome back! Login to start searching for your next Carpool.</p>
        <div className = 'text'>
        <input type="text" className="textbox-small" id= "loginemail" placeholder="Deloitte Email" value={this.state.email} onChange={(event)=> {this.setState({email : event.target.value})}}/>
        <input type="password" className="textbox-small" id= "loginpassword" placeholder="Deloitte Password" value={this.state.password} onChange={(event)=> {this.setState({password : event.target.value})}}/>
        </div>
        <div className="account">
        <span>Forget your password?</span> <span className="purple" onClick={() => {this.setState({logintoggle:false})}}>Check your myDeloitte</span>
        </div>
        <button className= "load-small" onClick={this.handleLogIn}>
          Login
        </button>
      </div>
    )
  }
  render() {
    if (this.state.redirect) {
    return <Redirect push to="/home" />;
    }
    if(this.state.width > 700){
      return (
        <div className="App">
          <div className = "rightside">
            <img src={car} className = "car-pic"/>
          </div>
          <div className = "Post-small">
          <img src={Logo} className="logo-header-small"/>
            {this.renderLogin()}
          </div>
        </div>
      );
    }
    else{
    return (
      <div className="App">
        <div className = "Post">
        <img src={Logo} className="logo-header-small"/>
          {this.renderLogin()}
        </div>
      </div>
    );
  }
  }
}

export default App;
