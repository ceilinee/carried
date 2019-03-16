import React, { Component } from 'react';
import UserID from './UserID';
import { Tabs, TabLink, TabContent } from '../node_modules/react-tabs-redux';
import TextField from '../node_modules/material-ui/TextField';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import getMuiTheme from '../node_modules/material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { yellow500, deepPurpleA100, deepPurpleA200, deepPurpleA400 } from 'material-ui/styles/colors';
import Add from '../node_modules/material-ui-icons/Add.js';
import Modal from 'react-modal';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import Task from './newyork.jpg';
import Error from './error.png';
import Project from './Project';
import './home.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      address:'',
      time: '',
      seats: '',
      home: true,
      open: false,
      projectName : '',
      date: '',
      project: [],
      width: 0,
      height: 0,
      timeSpent: 0,
      email: '',
      showComplete: false,
      complete: [],
      check: 0,
      school:false,
      extra:false,
      work:false,
      location: '',
      filterList: [],
      myPost: [],
      renderProjectList: [],
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  componentDidMount() {
    this.updateWindowDimensions();
    this.fetchProject();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentWillMount() {
    this.fetchProject();
  }
  fetchProject = () => {
    fetch('http://localhost:3000/project/' + UserID.getID(), {
			accept: 'application/json',
		}).then((response) => response.json()).then(response => {
			this.setProject(response);
		});
  }
  setProject = (data) => {
    console.log(data);
    var array = [];
    var mypost = [];
    var completed = [];
    var x = 0;
    var time = 0;
    for(var i = 0; i<data.length; i++){
      array.push(data[i]);
      if(data[i].idUsers === UserID.getID()){
        mypost.push(data[i]);
      }
      console.log(array);
    }
    this.setState({
      project: array,
      renderProjectList: array,
      complete: completed,
      myPost: mypost,
    })
    this.setState({
      check: x,
      timeSpent: time,
    })
  }
  openModal() {
    this.setState({
      open: true,
    })
  }
  closeModal() {
    this.setState({
      open: false,
    })
  }
  handleAddProject = () => {
    return axios.post('http://localhost:3000/users/project', { address: this.state.address, date: this.state.date , time: this.state.time, idUsers: UserID.getID(), seats: this.state.seats, location: this.state.location, contact: this.state.email})
    .then(() => this.fetchProject());
  }
  renderFilter = () => {
    return(
      <div className = "filter">
      Filter by Location
      <div className="radioset">
          <div className="radiotitle">
              <div>
                  <input className="radiobutton" type="checkbox" name="select" id="Downtown" onChange={()=> {this.setFilter("Downtown")}}/>
                  <label className="radiolabel">Downtown</label>
              </div>
              <div>
                  <input className="radiobutton" type="checkbox" name="select" id="Scarborough" onChange={()=> {this.setFilter("Scarborough")}}/>
                  <label className="radiolabel">Scarborough</label>
              </div>
              <div>
                  <input className="radiobutton" type="checkbox" name="select" id="Markham" onChange={()=> {this.setFilter("Markham")}}/>
                  <label className="radiolabel">Markham</label>
              </div>
              <div>
                  <input className="radiobutton" type="checkbox" name="select" id="Brampton" onChange={()=> {this.setFilter("Brampton")}}/>
                  <label className="radiolabel">Brampton</label>
              </div>
              <div>
                  <input className="radiobutton" type="checkbox" name="select" id="Mississauga" onChange={()=> {this.setFilter("Mississauga")}}/>
                  <label className="radiolabel">Mississauga</label>
              </div>
          </div>
      </div>
      </div>
    )
  }
  setFilter = (city) => {
    var array = this.state.filterList;
    if(array.indexOf(city) == -1){
      array.push(city);
      this.alterProject(array);
    }
    else{
      array.splice(array.indexOf(city),1);
      if(array.length>0){
        this.alterProject(array);
      }
      else{
        this.setState({
          renderProjectList: this.state.project,
        })
      }
    }
    this.setState({filterList:array});
  }
  alterProject = (array) => {
    var alterarray = [];
    for(var i =0; i<array.length; i++){
      for(var j=0; j<this.state.project.length; j++){
          if(this.state.project[j].Location === array[i]){
            alterarray.push(this.state.project[j]);
          }
      }
    }
    this.setState({
      renderProjectList: alterarray,
    })
  }
  renderProjects = () => {
    console.log(this.state.renderProjectList);
    var projects = this.state.renderProjectList;
    return(
      <div>
      {this.state.renderProjectList.map(projects =>
          <Project
          key={projects.idPost}
          projects={projects}
          refresh={() => {this.fetchProject()}}
        />
      )}
      </div>
    )
  }
  renderMyProjects = () => {
    console.log(this.state.renderProjectList);
    var projects = this.state.myPost;
    return(
      <div>
      {this.state.myPost.map(projects =>
          <Project
          key={projects.idPost}
          projects={projects}
          refresh={() => {this.fetchProject()}}
        />
      )}
      </div>
    )
  }
  renderHeader = () => {
    var find = "selected";
    var posted = "selection";
    if(!this.state.home){
      posted = "selected";
      find = "selection";
    }
    return(
      <div>
        <div className="links">
          <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Blue_circle_logo.svg/1024px-Blue_circle_logo.svg.png" className="logo-header"/>
          Carried Carpool Service
            <span className={find} onClick = {() => {this.setState({home: true})}}>
              Find a ride
            </span>
            <span className={posted} onClick = {() => {this.setState({home: false})}}>
              My Posted Rides
            </span>
        </div>
     </div>
    )
  }
  setSchool = () => {
    if(this.state.school){
      this.setState({
        school:false,
        extra:false,
        work:false
      })
    }
    else{
      this.setState({
        school:true,
        extra:false,
        work:false
      })
    }
    console.log(this.state.school);
  }
  setExtra = () => {
    if(this.state.extra){
      this.setState({
        extra:false,
        school:false,
        work:false
      })
    }
    else{
      this.setState({
        extra:true,
        school:false,
        work:false
      })
    }
    console.log(this.state.school);
  }
  setWork = () => {
    if(this.state.work){
      this.setState({
        work:false,
        school:false,
        extra:false
      })
    }
    else{
      this.setState({
        work:true,
        school:false,
        extra:false
      })
    }
    console.log(this.state.school);
  }
  modalAddProject() {
    const styles = {
      errorStyle: {
        color: '#FF847C',
      },
      underlineFocusStyle: {
        borderColor: 'rgb(0, 188, 212)',
      },
      floatingLabelStyle: {
        color: '#2A363B',
      },
      floatingLabelFocusStyle: {
        color: '#FF847C',
      },
    };
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        width									: '550px',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    console.log("hi");
    return(
      <Modal ariaHideApp={false} isOpen={this.state.open} onRequestClose={this.closeModal} style={customStyles}>
        <div className = 'text'>
          <h2 className = 'head'> New Trip </h2>
        </div>
        <input type="text" className="textbox" id= "address" placeholder="Trip Address" value={this.state.address} onChange={(event)=> {this.setState({address : event.target.value})}}/>
        <input type="text" className="textbox" id= "date" placeholder="Trip Date (MM/DD/YYYY)" value={this.state.date} onChange={(event)=> {this.setState({date : event.target.value})}}/>
        <input type="text" className="textbox" id= "time" placeholder="Trip Time" value={this.state.time} onChange={(event)=> {this.setState({time : event.target.value})}}/>
        <input type="text" className="textbox" id= "seats" placeholder="Number of Seats Available" value={this.state.seats} onChange={(event)=> {this.setState({seats : event.target.value})}}/>
        <input type="text" className="textbox" id= "email" placeholder="Contact Email" value={this.state.email} onChange={(event)=> {this.setState({email : event.target.value})}}/>
        <div className="radioset">
            <div className="radiotitle">
                <input className="radiobutton" type="radio" name="select" id="school" onChange={()=> {this.setState({location: 'Downtown'})}}/>
                <label className="radiolabel">Downtown</label>
                <input className="radiobutton" type="radio" name="select" id="extra" onChange={()=> {this.setState({location: 'Markham'})}}/>
                <label className="radiolabel">Markham</label>
                <input className="radiobutton" type="radio" name="select" id="work" onChange={()=> {this.setState({location: 'Scarborough'})}}/>
                <label className="radiolabel">Scarborough</label>
                <input className="radiobutton" type="radio" name="select" id="work2" onChange={()=> {this.setState({location: 'Mississauga'})}}/>
                <label className="radiolabel">Mississauga</label>
                <input className="radiobutton" type="radio" name="select" id="work3" onChange={()=> {this.setState({location: 'Brampton'})}}/>
                <label className="radiolabel">Brampton</label>
                <input className="radiobutton" type="radio" name="select" id="worrk4" onChange={()=> {this.setState({location: 'Other'})}}/>
                <label className="radiolabel">Other</label>
            </div>
        </div>
        <button className= "addButton" onClick={() => {
            this.handleAddProject().then(alert("New Post Added!")).then(this.closeModal).then(() => {this.setState({ projectName: '', date:'', work: false, school: false, extra: false})})}}>
            Add Post
        </button>
      </Modal>
    )
  }
  toggleCheck =() => {
    console.log(this.state.showComplete);
    if(this.state.showComplete){
    this.setState({showComplete : false})
    }
    else{
      this.setState({showComplete : true})
    }
  }
  render() {
    var check = 0;
    var complete = 'completed';
    var bar = "yellow";
    console.log(this.state.complete);
    if(this.state.showComplete){
      check=this.state.project.length;
      complete='incomplete';
    }
    if(this.state.home){
      return (
        <div>
        {this.renderHeader()}
        <div className = "block">
          <div className = "project">
            <div className="task"/>
            <div className = "today">
              {!this.state.home ? "Rides I've posted" : "Search for your next ride!"}
            </div>
            <div className = "add">
                <div className = "plus" onClick={this.openModal}>
                +
                </div>
            </div>
            {this.modalAddProject()}
            <div className="project-space">
                <div className= "project-side">
                    {this.renderProjects()}
                </div>
            {this.renderFilter()}
            </div>
          </div>
        </div>
        </div>
      );
    }
    else{
      return (
        <div>
        {this.renderHeader()}
        <div className = "block">
          <div className = "project">
            <div className="task"/>
            <div className = "today">
              {this.state.showComplete ? "Rides I've posted" : "Search for your next ride!"}
            </div>
            <div className = "add">
                <div className = "plus" onClick={this.openModal}>
                +
                </div>
            </div>
            {this.modalAddProject()}
            <div className="project-space-full">
                <div className= "project-side-full">
                    {this.renderMyProjects()}
                </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
  }
}

export default Home;
