import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAuth } from '../../../redux/reducer';
import { modalState } from '../../../redux/reducer';
import "../Header.css";
import axios from 'axios';
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import { PulseLoader } from 'react-spinners'
import imgPlaceholder from '../../../assets/img-placeholder.png';
import StartVote from './StartVote';


// const emptyField = 'Please enter email and password.'

class UploadImage extends Component {
    constructor() {
        super()
        this.state = {
            isUploading: false,
            images: [],
            url: 'http://via.placeholder.com/450x450',
            value: '',
            productName: '',
            companyName: '',
            companyUrl: ''
        }
    }

    componentDidMount() {
        this.setState({
            productName: this.props.productInfo.productName,
            companyName: this.props.productInfo.companyName,
            companyUrl: this.props.productInfo.companyUrl
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
                // axios.patch('/api/user-img', { url })
                //     .then((response) => {
                //         this.props.updateUserImg(response.data)
                //     })
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

    async submit() {
        try {
            // console.log(this.state.props.user.userID)
            // if (!this.state.email || !this.state.password) return alert(emptyField)
            await axios.post('/api/add-product', {
                productName: this.state.productName,
                companyName: this.state.companyName,
                companyUrl: this.state.companyUrl,
                productImg: this.state.url,
                user: this.props.user.userID
            })
            this.props.modalState(false)
        }
        catch (error) {
            // alert(error.response.request.response)
            console.log("This is broken")
        }
    }

    updateEmail(e) {
        this.setState({ email: e.target.value })
    }

    updatePassword(e) {
        this.setState({ password: e.target.value })
    }

    handleKeyPress(e) {
        if (e === 'Enter') {
            this.login()
        }
    }

    render() {
        return (

            <div>
                <h1 className='startvote-h1'>Upload Image</h1>
                {/* <h2 className='startVote-h2'>List a product you are interested in buying.</h2>
                <h3 className='startVote-h3'>This helps us gauge interest, gives us negotiating power with the manufacuturer, and you will be the first to know when the product is available for a discounted group purchase!</h3> */}
                <div className='profile-h'>
                    <Dropzone
                        onDropAccepted={this.getSignedRequest}
                        className='dropzone-h'
                        style={{
                            backgroundImage: `url(${this.state.url || imgPlaceholder})`,
                        }}
                        accept='image/*'
                        multiple={false} >

                        {this.state.isUploading
                            ? <PulseLoader />
                            : <div className="dropzone-overlay-h" >Drag or click to upload</div>
                        }
                    </Dropzone>
                    <form>
                        {/* <input
                        className="login-input"
                        onChange={(e) => this.updateEmail(e)}
                        type="text"
                        placeholder="Product Name"
                        ref={(input) => { this.firstInput = input; }}
                    />
                    <input
                        className="login-input"
                        onChange={(e) => this.updatePassword(e)}
                        type="text"
                        placeholder="Company Name"
                        onKeyPress={(e) => this.handleKeyPress(e.key)}
                    />
                    <input
                        className="login-input"
                        onChange={(e) => this.updatePassword(e)}
                        type="text"
                        placeholder="Company Website (Homepage)"
                        onKeyPress={(e) => this.handleKeyPress(e.key)}
                    /> */}
                        <button
                            className='submit-button-back'
                            onClick={() => {
                                var stateMem = {
                                    productName: this.props.productInfo.productName,
                                    companyName: this.props.productInfo.companyName,
                                    companyUrl: this.props.productInfo.companyUrl
                                }
                                this.props.changeModal(
                                <StartVote
                                    changeModal={this.props.changeModal}
                                    productInfo={stateMem}
                            />
                            )}}
                            type='button'>BACK
                </button>
                        <button
                            className='submit-button'
                            onClick={() => this.submit()}
                            type='button'>SUBMIT
                </button>
                    </form>
                </div>
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
    userAuth, modalState
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);