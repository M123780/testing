const express = require('express');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/saif';
const app = express();
const port = 3000;

mongoose.connect(url, {  })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.get('/s', (req, res) => {
    console.log('Hello');
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
