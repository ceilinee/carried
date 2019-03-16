import React from 'react';
import moment from 'moment';
import axios from 'axios';
import garbage from './garbage.png';
import people from './people.png';
import './Project.css';
import Modal from 'react-modal';
import UserID from './UserID';

export default class Project extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            projectName: [],
						project: false,
						edit:false,
						address: this.props.projects.Address,
						date: this.props.projects.PostDate,
						time: this.props.projects.PostTime,
						seats: this.props.projects.Seats,
						email: this.props.projects.Contact,
        }
  }
  componentWillMount() {
		if(this.props.projects.checked){
		this.setState({
			project: true,
		})
	  }
		else{
			this.setState({
				project: false,
			})
		}
	}
	handleChange = () => {
		if(!this.state.project){
			this.setState({
				project: true,
			})
			this.setTrue();
	  }
		else{
			this.setState({
				project: false,
			})
			this.setTrue();
		}
	}
	setTrue = () => {
    axios.put('https://task-ceiline.herokuapp.com/project/true', { name: this.props.projects.name, idUsers: UserID.getID() })
    .then(() => {this.props.refresh()});
	}
	handleUpdateProject = () => {
		return axios.post('http://localhost:3000/users/project/update', { address: this.state.address, date: this.state.date , time: this.state.time, idPost: this.props.projects.idPost, seats: this.state.seats, location: this.state.location, contact: this.state.email})
    .then(() => this.props.refresh());
	}
	renderEdit = () => {
		return(
			<a className = "edit" onClick={()=> {this.setState({edit: true})}}>
				Edit
			</a>
		)
	}
	renderDelete = () => {
		return(
			<a className = "delete" onClick={() => {this.confirmDelete()}}>
				Delete
			</a>
		)
	}
	confirmDelete = () =>
	{
	  var x = window.confirm("Are you sure you want to delete?");
	  if (x){
			this.deletePost();
			return true;
		}
	  else{
			return false;
		}
	}

	closeModal = () => {
		this.setState({edit : false});
	}
	renderEditBox = () => {
		console.log("edit")
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
		return(
			<Modal ariaHideApp={false} isOpen={this.state.edit} onRequestClose={this.closeModal} style={customStyles}>
					<div className = 'text'>
						<h2 className = 'head'> Update Trip </h2>
					</div>
					<input type="text" className="textbox" id= "color" value={this.state.address} onChange={(event)=> {this.setState({address : event.target.value})}}/>
					<input type="text" className="textbox" id= "color" value={this.state.date} onChange={(event)=> {this.setState({date : event.target.value})}}/>
					<input type="text" className="textbox" id= "color" value={this.state.time} onChange={(event)=> {this.setState({time : event.target.value})}}/>
					<input type="text" className="textbox" id= "color" value={this.state.seats} onChange={(event)=> {this.setState({seats : event.target.value})}}/>
					<input type="text" className="textbox" id= "color" value={this.state.email} onChange={(event)=> {this.setState({email : event.target.value})}}/>
					<button className= "addButton" onClick={() => {
							this.handleUpdateProject().then(alert("Post Updated!")).then(this.closeModal)}}>
							Update Post
					</button>
			</Modal>
		)
	}
	deletePost = () => {
		console.log("hello");
		axios.delete('http://localhost:3000/project/delete', { params: { idPost: this.props.projects.idPost } })
		.then(() => {this.props.refresh()});
	}
  render(){
		var box = "box";
		var sideline = "side-line";
		if(this.props.projects.work == "true"){
			box = "box-yellow";
			sideline = "side-line-yellow";
		};
		if(this.props.projects.extra == "true"){
			box = "box-green";
			sideline = "side-line-green";
		};
		if(this.props.projects.idUsers === UserID.getID() || UserID.getID() === '1'){
			return(
					<div className = {box}>
							<span className = "project-title">
							{this.props.projects.Address}, {this.props.projects.Location}
							</span>
							, {this.props.projects.PostTime}, {this.props.projects.PostDate}
							<span className = "project-seats">
							{this.renderDelete()}
							{this.renderEdit()}
							{this.renderEditBox()}
								<span className = "project-title-seats">
								{this.props.projects.Seats}
								</span>
								<img src={people} className="seats"/>
							</span>
							<div>
								{this.props.projects.Contact}
							</div>
					</div>
			);
		}
		else{
			return(
					<div className = {box}>
							<span className = "project-title">
							{this.props.projects.Address}, {this.props.projects.Location}
							</span>
							, {this.props.projects.PostTime}, {this.props.projects.PostDate}
							<span className = "project-seats">
								<span className = "project-title-seats">
								{this.props.projects.Seats}
								</span>
								<img src={people} className="seats"/>
							</span>
							<div>
								{this.props.projects.Contact}
							</div>
					</div>
			);
		}
    }
  }
