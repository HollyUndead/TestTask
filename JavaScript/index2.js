import express from "express";
import mongoose from "mongoose";
import Post from "./post.js";
import cors from 'cors';

const PORT = 5000;

const DB_URL = 'mongodb+srv://user:user@cluster0.tmcnd.mongodb.net/?retryWrites=true&w=majority';

const app = express();

app.use(cors(
    {
        origin: '*'
    }
))

app.use(express.json());

app.use('/', async (req, res) => 
{
    try
    {
        const {name, email, phone, adress, cart} = req.body;
        const post = await Post.create({name, email, phone, adress, cart});
        console.log(post)
        res.json(post);
    }
    catch(e)
    {
        res.status(500).json(e);
    }
})

async function startApp()
{
    try
    {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('App working on port:' + PORT));
    }
    catch(e)
    {
        console.log(e);
    }
}

startApp();