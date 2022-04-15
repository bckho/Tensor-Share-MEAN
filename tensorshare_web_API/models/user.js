const mongoose = require("mongoose");
const { Schema } = mongoose;

// Email address Regex from: https://emailregex.com/
// Based on the General Email Regex (RFC 5322 Official Standard) Regex

const UserSchema = new Schema(
  {
    username: {
      type: String,
      validate: {
        validator(v) {
          return /^[a-zA-Z0-9_-]{3,16}$/.test(v);
        },
        msg: "username is not valid (can only contain lower- and uppercase letters and numbers; Min. characters is 3, max. 16)",
      },
      unique: [true, "username is already in use!"],
      required: [true, "username is required!"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validator(v) {
        return /^.{5,100}$/.test(v);
      },
      msg: "password is not valid (min. 5 characters, max 100 characters)",
    },
    email: {
      type: String,
      validate: {
        validator(v) {
          return /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        msg: "emailAddress is not valid!",
      },
      unique: [true, "Email is already in use!"],
      required: [true, "Email is required"],
    },
    dateRegistered: {
      type: Date,
      default: Date.now(),
    },
    tensorModels: [{ type: Schema.Types.ObjectId, ref: "tensormodel" }],
  },
  {
    collection: "users",
  }
);

const User = mongoose.models.user || mongoose.model("user", UserSchema);

module.exports = User;
