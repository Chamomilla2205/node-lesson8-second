const router = require('express').Router();
const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carController.getAllCars);
router.post('/', carMiddleware.areCarValid, carController.createNewCar);

router.get('/:carId', carMiddleware.checkValidId, carController.getSingleCar);
router.delete('/:carId', carMiddleware.checkValidId, carController.deleteOneCar);

module.exports = router;
