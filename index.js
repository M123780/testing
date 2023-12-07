/*var http = require('http');
var fs = require('fs');
fs.open('saif.txt',function(){
    console.log("created")
});
fs.writeFile('saif.txt','hello',function(){
    console.log("write")
});
fs.unlink('saif.txt',function(){
    console.log("deleted")
});


var url = require('url');
var adr = 'http://localhost:8080/saif.txt?year=2017&month=february';
var q = url.parse(adr, true);
console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'
var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'


var http = require ('http');
var uc = require ('upper-case');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type' :'text/html'});
    res.write(uc.upperCase("saif this is me"));
}).listen(8080);


const triangle = require('./triangle.js');
var a=5,b=7,c=4,base=3,height=4;
const trianglearea = triangle.area(base,height);
const triangleparameter = triangle.parameter(a,b,c);
console.log(`The area of a triangle: ${trianglearea}`);
console.log(`Parameter of triangle : ${triangleparameter}`);


var calcu = require ('./calcu.js');
var a=5,b=9;
console.log(`Addition: ${calcu.add(a,b)}`);
console.log(`subtratct: ${calcu.sub(a,b)}`);
console.log(`MUL: ${calcu.mul(a,b)}`);
console.log(`Div: ${calcu.div(a,b)}`);
console.log(`Mod: ${calcu.mod(a,b)}`);


var table = require('./table.js');
var readline = require('readline');
var http = require('http');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Enter any number: ", (a) => {
    console.log(`Table of ${a}`);
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        for (let index = 1; index <= 10; index++) {
            res.write(`${a} * ${index} = ${table.mul(a, index)}\n`);
        }
        res.end();
        server.close();
    });
    server.listen(8080);
    rl.close();
});


var calcu = require('./calcu.js');
var readline = require('readline');
var http = require('http');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    rl.question('Enter any number:', (a) => {
        rl.question('Enter any number:', (b) => {
            rl.question('Enter your choice from 1 to 4. 1 for add. 2 for sub. 3 for mul. 4 for div.\n', (ch) => {
                
                switch (ch) {
                    case '1':
                        res.write(`Answer: ${calcu.add(Number(a), Number(b))}`);
                        break;
                    case '2':
                        res.write(`Answer: ${calcu.sub(Number(a), Number(b))}`);
                        break;
                    case '3':
                        res.write(`Answer: ${calcu.mul(Number(a), Number(b))}`);
                        break;
                    case '4':
                        res.write(`Answer: ${calcu.div(Number(a), Number(b))}`);
                        break;
                    default:
                        res.write(`failed`);
                }
                res.end();
                rl.close();
            });
        });
    });
}).listen(8080, () => {
    console.log('Server is running at http://localhost:8080/');
});*/
 


var http = require ('http');
var mongoose = require('mongoose');
var express = require('express');
var app= express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/new')
        .then(() => {
            console.log("MongoDB connected...")
        })
        .catch((err) => {
            console.log("MongoDB connection error", err)
            process.exit(1)
        })
const userSchema = new mongoose.Schema({
            book: {type: String, required: true},
            date: {type: String, required: true},
            id: {type: String, required: true},
         });  
const User = mongoose.model('User', userSchema);  

app.get('/books',async function(req,res){
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        console.error(error);
        res.status(500).send();
    }
});
app.post('/book/add', async function(req,res){
    try {
        const user = new User({ book: req.body.book, date: req.body.date, id: req.body.id});
        await user.save();
        
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});
app.delete('/delbook/:id', async function (req, res) {
    try {
        const userId = req.params.id; 
        const result = await User.deleteOne({ id: userId }); 
        if (result.deletedCount > 0) {
            res.status(204).send("deleted");
            
        } else {
            res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});
app.put('/updbook/:id', async function(req, res) {
    try {
        const userId = req.params.id;
        const updatedBookInfo = {
            book: req.body.book,
            date: req.body.date,
            id: req.body.id
        };

        const user = await User.findOneAndUpdate({ id: userId }, updatedBookInfo, { new: true });

        if (user) {
            res.status(200).json(user); 
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});


