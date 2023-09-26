import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    title: {
        type: String,
        required: [true, 'Please enter a todo title']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description']
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Todo || mongoose.model('Todo', todoSchema)