import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userAuth } from '../../redux/reducer';
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
        try {
            if (!this.state.email || !this.state.password) return alert(emptyField)
            let res = await axios.post('/auth/signup', {
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
            this.signup()
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
    modalState, userAuth
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);