import React, { Component } from 'react'
import ProfilePic from '../../assets/profile-pic.JPG';
import './Account.css';

export default class Profile extends Component {
    render() {
        return (
            <div>
                <img className='profile-pic' src={ProfilePic} alt="" style={{ borderRadius: '50%', width: '200px' }} />
                    <form className='account-form'>
                        <input
                            className="profile-input"
                            onChange={(e) => this.updateEmail(e)}
                            type="text"
                            placeholder="First Name"
                            ref={(input) => { this.firstInput = input; }}
                        />
                        <input
                            className="profile-input"
                            onChange={(e) => this.updatePassword(e)}
                            type="text"
                            placeholder="Last Name"
                            onKeyPress={(e) => this.handleKeyPress(e.key)}
                        />
                        <div className='button-holder'>
                            <button
                                className='button-style'
                                onClick={() => this.login()}
                                type='button'
                            >UPDATE</button>
                        </div>
                    </form>
            </div>
        )
    }
}