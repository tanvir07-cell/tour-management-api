const router = require("express").Router();

const toursController = require("../controllers/tours.controllers");

router.get("/trending", toursController.getTourByViews);
router.get("/cheapest", toursController.getTourByCheap);

router.route("/").get(toursController.getTour).post(toursController.createTour);

router
  .route("/:id")
  .get(toursController.getTourById)
  .patch(toursController.updateTourById);

module.exports = router;
