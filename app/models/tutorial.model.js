const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Import the `Schema` object from mongoose
const { Schema } = mongoose;

// Define the tutorial schema
const tutorialSchema = new Schema(
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

// Apply the `mongoose-paginate-v2` plugin to the tutorial schema
tutorialSchema.plugin(mongoosePaginate);

// Create the Tutorial model using the tutorial schema
const Tutorial = mongoose.model("Tutorial", tutorialSchema);

// Export the Tutorial model
module.exports = Tutorial;
