const mongoose = require('mongoose')

const spellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Spell', spellSchema)
