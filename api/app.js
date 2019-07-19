const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRouter = require("./routers/todoRouter");

// create app 
const app = express();

// connect db
console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => console.log("db was connected")).catch((err) => console.log(err))

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.use('/api/todos', todoRouter)

// start server
app.listen(process.env.PORT, () => console.log('server is running on port ' + process.env.PORT))


