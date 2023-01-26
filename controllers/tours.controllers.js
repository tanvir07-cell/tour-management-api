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
    // return res.status(400).json({
    //   status: false,
    //   error: err.message,
    // });
    next(err);
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
    // return res.status(400).json({
    //   status: false,
    //   error: err.message,
    // });
    next(err);
  }
};

module.exports.getTourById = async (req, res, next) => {
  try {
    let tourViews = 0;
    const tour = await Tour.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } }
    );
    console.log(tour);

    if (!tour) {
      return res.status(400).json({
        status: false,
        message: "There is no tour left",
      });
    }
    return res.status(200).json({
      status: true,
      data: tour,
    });
  } catch (err) {
    return res.status(400).json({ Error: err.message });
  }
};
