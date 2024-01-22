const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js')
const Post = require('./models/Post')
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // helps create cookies tokens
const cookieParser = require('cookie-parser'); // helps read cookies to verify cookies for user authentication
const multer = require('multer'); // helps upload files

const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs'); // helps rename files

const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.genSaltSync(12);

// Example
const allowedOrigins = process.env.NODE_ENV === 'development' ? '*' : 'http://localhost:3000';
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());
app.use(cookieParser()) // cookie parser
app.use('/uploads', express.static(__dirname + '/uploads')); // helps upload files

// mongoose database connection string
mongoose.connect('mongodb+srv://kanayoanyakpor:kaykaysean12@cluster0.g4cb9ri.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req,res) =>{
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({username, password: bcrypt.hashSync(password, salt)});
        res.json(userDoc);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Find the user by username
        const userDoc = await User.findOne({ username });

        // if the user is not found, return an error
        if (!userDoc) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check if the password is correct
        const passOk = bcrypt.compareSync(password, userDoc.password);

        // if the password is not ok, return an error
        if (!passOk) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // User is logged in successfully
        // Use jwt to generate a token
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
                
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Not Authenticated' });
    }
    // verifies cookies token for user authentication using JWT
    jwt.verify(token, secret, {}, async (err, payload) => {
        if (err) {
            return res.status(401).json({ message: 'Not Authenticated' });
        }
        const { username, id } = payload;
        const userDoc = await User.findById(id);
        res.json({ username, id });
    });
});
    
app.post('/logout', (req, res) => {
    res.clearCookie('token').json('ok');
});


app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    let postDoc; // Declare postDoc outside the try block
  
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
  
      fs.renameSync(path, newPath);
  
      const token = req.cookies.token;
  
      if (!token) {
        return res.status(401).json({ message: 'Not Authenticated' });
      }
  
      // verifies cookies token for user authentication using JWT
      jwt.verify(token, secret, {}, async (err, payload) => {
        if (err) {
          return res.status(401).json({ message: 'Not Authenticated' });
        }
  
        const { title, summary, content } = req.body;
  
        postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: payload.id,
          });
          
      });

      res.json(postDoc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });
  

app.get('/post', async (req, res) => {

  try {
    const postDocs = await Post.find().populate('author', ['username']).sort({createdAt: -1}).limit(20);
    res.json(postDocs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const PostDoc = await Post.findById(id).populate('author', ['username'])
  res.json(PostDoc);
}
);


app.listen(5000);

