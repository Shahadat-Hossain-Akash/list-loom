import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    todo: {
        type: String,
        required: [true, 'Please enter a todo']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Todo || mongoose.model('Todo', todoSchema)