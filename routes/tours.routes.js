const router = require("express").Router();

const toursController = require("../controllers/tours.controllers");

router.route("/").get(toursController.getTour).post(toursController.createTour);

router.route("/:id").get(toursController.getTourById);

module.exports = router;
