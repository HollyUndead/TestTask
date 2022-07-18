import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    adress: {type: String},
    cart: {type: Array}
})

export default mongoose.model('Post', Post)