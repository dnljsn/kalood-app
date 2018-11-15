require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller');


const app = express();

const {
    SERVER_PORT, MASSIVE_CONNECTION, SECRET
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
}))

app.post('/auth/signup', controller.signup)
app.post('/auth/login', controller.login)
app.get('/auth/logout', controller.logout)

app.listen(SERVER_PORT, () =>
console.log(`Ahoy, port ${SERVER_PORT}!`))