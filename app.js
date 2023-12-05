const express = require('express');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/saif';
const app = express();
const port = 3000;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Define a mongoose schema for the data
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// Create a mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON requests
app.use(express.json());

// Route to create a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/login', async(req,res)=>{
    const {name , email} = req.body;
    try {
        const user = await User.findOne({name:req.body.name});
        if(user)
        {
            const result = req.body.email==user.email;
            if(result){
                res.render("login");
            }
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});