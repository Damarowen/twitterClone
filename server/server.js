const express = require('express');
const app = express();
const PORT = 9000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')))

//* route files

const auth = require('./router/auth');
app.use('/' , auth)


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

