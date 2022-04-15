const mongoose = require("mongoose");
const { Schema } = mongoose;

const TensorModelSchema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator(v) {
          return /^.{1,50}$/.test(v);
        },
        msg: "Name is not valid (min. 1 max. 50 characters)",
      },
      required: [true, "Name is required"],
    },
    postDate: {
      type: Date,
      default: Date.now(),
    },
    lastUpdatedDate: {
      type: Date,
    },
    description: {
      type: String
    },
    category: {
        // Choice: Classification, regression, Other
        type: Number,
        required: [true, "Category is required!"]
    },
    modelType: {
        // Choices: Deep Neural Network, Convolutional Neural Network, Recurrent Neural Network, Modular Neural Network
      type: Number,
      required: [true, "ModelType is required!"],
    },
    configuration: [{ 
      // TODO: add regex for configuration = '^\\[("([a-zA-Z0-9,-_|#/ ]{1,1000})"(,"[a-zA-Z0-9,-_|#/ ]{1,1000}")+)\\]$'
      type: String 
    }],
    epochs: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 1
    },
    loss: {
      type: Number,
      default: 0,
      min: -1,
      max: 1
    },
    recall: {
      type: Number,
      default: 0,
      min: 0,
      max: 1
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required!"],
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "user" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    issues: [{ type: Schema.Types.ObjectId, ref: "issue" }],
  },
  { collection: "tensormodels" }
);

const TensorModel =
  mongoose.models.tensormodel ||
  mongoose.model("tensormodel", TensorModelSchema);

module.exports = TensorModel;
