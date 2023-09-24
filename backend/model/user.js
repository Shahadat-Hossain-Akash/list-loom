import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, ' Please enter a name!']
    },
    email: {
        type: String,
        required: [true, ' Please enter an email!']
    },
    password: {
        type: String,
        required: [true, ' Please enter password!']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.User || mongoose.model('User', userSchema)