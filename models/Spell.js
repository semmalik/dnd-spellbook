const mongoose = require('mongoose')

const spellSchema = new mongoose.Schema({
  spellName: {
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
  userId: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Spell', spellSchema)
