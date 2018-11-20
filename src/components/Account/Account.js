import React, { Component } from 'react'
import Profile from './Profile';
import Settings from './Settings';
import './Account.css';

export default class Account extends Component {

    state = {
        settingsView: false
    }

    profile() {
        this.setState({
            settingsView: false
        })
    }

    settings() {
        this.setState({
            settingsView: true
        })
    }

    render() {
        return (
            <div>
                <nav>
                    <ul className='account-ul'>
                        <li className='account-li' >
                            <div className='account-div'>
                                {this.state.settingsView ? (
                                    <button
                                        className='account-button'
                                        onClick={() => this.profile()}
                                    >PROFILE</button>
                                ) : (
                                        <button
                                            className='account-button-active'
                                            onClick={() => this.profile()}
                                        >PROFILE</button>
                                    )
                                }
                            </div>
                        </li>
                        <li className='account-li'>
                            <div className='account-div'>
                                {this.state.settingsView ? (
                                    <button
                                        className='account-button-active'
                                        onClick={() => this.settings()}
                                    >SETTINGS</button>
                                ) : (
                                        <button
                                            className='account-button'
                                            onClick={() => this.settings()}
                                        >SETTINGS</button>
                                    )
                                }
                            </div>
                        </li>
                    </ul>
                </nav>
                    {this.state.settingsView ? <Settings /> : <Profile />}
            </div>
                )
            }
}