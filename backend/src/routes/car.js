const { Car } = require('../models')

module.exports.insert = async function addCar (req, res) {
  // const userId = req.session.user.id
  const { band, model, registrationNumber, type, role } = req.body
  console.log(band + ' ' + model + ' ' + registrationNumber + ' ' + type + ' ' + role)

  if (!band || !model || !registrationNumber || !type || !role) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }
  console.log(band + ' ' + model + ' ' + registrationNumber + ' ' + type + ' ' + role)
  const car = new Car({ band, model, registrationNumber, type, role })

  try {
    await car.save()
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: error
    })
  }

  res.status(200).json(car)
}

module.exports.list = async function listCars (req, res) {
  const cars = await Car.find().exec()

  res.status(200).json(cars)
}
