/*var bcrypt = require('bcrypt');
const saltround = 10;
var pass = "saudbf";
bcrypt.genSalt(saltround,function(err,salt){
    bcrypt.hash(pass,salt,function(err,pass){
        console.log(`${pass}`);
    })
})*/
const express = require('express');
const mongoose = require('mongoose'); 
const app = express(); 
app.use(express.json());
mongoose.connect( 
    'mongodb://localhost:27017/saifs', { 
       
  
}) 
const userSchema = {
    email: String,
    password: String,
    age: Number,
};
