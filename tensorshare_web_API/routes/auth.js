const express = require("express");
const assert = require("assert");
const bcrypt = require("bcryptjs");

const router = express.Router();

const jwt = require("../utils/jwt");

const config = require("../utils/config");

const User = require("../models/user");

/**
 * Register user
 */
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  // Assert
  assert(typeof username === "string", "Username is not a valid string!");
  assert(typeof password === "string", "Password is not a valid string!");
  assert(typeof email === "string", "Email is not a valid string");

  const usrName = username;
  const hash = bcrypt.hashSync(password, config.saltRounds);

  const newUser = new User({
    username: usrName,
    password: hash,
    email: email,
  });

  await newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "User created!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not register user", error: err });
    });
});

/**
 * Login
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const usrName = username;
  await User.findOne({ username: usrName })
    .then((result) => {
      if (bcrypt.compareSync(password, result.password)) {
        const token = jwt.encodeToken(result._id);

        // Set empty string for security reasons
        result.password = "";

        res.status(200).json({
          user: result,
          authtoken: token,
        });
      } else {
        res.status(401).json({ message: "Authentication failed!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Authentication failed!", error: err });
    });
});

module.exports = router;
