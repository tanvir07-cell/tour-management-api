const router = require("express").Router();

const toursController = require("../controllers/tours.controllers");

router.route("/").get(toursController.getTour).post(toursController.createTour);

module.exports = router;
