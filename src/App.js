import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
// import Account from './components/Account/Account';
import routes from './routes/routes';
import axios from 'axios';
import ProductCards from './components/ProductCards'
// import socket from 'socket.io-client';




// const io = socket.connect(process.env.SOCKET_CONNECTION)

class App extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    };
    //   io.on('message-to-users', message => {
    //     let messages = [...this.setState({})]
    //   })
    // }


    // handleClick() {
    //   io.emit('send-message', { message: this.state.message });
  }

  componentDidMount() {
    axios.get('/api/products').then(res => {
      this.setState({ products: res.data })
    })
  }

  render() {
    const productCards = this.state.products.map(element => {
      return (
        <ProductCards
          products={element}
        />
      )
    })
    return (
      <div className="App">
        <Header />
        {/* <Account /> */}
        {routes}
        <main>
          {productCards}
        </main>
      </div>
    );
  }
}

export default App;

