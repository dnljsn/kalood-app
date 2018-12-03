import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';

export default class ProductCards extends Component {

    async voteUp(id) {
        await axios.post('/api/vote-up', {
            id
        })


    }

    render() {
        var { id, product_name, company_name, product_img, votes } = this.props.products
        return (
            <div>
                <div className="card">
                    <div className="product-image">
                        <img src={product_img} alt='product' width="100%" />
                    </div>
                    <div className="card-text">
                        <h2>{product_name}</h2>
                        <button
                            onClick={() => this.voteUp(id)}
                        >▲  Vote</button>
                    </div>
                </div>
            </div>
        )
    }
}
