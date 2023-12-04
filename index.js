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
console.log(`Mod: ${calcu.mod(a,b)}`);*/
var table = require('./table.js');
var readline = require('readline');
var http = require('http');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter any number: ", (a) => {
    console.log(`Table of ${a}`);

    // Create an HTTP server outside the loop
    const server = http.createServer((req, res) => {
        // This will be called for each incoming request
        res.writeHead(200, { 'Content-Type': 'text/plain' });
      
        for (let index = 1; index <= 10; index++) {
            res.write(`${a} * ${index} = ${table.mul(a, index)}\n`);
        }
        // Close the server after sending the response
        res.end();
        server.close();
    });

    // Listen on port 8080
    server.listen(8080);

  

    // Close the readline interface when done
    rl.close();
});

