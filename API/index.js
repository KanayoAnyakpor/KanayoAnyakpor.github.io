const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('/models/User')
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

mongoose.connect('mongodb+srv://kanayoanyakpor:kaykaysean12@cluster0.g4cb9ri.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req,res) =>{
    const {username, password} = req.body;
    const userDoc = await User.create({username, password});
    res.json(userDoc);
});

app.listen(5000);

// Connection String: mongodb+srv://kanayoanyakpor:kaykaysean12@cluster0.g4cb9ri.mongodb.net/?retryWrites=true&w=majority