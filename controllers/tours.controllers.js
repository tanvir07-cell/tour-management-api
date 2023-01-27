const { request } = require("../app");
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
    // for pagination:
    // by default page = 1 and limit =2
    const { page = 1, limit = 2 } = req.query;
    const queries = {};
    if (req.query.page) {
      const skip = (req.query.page - 1) * Number(limit);
      queries.skip = skip;
      queries.limit = +limit;
    }
    console.log(queries);

    // for projection(mane e kon kon field er data dekhte chaitesi)
    if (req.query.fields) {
      const fieldsBy = req.query.fields.split(",").join(" ");
      queries.fieldsBy = fieldsBy;
      console.log(queries);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(queries);
    }

    const tours = await Tour.find({})
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fieldsBy)
      .sort(queries.sortBy);
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
    // return res.status(400).json({ Error: err.message });
    next(err);
  }
};

module.exports.updateTourById = async (req, res, next) => {
  try {
    const tour = await Tour.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    if (!tour) {
      return res.status(400).json({
        status: false,
        message: "can't update the tour",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Successfully updated the tour",
    });
  } catch (err) {
    // return res.status(400).json({ Error: err.message });

    // passing to the global error handler:
    next(err);
  }
};

module.exports.getTourByViews = async (req, res, next) => {
  try {
    // get top 3 max views tour:
    const tours = await Tour.find({}).sort({ views: -1 }).limit(3);

    if (!tours) {
      return res.status(400).json({
        status: false,
        message: "No tour found",
      });
    }
    return res.status(200).json({
      length: tours.length,
      status: true,
      message: "successfully retrieved",
      data: tours,
    });
  } catch (err) {
    return res.status(400).json({ Error: err.message });

    // passing to the global error handler:
    // next(err);
  }
};

module.exports.getTourByCheap = async (req, res, next) => {
  try {
    // get less price tour:
    const tours = await Tour.find({}).sort({ price: 1 }).limit(3);

    if (!tours) {
      return res.status(400).json({
        status: false,
        message: "No tour found",
      });
    }
    return res.status(200).json({
      length: tours.length,
      status: true,
      message: "successfully retrieved",
      data: tours,
    });
  } catch (err) {
    return res.status(400).json({ Error: err.message });

    // passing to the global error handler:
    // next(err);
  }
};
