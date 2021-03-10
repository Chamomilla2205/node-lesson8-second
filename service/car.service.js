const Car = require('../dataBase/models/Cars');

module.exports = {
    findAllCars: () => Car.find(),

    findCarById: (carId) => Car.findById(carId),

    createCar: (carObject) => Car.create(carObject),

    deleteCarById: (carId) => Car.findByIdAndDelete(carId)
};
