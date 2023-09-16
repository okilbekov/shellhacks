const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  deadline: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  importance: {
    type: Number,
    required: true,
    enum: [1, 2, 3] // 1 = low, 2 = medium, 3 = high
  },
  priorityScore: {
    type: Number,
    required: true
  },
  reorderedPriorityScore: {
    type: Number,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Task', taskSchema);
