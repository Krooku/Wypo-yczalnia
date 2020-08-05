const mongoose = require('mongoose')

const ErrandSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  days: {
    type: String,
    default: 'Czas naprawy'
  },
  maxDays: {
    type: String,
    default: 'Nie określono'
  }
}, {
  versionKey: false,
  timestamps: true
})

const Errand = mongoose.model('Errand', ErrandSchema)

module.exports = Errand
