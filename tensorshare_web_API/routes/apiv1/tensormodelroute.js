const express = require("express");
// const assert = require("assert");

const router = express.Router();

const { ObjectId } = require("mongoose").Types;

const User = require("../../models/user");
const TensorModel = require("../../models/tensorModel");
const Issue = require("../../models/issue");
const Comment = require("../../models/comment");

// Create new TensorModel
router.post("/", async (req, res) => {
  const userId = res.get("id");

  const {
    name,
    description,
    category,
    modelType,
    configuration,
    epochs,
    accuracy,
    loss,
    recall,
  } = req.body;

  const newTensorModel = new TensorModel({
    name: name,
    description: description,
    category: category,
    modelType: modelType,
    configuration: configuration,
    epochs: epochs,
    accuracy: accuracy,
    loss: loss,
    recall: recall,
    user: ObjectId(userId),
  });

  let userFound = false;

  // Check if user exists
  await User.findOne({ _id: userId })
    .then((userResult) => {
      if (userResult != null) {
        userFound = true;
      }
    })
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      userFound = false;
    });

  if (!userFound) {
    res
      .status(401)
      .json({ message: "Cannot create TensorModel, user not found!" });
  } else {
    let nameIsInUse = false;

    await TensorModel.findOne({ name: name, user: ObjectId(userId) })
      .then((tmResult) => {
        if (tmResult != null) {
          nameIsInUse = true;
        }
      })
      .catch(() => {
        nameIsInUse = false;
      });

    if (nameIsInUse) {
      res.status(409).json({
        message: "Name of TensorModel is already in use by the user!",
      });
    } else {
      await newTensorModel
        .save()
        .then(async (result) => {
          await User.findByIdAndUpdate(userId, {
            $push: { tensorModels: ObjectId(result._id) },
          })
            .then(() => {
              res.status(201).json(result);
            })
            .catch((err) => {
              res.status(409).json({
                message: "Could not add TensorModel to user!",
                error: err,
              });
            });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Could not create TensorModel!", error: err });
        });
    }
  }
});

// Get all tensormodels
router.get("/", async (req, res) => {
  await TensorModel.find()
    .sort({ postDate: 'desc' })
    .populate("user")
    .then((results) => {
      // Set empty string for security reasons
      for (let tm of results) {
        tm.user.password = "";
      }

      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not retrieve TensorModels from user!",
        error: err,
      });
    });
});

// Get tensormodel by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const idIsValid = ObjectId.isValid(id);

  if (idIsValid) {
    await TensorModel.findById(id)
      .populate("user")
      .then((result) => {
        // Set empty string for security reasons
        result.user.password = "";

        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          message: `Could not retrieve TensorModels from id ${id}`,
          error: err,
        });
      });
  } else {
    res.status(500).json({
      message: "tensormodel ID is invalid!",
    });
  }
});

// Get tensormodel from username
router.get("/user/:username", async (req, res) => {
  const { username } = req.params;

  let userFound = false;
  let userId = null;

  // Check if user exists
  await User.findOne({ username: username })
    .then((userResult) => {
      userFound = true;
      userId = userResult._id;
    })
    .catch(() => {
      userFound = false;
    });

  if (!userFound) {
    res
      .status(404)
      .json({ message: "Cannot get TensorModels, user not found!" });
  } else {
    await TensorModel.find({ user: ObjectId(userId) })
      .populate("user")
      .then((results) => {
        // Set empty string for security reasons
        for (let tm of results) {
          tm.user.password = "";
        }
        res.status(200).json(results);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Could not retrieve TensorModels!",
          error: err,
        });
      });
  }
});

