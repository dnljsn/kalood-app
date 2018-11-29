import React, { Component } from 'react'
import './Account.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUserEmail } from '../../redux/reducer';


class Settings extends Component {

    state = {
        emailInput: ''
    }

    componentDidMount() {
        this.setState({
            emailInput: this.props.user.email
        })
    }

    async updateEmail() {
        try {
            let res = await axios.patch('/api/user-email', {
                newEmail: this.state.emailInput
            })
            this.props.updateUserEmail(res.data)
        }
        catch (error) {
            // alert(err.response.request.response)
        }
    }

    deleteUser(id) {
        let promise = axios.delete(`/api/user/${id}`)
        promise.then(res => {
            this.props.userAuth(res.data)
        })
    }

    updateEmailInput(e) {
        this.setState({ emailInput: e.target.value })
    }

    handleKeyPress(e) {
        if (e === 'Enter') {
            this.updateEmail()
        }
    }

    render() {
        return (
            <div>
                <form className='account-form'>
                    <input
                        className="settings-input"
                        onChange={(e) => this.updateEmailInput(e)}
                        type="text"
                        placeholder="Email"
                        onKeyPress={(e) => this.handleKeyPress(e.key)}
                        value={this.state.emailInput || ""}
                    />
                    <div className='.button-holder'>
                        <button
                            className='button-style'
                            onClick={() => this.updateEmail()}
                            type='button'
                        >UPDATE EMAIL</button>
                        <button
                            className='button-style'
                            // onClick={() => this.login()}
                            type='button'
                        >RESET PASSWORD</button>
                        <button
                            className='button-style-delete'
                            onClick={() => this.deleteUser(this.props.user.id)}
                            type='button'
                        >DELETE ACCOUNT</button>
                    </div>
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
    updateUserEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);