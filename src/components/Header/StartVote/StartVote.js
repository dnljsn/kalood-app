import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { userAuth } from '../../../redux/reducer';
import { modalState } from '../../../redux/reducer';
import "../Header.css";
import UploadImage from './UploadImage';

// const emptyField = 'Please enter email and password.'

class StartVote extends Component {

    state = {
        productName: '',
        companyName: '',
        companyUrl: ''
    }

    componentDidMount() {
        this.firstInput.focus();
        if (this.props.productInfo) {
            this.setState({
                productName: this.props.productInfo.productName,
                companyName: this.props.productInfo.companyName,
                companyUrl: this.props.productInfo.companyUrl
            })
        }
    }

    updateProductName(e) {
        this.setState({ productName: e.target.value })
    }

    updateCompanyName(e) {
        this.setState({ companyName: e.target.value })
    }

    updateCompanyUrl(e) {
        this.setState({ companyUrl: e.target.value })
    }

    handleKeyPress(e) {
        if (e === 'Enter') {
            this.props.changeModal(
                <UploadImage
                    changeModal={this.props.changeModal}
                    productInfo={this.state}
                />
            )
        }
    }

    render() {
        return (
            <div>
                <h1 className='startvote-h1'>Start a Vote</h1>
                <h2 className='startVote-h2'>List a product you are interested in buying.</h2>
                <h3 className='startVote-h3'>This helps us gauge interest, gives us negotiating power with the manufacuturer, and you will be the first to know when the product is available for a discounted group purchase!</h3>
                <form className='login-form'>
                    <input
                        className="login-input"
                        onChange={(e) => this.updateProductName(e)}
                        type="text"
                        placeholder="Product Name"
                        value={this.state.productName}
                        ref={(input) => { this.firstInput = input; }}
                    />
                    <input
                        className="login-input"
                        onChange={(e) => this.updateCompanyName(e)}
                        type="text"
                        placeholder="Company Name"
                        value={this.state.companyName}
                    />
                    <input
                        className="login-input"
                        onChange={(e) => this.updateCompanyUrl(e)}
                        type="text"
                        placeholder="Company Website (Homepage)"
                        value={this.state.companyUrl}
                        onKeyPress={(e) => this.handleKeyPress(e.key)}
                    />
                    <button
                        className='login-button'
                        onClick={() => this.props.changeModal(
                            <UploadImage
                                changeModal={this.props.changeModal}
                                productInfo={this.state}
                            />
                        )}
                        type='button'>CONTINUE: UPLOAD IMAGE
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
    userAuth, modalState
}

export default connect(mapStateToProps, mapDispatchToProps)(StartVote);