var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bcrypt = require('bcrypt');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected");
    });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/user', async function (req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);
        const user = new User({ username: req.body.username, email: req.body.email, pass: hashedPassword });
        await user.save();
        res.status(201).send();
    } catch (error) {
        console.log(error);
    }
});

app.get('/user', async function (req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

app.post('/login', async function (req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user === null) {
            return res.status(400).send('Cannot find user');
        }

        if (await bcrypt.compare(req.body.pass, user.pass)) {
            res.status(200).send("login");
        } else {
            res.status(401).send("failed");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});
