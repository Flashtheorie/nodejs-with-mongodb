const express = require('express');
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('./config/dev');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;


app.set('view engine', 'ejs');
mongoose.connect(config.DB_URI, function(err, db){
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/', function(req, res) {
    //let listofusers = document.querySelector('.listofusers');

    db.collection("users").findOne({pseudo : 'Antoine'}, function(err, user){
        if (err) throw err;
        console.log(user.password)
        res.render('index', { root: __dirname, password: user.password });
    })
    
});


app.get('/users', function(req, res) {
    res.json({"success": true})
})
app.post('/createUsers', function(req, res) {
    
    let username = req.query.username;
    let password = req.query.password;
    let age = req.query.age;
    db.collection("users").insertOne({
        username: username,
        password: password,
        age: age
    }, function(err) {
        if (err) throw err;
        console.log("User created successfully : " + username);
        //db.close();
        res.redirect('/');
      });
})





























app.listen(PORT, function(){
     console.log("Node Js Server is Running on port " + PORT);
 })