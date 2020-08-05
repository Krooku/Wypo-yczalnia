const mongoose = require('mongoose')

const CarSchema = mongoose.Schema({
  band: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'SUV'],
    default: 'A'
  },
  role: {
    type: String,
    enum: ['avaiable', 'rent', 'transport'],
    default: 'avaiable'
  },
  isRented: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true
})

const Car = mongoose.model('Car', CarSchema)

module.exports = Car
