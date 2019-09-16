import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Modal from './components/Modal';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewCompleted: false,
			activeItem: {
				title: '',
				description: '',
				completed: '',
				added_date: ''
			},
			todoList: []
		};
	}

	toggle = () => {
		this.setState( { modal: !this.state.modal });
	}

	handleSubmit = item => {
		this.toggle();
		if( item.id ) {
			axios.put(`/api/todos/${item.id}/`, item).then( res => this.refreshList() ).catch( err => console.log(err));
			return;
		}
		axios.post(`/api/todos/`, item).then( res => this.refreshList() ).catch( err => console.log(err));
	}

	handleDelete = item => {
		if( item.id ) {
			axios.delete(`/api/todos/${item.id}/`).then( res => this.refreshList() ).catch( err => console.log(err));
		}
	}

	createItem = () => {
		const item = { title: "", description: "", completed: false, added_date: "" };
		this.setState({ activeItem: item, modal: !this.state.modal });
	}

	editItem = item => {
		this.setState({activeItem: item, modal: !this.state.modal });
	}



	componentDidMount() {
		this.refreshList();
	}

	refreshList = () => {
		axios
			.get('/api/todos/')
			.then(res => this.setState({ todoList: res.data }))
			.catch(err => console.log(err));
	};

	displayComplete = status => {
		if (status) {
			return this.setState({ viewCompleted: true });
		}
		return this.setState({ viewCompleted: false });
	};

	renderTabList = () => {
		return (
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<a
						onClick={() => this.displayComplete(true)}
						className={`nav-link ${this.state.viewCompleted ? 'active' : ''}`}
						href="#"
					>
						Completed
					</a>
				</li>
				<li className="nav-item">
					<a
						onClick={() => this.displayComplete(false)}
						className={`nav-link ${this.state.viewCompleted ? '' : 'active'}`}
						href="#"
					>
						Incomplete
					</a>
				</li>
			</ul>
		);
	};

	renderItems = () => {
		const { viewCompleted } = this.state;
		const newItems = this.state.todoList.filter(
			item => item.completed === viewCompleted
		);
		return newItems.map(item => (
			<li
				key={item.id}
				className="list-group-item d-flex justify-content-between align-items-center"
			>
				<span
					className={`todo-title mr-2 ${
						this.state.viewCompleted ? 'completed-todo' : ''
					}`}
					title={item.description}
				>
					{item.title}
				</span>
				<span>
					<button className="btn btn-secondary mr-2" onClick={ () => this.editItem(item) }>Edit</button>
					<button className="btn btn-danger" onClick={ () => this.handleDelete(item) }>Delete</button>
				</span>
			</li>
		));
	};

	render() {
		return (
			<main className="content">
				<h1 className="text-uppercase text-center my-4">Todo App</h1>
				<div className="row">
					<div className="col-md-6 col-sm-10 mx-auto p-0">
						<div className="card p-3">
							<div className="">
								<button className="btn btn-primary float-right" onClick={this.createItem}>
									Add task
								</button>
							</div>
							{this.renderTabList()}
							<ul className="list-group list-group-flush">
								{this.renderItems()}
							</ul>
						</div>
					</div>
				</div>
				{ this.state.modal ? (
					<Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit}/>
				) : null }

			</main>
		);
	}
}
