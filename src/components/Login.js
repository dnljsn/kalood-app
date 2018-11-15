import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../redux/reducer';
import { modalState } from '../redux/reducer';
import "./Login.css";

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
        if (!this.state.email || !this.state.password) return alert(emptyField)
        let res = await axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).catch(err => { alert(err.response.request.response) })
        if (res.data.email) {
            this.props.loginUser(res.data.email)
            this.props.modalState(false)
            this.setState({
                userInput: ""
            })
        }
    }

    handleKeyPress(e) {
        if (e === 'Enter') {
            this.props.buttonClick(this.state.userInput)
            this.setState({
                userInput: ""
            })
        }
    }

    render() {
        return (
            <div className='login-container'>
                <div className='form-container'>
                    <h1>Login</h1>
                    <form className='login_input_box'>
                        <div>
                            <input
                                className="email-input"
                                onChange={(e) => this.updateEmail(e)}
                                type="text"
                                placeholder="Email"
                                ref={(input) => { this.firstInput = input; }}
                            />
                        </div>
                        <div>
                            <input
                                className="password-input"
                                onChange={(e) => this.updatePassword(e)}
                                type="text"
                                placeholder="Password"
                            // onKeyPress={(e) => this.handleKeyPress(e.key)}
                            />
                        </div>
                        <button onClick={() => this.login()} type='button'>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        email: state.email
    }
}

let mapDispatchToProps = {
    loginUser, modalState
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);