import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import logo from './logo.svg';
import './App.css';
var update = require('immutability-helper');

class App extends Component {

    //#region Constructor

    constructor() {
        super();
        this.state = {
            users: [],
            IsUserAddModalOpen: false,
            name: '',
            email: '',
            contact: '',
            isUpdate: false,
            updateId: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    //#endregion

    //#region Events

    //Event to handle change in input 
    //e : generated event

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //Event to open a modal

    openAddUserModal = () => {
        this.setState({ IsUserAddModalOpen: true });
    };

    //Event to close a modal

    closeAddUserModal = () => {
        this.setState({ IsUserAddModalOpen: false, name: '', email: '', contact: '' });
    };

    //Event to add or update user data

    handleSubmit() {
        if (!this.state.isUpdate) {
            this.setState({ users: [...this.state.users, { name: this.state.name, email: this.state.email, contact: this.state.contact }] });
            this.closeAddUserModal();
        }
        else {
            this.state.users[this.state.updateId].name = this.state.name;
            this.state.users[this.state.updateId].email = this.state.email;
            this.state.users[this.state.updateId].contact = this.state.contact;
            this.state.name = '';
            this.state.email = '';
            this.state.contact = '';
            this.state.isUpdate = false;
            this.state.updateId = null;
            this.setState(this.state);
            this.closeAddUserModal();
        }
    }

    //Event to delete user data

    handleDelete(e) {
        var id = e.target.dataset.id;
        this.state.users.splice(id, 1);
        this.setState(this.state);
    }

    //Event to edit user data

    handleEdit(e) {

        var id = parseInt(e.target.dataset.id);
        var user = this.state.users[id];

        this.state.name = user.name;
        this.state.email = user.email;
        this.state.contact = user.contact;
        this.state.isUpdate = true;
        this.state.updateId = id;
        this.setState(this.state);

        this.openAddUserModal();
    }

    //#endregion

    //#region Render

    render() {

        //#region Properties

        // Component state properties
        const { name, email, contact, users, IsUserAddModalOpen, isUpdate, updateId } = this.state;

        // CSS class properties
        const modalClass = { width: '500px' };

        //#endregion

        //#region Html

        return (
            <div className="App">
                <div className="row">
                    <div className="col-sm-12">
                        <input type="button" className="btn btn-primary pull-left" onClick={this.openAddUserModal} value="Add" />
                    </div>
                </div>
                <div className="row margin-top">
                    <div className="col-sm-12">
                        {users.length === 0 && <h2>Please add users !</h2>}
                        {users.length > 0 && <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th style={{ width: '65px' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="button" data-id={index} className="btn btn-warning" value="Edit" onClick={this.handleEdit} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.contact}</td>
                                        <td>
                                            <input type="button" data-id={index} className="btn btn-danger" value="Delete" onClick={this.handleDelete} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </div>
                </div>

                <Modal classNames={modalClass} open={IsUserAddModalOpen} center showCloseIcon={false} onClose={this.closeAddUserModal}>
                    {!isUpdate && <h2>Create User</h2>}
                    {isUpdate && <h2>Edit User</h2>}
                    <label>Name</label><br /><input className="form-control" name="name" type="text" value={name} onChange={this.handleChange} /><br />
                    <label>Email</label><br /><input className="form-control" name="email" type="text" value={email} onChange={this.handleChange} /><br />
                    <label>Contact</label><br /><input className="form-control" name="contact" type="text" value={contact} onChange={this.handleChange} /><br />
                    <input type="button" data-id={updateId} className="btn btn-success pull-right" onClick={this.handleSubmit} value="Submit" />
                </Modal>
            </div>
        );

        //#endregion
    }

    //#endregion
}

export default App;
