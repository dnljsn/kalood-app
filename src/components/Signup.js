import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../redux/reducer';
import { modalState } from '../redux/reducer';
// import './Auth.css';

const emptyField = 'Please enter email and password.'

class Signup extends Component {

    state = {
        email: '',
        password: ''
    }

    componentDidMount(){
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
            email: this.state.email,
            password: this.state.password
        }).catch(err =>{alert(err.response.request.response)})
        if (res.data.email) {
            this.props.loginUser(res.data.email)
            this.props.modalState(false)
        }
    }

    // handleKeyPress(e) {
    //     if (e === 'Enter') {
    //         this.props.buttonClick(this.state.userInput)
    //         this.setState({
    //             userInput: ""
    //         })
    //     }
    // }

    render() {
        return (
            <div className='login-container'>
                <div className='form-container'>
                    <h1>Signup</h1>
                    <form className='login_input_box'>
                    <div>
                        <label className='label-font' htmlFor="">Email:</label>
                            <input
                                onChange={(e) => this.updateEmail(e)}
                                type="text"
                                ref={(input) => { this.firstInput = input; }} 
                            />
                    </div>
                    <div>
                        <label className='label-font' htmlFor="">Password: </label>
                            <input
                                onChange={(e) => this.updatePassword(e)}
                                type="text"
                                // onKeyPress={(e) => this.handleKeyPress(e.key)}
                            />
                    </div>
                    <button onClick={() => this.signup()} type='button'>Signup</button>
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
    modalState, loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);