import React, { Component } from 'react'
import './Account.css';
import Profile from './Profile';
import Settings from './Settings';

export default class Account extends Component {

    constructor() {
        super();

        this.state = {
            toggleView: true
        }
        this.profile = this.profile.bind(this);
        this.settings = this.settings.bind(this);
    }

    profile() {
        this.setState({
            toggleView: true
        })
    }

    settings() {
        this.setState({
            toggleView: false
        })
    }

    render() {
        return (
            <div>
                <nav>
                    <ul className='account-nav' >
                        <li>
                            <button
                                className='account-button-1'
                                onClick={() =>  this.profile() }
                            >PROFILE</button>
                        </li>
                        <li>
                            <button
                                className='account-button-2'
                                onClick={() => this.settings() }
                            >SETTINGS</button>
                        </li>
                    </ul>
                </nav>
                {this.toggleView ? <Profile /> : <Settings />}
            </div>
        )
    }
}