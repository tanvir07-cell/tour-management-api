const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required!"],
      unique: [true, "name must be unique"],
      trim: true,
    },
    place: {
      type: String,
      required: [true, "tour place name is required!"],
      unique: [true, "tour place name must be unique"],
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

// creating model from schema:

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
