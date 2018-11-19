import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
// import Account from './components/Account/Account';
import routes from './routes/routes';
// import socket from 'socket.io-client';


// const io = socket.connect("http://localhost:4000")

// constructor() {
//   super()
//   io.on('message-to-users', message => {
//     let messages = [...this.setState({})]
//   })
// }


// handleClick() {
//   io.emit('send-message', { message: this.state.message });
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* <Account /> */}
        {routes}
      </div>
    );
  }
}

export default App;

