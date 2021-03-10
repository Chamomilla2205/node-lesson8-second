const carService = require('../service/car.service');
const errorCodes = require('../constants/error.codes');
const errorMessage = require('../error/error.messages');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const users = await carService.findAllCars();

            res.json(users);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    getSingleCar: async (req, res) => {
        try {
            const { carId } = req.params;

            const user = await carService.findCarById(carId);
            res.json(user);
        } catch (err) {
            res.json(err.message);
        }
    },

    createNewCar: async (req, res) => {
        try {
            const { preferLanguage = 'en' } = req.query;

            await carService.createCar(req.body);

            res.status(errorCodes.CREATED).json(errorMessage.CAR_CREATED[preferLanguage]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    deleteOneCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const { preferLanguage = 'en' } = req.query;

            await carService.deleteCarById(carId);
            res.json(errorMessage.CAR_DELETED[preferLanguage]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    }
};