// Update tensormodel by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const userId = res.get("id");

  const idIsValid = ObjectId.isValid(id);

  const {
    name,
    description,
    category,
    modelType,
    configuration,
    epochs,
    accuracy,
    loss,
    recall,
  } = req.body;

  // Check if the name stays the same
  let isHoldingSameName = false;

  if (idIsValid) {

    await TensorModel.findById(id)
      .then((queryResult) => {
        if (queryResult.name == name) {
          isHoldingSameName = true;
        }
      })
      .catch(() => {

      });

    // Check if the name is already in use
    let nameIsInUse = false;

    await TensorModel.findOne({ name: name, user: ObjectId(userId) })
      .then((tmResult) => {
        // Create exception for holding the same name
        if (tmResult != null && isHoldingSameName) {
          nameIsInUse = false;
        } else {
          nameIsInUse = true;
        }
      })
      .catch(() => {
        nameIsInUse = true;
      });

    if (nameIsInUse) {
      res
        .status(409)
        .json({ message: "Name of TensorModel is already in use by the user!" });
    } else {
      const updatedTensorModel = {
        name: name,
        description: description,
        category: category,
        modelType: modelType,
        configuration: configuration,
        epochs: epochs,
        accuracy: accuracy,
        loss: loss,
        recall: recall,
        lastUpdatedDate: Date.now(),
      };

      await TensorModel.findOneAndUpdate(
        { _id: ObjectId(id), user: ObjectId(userId) },
        updatedTensorModel,
        { new: true }
      )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json({
            message: `Could not update TensorModels from id ${id}`,
            error: err,
          });
        });
    }
  } else {
    res.status(500).json({
      message: "tensormodel ID is invalid!",
    });
  }
});

// Delete TensorModel by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const userId = res.get("id");

  const idIsValid = ObjectId.isValid(id);

  let temp = null;
  let deleteError = null;

  if (idIsValid) {

    // Find and delete tensor model
    await TensorModel.findOneAndDelete({
      _id: ObjectId(id),
      user: ObjectId(userId),
    })
      .then(async (result) => {
        temp = result;
      })
      .catch((err) => {
        deleteError = err;
      });

    if (temp != null) {
      // Delete Issues and their comments
      for (let issueId of temp.issues) {
        await Issue.findOneAndDelete({ _id: ObjectId(issueId) }).then(
          async (issueResult) => {
            // Delete comments of the issues
            await Comment.deleteMany({ _id: { $in: issueResult.comments } });
          }
        );
      }

      // Delete comments of Tensor Model
      await Comment.deleteMany({ _id: { $in: temp.comments } });

      // Remove Tensor Model Id from User
      await User.findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $pull: { tensorModels: id } }
      )
        .then(async () => {
          res.status(200).json({ message: "TensorModel successfully deleted!" });
        })
        .catch((err) => {
          res
            .status(409)
            .json({
              message: "Could not update (remove) tensor model of user!",
              error: err,
            });
        });
    } else {
      res.status(404).json({
        message: "Could not delete Tensor Model!, not found!",
        error: deleteError,
      });
    }
  } else {
    res.status(500).json({
      message: "tensormodel ID is invalid!"
    });
  }
});

// Upvote TensorModel
router.patch("/:id/upvote", async (req, res) => {
  const { id } = req.params;
  const userId = res.get('id');

  const idIsValid = ObjectId.isValid(id);

  let hasUpvoted = false;
  let isfound = false;

  if (idIsValid) {

    await TensorModel.findById(id)
      .then(async (result) => {
        isfound = true;
        if (result.upvotes.includes(userId)) {
          hasUpvoted = true;
        }
      })
      .catch(() => {
      });

    if (!hasUpvoted && isfound) {
      // Add upvote
      await TensorModel.findOneAndUpdate(
        {
          _id: ObjectId(id),
        },
        { $push: { upvotes: ObjectId(userId) } }
      )
        .then(() => {
          res.status(200).json({ message: "Successfully added upvote!" });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Could not update (add) upvotes of Tensor Model!",
            error: err,
          });
        });
    } else if (hasUpvoted && isfound) {
      // Remove upvote
      await TensorModel.findOneAndUpdate(
        {
          _id: ObjectId(id),
        },
        { $pull: { upvotes: ObjectId(userId) } }
      )
        .then(() => {
          res.status(200).json({ message: "Successfully removed upvote!" });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Could not update (remove) upvotes of Tensor Model!",
            error: err,
          });
        });
    } else {
      res.status(500).json({
        message: "Could not find and update upvotes of Tensor Model!",
      });
    }
  } else {
    res.status(500).json({
      message: "tensormodel ID is invalid!",
    });
  }
});

module.exports = router;
