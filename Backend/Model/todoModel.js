const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedAt:{
        type: Date,
    },
    completedAt:{
        type: Date,
    },
    deleted: {
        type: Boolean,
        default: false
      },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;