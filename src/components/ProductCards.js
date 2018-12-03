import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';

export default class ProductCards extends Component {

    async voteUp(id) {
        try {
            let res = await axios.post('/api/vote-up', {
                id
            })
            console.log(res.data)
            this.props.updateVotes(res.data)
        }
        catch (error) {
            console.log('Voting is broken')
        }

    }

    // console.log(this.props.products)

    render() {
        var { id, product_name, company_name, product_img, votes } = this.props.products
        return (
            <div>
                <div className="card">
                    <div className="product-image">
                        <img src={product_img} alt='product' width="100%" />
                    </div>
                    { votes === 0 ? (
                            <div className="card-text">
                                <h2 className="product-name">{product_name}</h2>
                                <h3 className="company-name">{company_name}</h3>
                                <button
                                    className="vote-button"
                                    onClick={() => this.voteUp(id)}
                                >▲  Vote</button>
                            </div>
                        ) : (
                            <div className="card-text">
                                <h2 className="product-name">{product_name}</h2>
                                <h3 className="company-name">{company_name}</h3>
                                <button
                                    className="vote-button"
                                    onClick={() => this.voteUp(id)}
                                >▲  {votes}</button>
                            </div>
                        )}
                </div>
                </div>
                )
            }
        }
