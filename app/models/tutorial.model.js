const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    likes: Number,
    ratings: Number,
    description: String,
    published: Boolean,
  },
  { timestamps: true }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

module.exports = Tutorial;
