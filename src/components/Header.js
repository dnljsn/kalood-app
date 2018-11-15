import React, { Component } from 'react'
import axios from 'axios';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { logoutUser } from './../redux/reducer';
import { modalState } from './../redux/reducer';
import Logo from '../assets/kalood-logo.svg';
import './Header.css';
import Login from './Login';
import Signup from './Signup';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

Modal.setAppElement('#root')

class Header extends Component {

    constructor() {
        super();

        this.state = {
            modalComponent: '',
            email: "",
            session: ""
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logout = this.logout.bind(this);
    }

    openModal(component) {
        this.props.modalState(true)
        this.setState({
            modalComponent: component
        });
    }

    closeModal() {
        this.props.modalState(false)
    }

    async logout() {
        let res = await axios.get('/auth/logout')
        this.props.logoutUser(res.data)
    }


    render() {
        let checkButton = this.state.modalComponent === 'Login' ? <Login /> : <Signup />
        return (
            <div>
                <div className="header">
                    <img className='logo' src={Logo} alt="" />
                    {this.props.email ? (
                        <button className='modalButton' onClick={this.logout}>Logout</button>
                    ) : (
                        <button className='modalButton' onClick={() => this.openModal('Login')}>Login</button>
                )}
                    {this.props.email ? (
                    <br></br>
                ) : (
                        <button className='modalButton' onClick={() => this.openModal('Signup')}>Signup</button>
                    )}
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    overlayClassName="overlay"
                >
                    {checkButton}
                </Modal>
            </div>
            <div className="secondary-header">
            </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        email: state.email,
        modalIsOpen: state.modalIsOpen
    }
}

let mapDispatchToProps = {
    modalState, logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);