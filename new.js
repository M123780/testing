var http =require('http');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/animal')
    .then(()=>{
        console.log("connected");
    })
const animalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    colour: {type: String, required: true},
    age: {type: String, required: true},
    id:{type: String, required: true},
 });  
const Animal = mongoose.model('Animal', animalSchema);

app.get('/',function(req,res){
    res.send("WELCOME to the zoo!");
});
app.get('/animal',async function(req,res){
    try{
        const animals = await Animal.find();
        res.json(animals);
    }
    catch(error){
        console.error(error);
        res.status(500).send();
    }
});
app.post('/animal', async function(req,res){
    try{
        const animal = new Animal({ name : req.body.name, colour: req.body.colour, age: req.body.age, id: req.body.id});
        await animal.save();

        res.status(201).send();
    } catch(error){
        console.error(error);
    }
});

app.delete('/animal/:id', async function(req,res){
    try{
        const userId = req.params.id;
        const result  = await Animal.deleteOne({ id: userId });
        if (result.deletedCount > 0) {
            res.status(204).send("deleted");
            
        } else {
            res.status(404).send();
        }
        
    }

        catch (error) {
            console.error(error);
            res.status(500).send();
        }
});

app.put('/animal/:id', async function(req,res){
    try{
        const userId = req.params.id;
        const updatedanimalInfo = {
            name: req.body.name,
            colour: req.body.colour,
            age: req.body.age,
            id: req.body.id
        };
        const user  = await Animal.findOneAndUpdate({ id: userId },updatedanimalInfo, { new: true });
        
        if (user) {
            res.status(200).json(user); 
        } else {
            res.status(404).send("User not found");
        }
    }catch (error) {
        console.error(error);
        res.status(500).send();
    }
});
app.listen(3000,()=>{
    
    console.log('Server is running at http://localhost:3000/');
});
