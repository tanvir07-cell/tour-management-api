const Tour = require("../model/Tour");

module.exports.createTour = async (req, res, next) => {
  try {
    const tour = await new Tour(req.body);
    console.log(req.body);
    const result = await tour.save();

    if (!result) {
      return res.status(400).json({
        status: false,
        message: "don't create a tour",
      });
    }
    return res.status(201).json({
      status: true,
      data: tour,
      message: "Successfully created a tour",
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      error: err.message,
    });
  }
};

module.exports.getTour = async (req, res, next) => {
  try {
    const tours = await Tour.find({});
    if (tours.length === 0) {
      return res.status(400).json({
        status: false,
        message: "There is no tour left",
      });
    }
    return res.status(200).json({
      status: true,
      data: tours,
      tours: tours.length,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      error: err.message,
    });
  }
};
