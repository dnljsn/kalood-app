import React, { Component } from 'react'
import './Account.css';

export default class Settings extends Component {
    render() {
        return (
            <div>
                <p>Current User's Email</p>
                <form className='account-form'>
                    <input
                        className="settings-input"
                        onChange={(e) => this.updateEmail(e)}
                        type="text"
                        placeholder="Email"
                        ref={(input) => { this.firstInput = input; }}
                    />
                    <div className='.button-holder'>
                        <button
                            className='button-style'
                            onClick={() => this.login()}
                            type='button'
                        >UPDATE EMAIL</button>
                        <button
                            className='button-style'
                            onClick={() => this.login()}
                            type='button'
                        >RESET PASSWORD</button>
                        <button
                            className='button-style-delete'
                            onClick={() => this.login()}
                            type='button'
                        >DELETE ACCOUNT</button>
                    </div>
                </form>
            </div>
        )
    }
}