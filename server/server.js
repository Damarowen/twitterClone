const express = require('express');
const app = express();
const PORT = 9000;

app.use(express.json());
app.set("view engine", "ejs")

//* route files

const home = require('./router/home');
app.use('/' , home)


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))


