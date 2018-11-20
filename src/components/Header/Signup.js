import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducer';
import { modalState } from '../../redux/reducer';
import './Header.css';

const emptyField = 'Please enter email and password.'

class Signup extends Component {

    state = {
        email: '',
        password: ''
    }

    componentDidMount() {
        this.firstInput.focus();
    }

    updateEmail(e) {
        this.setState({ email: e.target.value })
    }

    updatePassword(e) {
        this.setState({ password: e.target.value })
    }

    async signup() {
        if (!this.state.email || !this.state.password) return alert(emptyField)
        let res = await axios.post('/auth/signup', {
            user: this.state.user,
            password: this.state.password
        }).catch(err => { alert(err.response.request.response) })
        if (res.data.email) {
            this.props.loginUser(res.data)
            this.props.modalState(false)
            this.setState({
                userInput: ""
            })
        }
    }

    handleKeyPress(e) {
        if (e === 'Enter') {
            this.signup()
            this.setState({
                user: '',
                password: ''
            })
        }
    }

    render() {
        return (
            <div>
                <h1 className='signup-h1'>Welcome to Kalood!</h1>
                <h2 className='signup-h2'>SIGN UP</h2>
                <form className='signup-form'>
                    <input
                        className='signup-input'
                        onChange={(e) => this.updateEmail(e)}
                        type="text"
                        placeholder="Email"
                        ref={(input) => { this.firstInput = input; }}
                    />
                    <input
                        className="signup-input"
                        onChange={(e) => this.updatePassword(e)}
                        type="text"
                        placeholder="Password"
                        onKeyPress={(e) => this.handleKeyPress(e.key)}
                    />
                    <button
                        className='signup-button'
                        onClick={() => this.signup()}
                        type='button'>SIGN UP
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

let mapDispatchToProps = {
    modalState, loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);