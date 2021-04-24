
const express = require('express');
const app = express();
const PORT = 9000;
const path = require('path');
const session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    name: 'session',
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        //* angka pengkali, detik, menit , jam
        expires: Date.now() + 1000 * 60 * 60 * 1,
        maxAge: 1000 * 60 * 60 * 1
    }
}

app.use(session(sessionConfig))

//* route files

const auth = require('./router/auth..router');
app.use('/' , auth)

const home = require('./router/home.router');
app.use('/' , home)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

