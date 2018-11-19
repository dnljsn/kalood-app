import React, { Component } from 'react'
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';
import { modalState } from '../../redux/reducer';
import { loginUser } from '../../redux/reducer';
import { sessionCheck } from '../../redux/reducer'
import Logo from '../../assets/kalood-logo.svg';
import './Header.css';
import Login from './Login';
import Signup from './Signup';

Modal.setAppElement('#root')

class Header extends Component {

    constructor() {
        super();

        this.state = {
            modalComponent: '',
            user: "",
            session: ""
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        console.log(this.props.user)
        try {
            if (!this.props.user.email) {
                let res = await axios.get('/auth/check');
                this.props.loginUser(res.data)
                console.log(res.data)
            }
        } catch (error) {
            console.log(error, "No active session")
            this.props.loginUser({})
            console.log(this.props.user)
        }
        this.props.sessionCheck()
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
                    <Link to="/">
                        <img className='logo' src={Logo} alt="" />
                    </Link>
                    {this.props.user.email ? (
                        <button className='header-button' onClick={this.logout}>LOGOUT</button>
                    ) : (
                            <button className='header-button' onClick={() => this.openModal('Login')}>LOG IN</button>
                        )}
                    {this.props.user.email ? (
                        <Link to="/account">
                            <button className='header-button'>ACCOUNT</button>
                        </Link>
                    ) : (
                            <button className='header-button' onClick={() => this.openModal('Signup')}>SIGN UP</button>
                        )}
                    <Modal
                        isOpen={this.props.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                        className="modal"
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
        user: state.user,
        modalIsOpen: state.modalIsOpen
    }
}

let mapDispatchToProps = {
    modalState, logoutUser, loginUser, sessionCheck
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);