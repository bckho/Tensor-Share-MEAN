const mongoose = require("mongoose");
const { Schema } = mongoose;

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    postDate: {
      type: Date,
      default: Date.now(),
    },
    isSolved: {
      type: Boolean,
      default: false,
    },
    closedDate: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  },
  {
    collection: "issues",
  }
);

const Issue =
  mongoose.models.issue || mongoose.model("issue", IssueSchema);

module.exports = Issue;
