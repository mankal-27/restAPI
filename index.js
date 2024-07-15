const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const uri = "add your mongoose connection"


//set up express app
const app = express();

//connect to mongodb

mongoose.connect(uri);
mongoose.Promise = global.Promise;

//Middleware 
app.use(express.static("public"));

app.use(bodyParser.json());


//initialize routes
app.use('/api',routes);

//Error handling Miidleware
app.use(function(err, req, res, next){
    //console.log(err);
    res.status(422).send({
        error: err.message
    })
})

//Listen For Request
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening to PORT : 3000`);
})