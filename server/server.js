const path = require('path'); // Usually moved to the start of file
require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller');
// const socket = require('socket.io');

const app = express();

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const {
    SERVER_PORT,
    MASSIVE_CONNECTION,
    SECRET
} = process.env;

massive(MASSIVE_CONNECTION).then(db => {
    app.set('db', db);
    console.log('db has docked');
})

app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
    // cookie: {
    //     maxAge: 1814400000
    // }
}))

app.post('/auth/signup', controller.signup)
app.post('/auth/login', controller.login)
app.get('/auth/logout', controller.logout)
app.get('/auth/check', controller.sessionCheck)
app.get('/api/sign-s3', controller.signURL)
app.patch('/api/user-img', controller.updateUserImg)
app.put('/api/user-info', controller.updateUserInfo)
app.patch('/api/user-email', controller.updateUserEmail)
app.delete('/api/user/:id', controller.deleteUser)

app.listen(SERVER_PORT, () =>
    console.log(`Ahoy, port ${SERVER_PORT}!`))

// const io = socket(app.listen(SERVER_PORT, () =>
//     console.log(`Ahoy, port ${SERVER_PORT}!`))
// )

// io.on('connection', socket => {
//     console.log("A user has connected with my socket")

//     socket.io('semi-message', message => {
//         console.log(message);
//         io.emit('message-to-users', {message: message.message})
//     })
// })

