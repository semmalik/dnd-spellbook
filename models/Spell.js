const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  spellName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  spellName: {
    type: String,
    required: true,
  },
  spellName: {
    type: String,
    required: true,
  },
  spellName: {
    type: String,
    required: true,
  },
  
  
  
  
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
