import React, { Component } from 'react'
import ProfilePic from '../../assets/profile-pic.JPG';
import './Account.css';
import axios from 'axios';
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import { PulseLoader } from 'react-spinners'
import { connect } from 'react-redux';
import { updateUserImg } from '../../redux/reducer';
import { updateUserInfo } from '../../redux/reducer';


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            isUploading: false,
            images: [],
            url: 'http://via.placeholder.com/450x450',
            value: '',
            firstName: '',
            lastName: ''
        }
        this.updateFirstName = this.updateFirstName.bind(this);
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName
        })
    }

    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true })
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
        axios.get('/api/sign-s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type,
            }
        }).then((response) => {
            const { signedRequest, url } = response.data
            this.uploadFile(file, signedRequest, url)
        }).catch(err => {
            console.log(err)
        })
    }

    uploadFile = (file, signedRequest, url) => {

        var options = {
            headers: {
                'Content-Type': file.type
            }
        };

        axios.put(signedRequest, file, options)
            .then(response => {
                this.setState({ isUploading: false, url: url })
                axios.patch('/api/user-img', { url })
                    .then((response) => {
                        this.props.updateUserImg(response.data)
                    })
            })
            .catch(err => {
                this.setState({
                    isUploading: false
                })
                if (err.response.status === 403) {
                    alert('Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n' + err.stack)
                } else {
                    alert(`ERROR: ${err.status}\n ${err.stack}`)
                }
            })
    }

    async updateInfo() {
        let res = await axios.put('/api/user-info', {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        })
            .catch(err => { alert(err.response.request.response) })
        this.props.updateUserInfo(res.data)
    }

    updateFirstName(e) {
        this.setState({ firstName: e.target.value })

    }

    updateLastName(e) {
        this.setState({ lastName: e.target.value })
    }

    handleKeyPress(e) {
        if (e === 'Enter') {
            this.updateInfo()
        }
    }

    render() {
        return (
            <div className='profile'>
                <Dropzone
                    onDropAccepted={this.getSignedRequest}
                    className='dropzone'
                    style={{
                        backgroundImage: `url(${this.props.user.userImg || ProfilePic})`,
                    }}
                    accept='image/*'
                    multiple={false} >

                    {this.state.isUploading
                        ? <PulseLoader />
                        : <div className="dropzone-overlay" >Drag or click to upload</div>
                    }
                </Dropzone>
                <form className='account-form'>
                    <input
                        className="profile-input"
                        onChange={(e) => this.updateFirstName(e)}
                        type="text"
                        placeholder="First Name"
                        onKeyPress={(e) => this.handleKeyPress(e.key)}
                        value={this.state.firstName || ""}
                    />
                    <input
                        className="profile-input"
                        onChange={(e) => this.updateLastName(e)}
                        type="text"
                        placeholder="Last Name"
                        onKeyPress={(e) => this.handleKeyPress(e.key)}
                        value={this.state.lastName || ""}
                    />
                    <div className='button-holder'>
                        <button
                            className='button-style'
                            onClick={() => this.updateInfo()}
                            type='button'
                        >UPDATE</button>
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
    updateUserImg, updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);