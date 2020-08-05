const { Errand } = require('../models')
const { Car } = require('../models')

module.exports.insert = async function insertErrand (req, res) {
  const userId = req.session.user.id
  const { carId } = req.params
  const { startDate, role } = req.body

  var date = new Date(startDate)

  console.log(date.getHours() + ':' + date.getMinutes())

  if (!userId || !carId || !startDate || !role) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }
  const errand = new Errand({ userId, carId, startDate: date })

  const car = await Car.findOneAndUpdate({
    _id: carId
  }, {
    isRented: true,
    role: role
  }, {
    new: false
  }).exec()

  if (!car) {
    res.status(400).json({
      message: 'Car does not exist or no permission'
    })
  }

  try {
    await errand.save()
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: error
    })
  }

  res.status(200).json(errand)
}

module.exports.list = async function listErrands (req, res) {
  const errands = await Errand.find().exec()

  res.status(200).json(errands)
}
