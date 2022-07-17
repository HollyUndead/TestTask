import express from 'express';
import mongoose from 'mongoose';
import Post from "./post.js";

const PORT = 5000;

const DB_URL = 'mongodb+srv://user:user@cluster0.tmcnd.mongodb.net/?retryWrites=true&w=majority'

const app = express();

app.use(express.json())

app.post('/', async (req, res) => {
    try{
    const {author, title, content, name, picture} = req.body;
    const post = await Post.create({author, title, content, name, picture})
    res.json(post);
} catch(e){
    res.status(500).json(e)
}
})

// app.listen(PORT, () => console.log('workings'))

async function startApp()
{
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('workings'))
    } catch(e){
        console.log(e)
    }
}

startApp();