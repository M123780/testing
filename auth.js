var express = require('express');
var mongoose= require('mongoose');
var app= express();
var bcrypt= require('bcrypt');
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/auth')
.then(()=>{
    console.log("connected");
});
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true},
    pass: { type: String, required: true},     
});
const User = mongoose.model('User',userSchema);

app.post('/user',async function(req,res){
    try{
        const user = new User({ username : req.body.username,email: req.body.email, pass: req.body.pass});
        await user.save();
        res.status(201).send();
    }catch(error){
        console.log(error);
    }
});
app.get('/user', async function(req,res){
    try{
        const users =await User.find();
        res.json(users);
    }catch(error){
        console.log(error);
    }
});
app.post('/login', async function (req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user === null) {
            return res.status(400).send('Cannot find user');
        }

        if (req.body.email === user.email) {
            
            if(req.body.pass === user.pass){
                res.status(200).send("login Successfully");   
            }
            else{
                res.status(401).send("failed");
            }
        }else{
            res.status(401).send("failed");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});
app.put('/updpass',async function(req,res){
    try{
        const user = await User.findOne({ username: req.body.username });
        const updateduserInfo = {
            username : req.body.username,
            email: req.body.email,
            pass: req.body.pass
        }

        if (user === null) {
            return res.status(400).send('Cannot find user');
        }

        if (req.body.email === user.email) {
            
            if(req.body.pass === user.pass){
                const upduser = await User.findOneAndUpdate(updateduserInfo);
                res.status(200).send("updtaed Successfully");
            }
            else{
                res.status(401).send("failed");
            }
        }else{
            res.status(401).send("failed");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});
app.delete('/del/:username', async function(req,res){
    try{
        const user = await User.findOne({username:req.body.username});
        
        if(req.body.username === user.username){
            const result = await User.deleteOne(user);
            console.log(result);
            if(result.deletedCount > 0){
                res.status(204).send("deleted");
                res.json(user);
            }
            else{
                res.status(404).send();
            }
        }
        else{
            res.status(401).send("failed");
        }
    }catch{

    }
});
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});
