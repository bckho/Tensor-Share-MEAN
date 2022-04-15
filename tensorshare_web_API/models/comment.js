const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    postDate: {
      type: Date,
      default: Date.now(),
    },
    content: {
      type: String,
      required: [true, "Comment is required"],
    },
    commentType: {
      // Choice: TensorModel, Issue
      type: String,
      required: [true, "CommentType is required!"],
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { collection: "comments" }
);

const Comment =
  mongoose.models.comment || mongoose.model("comment", CommentSchema);

module.exports = Comment;
