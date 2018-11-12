require('dotenv').config();
const express = require('express');
const massive = require('massive');

const app = express();

const {
    SERVER_PORT, MASSIVE_CONNECTION
} = process.env;

massive(MASSIVE_CONNECTION).then(db => {
    app.set('db', db);
    console.log('db is connected'); 
})



app.use(express.json());

app.listen(SERVER_PORT, () =>
console.log(`Ahoy! Port: ${SERVER_PORT}`))