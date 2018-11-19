import React, { Component } from 'react'
import ProfilePic from '../../assets/profile-pic.JPG';
import './Account.css';

export default class Settings extends Component {
    render() {
        return (
            <div>
                <img className='account-pic' src={ProfilePic} alt="" style={{ borderRadius: '50%', width: '200px' }} />
                <form className='account-profile-form'>
                    <input
                        className="account-profile-input"
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