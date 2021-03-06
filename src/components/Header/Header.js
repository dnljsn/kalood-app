import React, { Component } from 'react'
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { modalState } from '../../redux/reducer';
import { userAuth } from '../../redux/reducer';
import Logo from '../../assets/kalood-logo.svg';
import './Header.css';
import Login from './Login';
import Signup from './Signup';
import StartVote from './StartVote/StartVote';
// import UploadImage from './StartVote/UploadImage';

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
        this.changeModal = this.changeModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        try {
            if (!this.props.session) {
                let res = await axios.get('/auth/check');
                this.props.userAuth(res.data)
            }
        } catch (error) {
        }
    }

    openModal(component) {
        this.props.modalState(true)
        this.setState({
            modalComponent: component
        });
    }

    changeModal(component) {
        this.setState({
            modalComponent: component
        })
    }

    closeModal() {
        this.props.modalState(false)
        this.setState({
            modalComponent: ''
        })
    }

    async logout() {
        let res = await axios.get('/auth/logout')
        this.props.userAuth(res.data);
    }


    render() {
        let checkButton = this.state.modalComponent
        return (
            <div>
                <div className="header">
                    <Link to="/">
                        <img className='logo' src={Logo} alt="" />
                    </Link>
                    <button className='product-button' onClick={() => this.openModal(
                        <StartVote
                            changeModal={this.changeModal}
                        />
                    )}>START A VOTE</button>
                    {this.props.session ? (
                        <button className='header-button' onClick={this.logout}>LOGOUT</button>
                    ) : (
                            <button className='header-button' onClick={() => this.openModal(<Login />)}>LOG IN</button>
                        )}
                    {this.props.session ? (
                        <Link to="/account">
                            <button className='header-button'>ACCOUNT</button>
                        </Link>
                    ) : (
                            <button className='header-button' onClick={() => this.openModal(<Signup />)}>SIGN UP</button>
                        )}
                    <Modal
                        isOpen={this.props.modal}
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
        session: state.session,
        modal: state.modal
    }
}

let mapDispatchToProps = {
    userAuth, modalState
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);