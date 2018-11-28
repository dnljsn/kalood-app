import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userAuth } from '../../redux/reducer';
import { modalState } from '../../redux/reducer';
import "./Header.css";

const emptyField = 'Please enter email and password.'

class Login extends Component {

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

    async login() {
        try {
            if (!this.state.email || !this.state.password) return alert(emptyField)
            let res = await axios.post('/auth/login', {
                email: this.state.email,
                password: this.state.password
            })
            this.props.userAuth(res.data)
            this.props.modalState(false)
            this.setState({
                email: '',
                password: ''
            })
        }
        catch (error) {
            alert(error.response.request.response)
        }
    }

    handleKeyPress(e) {
        if (e === 'Enter') {
            this.login()
        }
    }

    render() {
        return (
            <div>
                <h1 className='login-h1'>Welcome back!</h1>
                <h2 className='login-h2'>LOG IN</h2>
                <form className='login-form'>
                    <input
                        className="login-input"
                        onChange={(e) => this.updateEmail(e)}
                        type="text"
                        placeholder="Email"
                        ref={(input) => { this.firstInput = input; }}
                    />
                    <input
                        className="login-input"
                        onChange={(e) => this.updatePassword(e)}
                        type="text"
                        placeholder="Password"
                        onKeyPress={(e) => this.handleKeyPress(e.key)}
                    />
                    <button
                        className='login-button'
                        onClick={() => this.login()}
                        type='button'>LOG IN
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
    userAuth, modalState
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);