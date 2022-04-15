const express = require("express");
// const assert = require("assert");

const router = express.Router();

const { ObjectId } = require("mongoose").Types;

// const User = require("../../models/user");
const TensorModel = require("../../models/tensorModel");
const Issue = require("../../models/issue");
const Comment = require("../../models/comment");

// Create comment for Tensor Model
router.post("/tensormodels/:tensorModelId", async (req, res) => {
    const userId = res.get("id");

    const { tensorModelId } = req.params;

    const { content } = req.body;

    const tmIdIsValid = ObjectId.isValid(tensorModelId);

    let tmFound = false;
    let error = null;

    if (tmIdIsValid) {
        await TensorModel.findOne({ _id: ObjectId(tensorModelId) })
            .then((result) => {
                if (result != null) tmFound = true;
            })
            .catch((err) => {
                error = err;
            });

        if (tmFound) {
            const comment = new Comment({
                user: ObjectId(userId),
                content: content,
                commentType: "TensorModel",
            });

            await comment
                .save()
                .then(async (newComment) => {
                    await TensorModel.findOneAndUpdate(
                        { _id: ObjectId(tensorModelId) },
                        { $push: { comments: ObjectId(newComment._id) } }
                    )
                        .then(() => {
                            res.status(200).json(newComment);
                        })
                        .catch((err) => {
                            res.status(500).json({
                                message: "Could not add created comment to tensor model!",
                                error: err,
                            });
                        });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Could create new comment!",
                        error: err,
                    });
                });
        } else {
            res.status(500).json({
                message: "Tensor model not found!",
                error: error
            });
        }
    } else {
        res.status(500).json({
            message: "Tensor model ID is not valid!",
        });
    }
});

// Create comment for Issue
router.post("/issues/:issueId", async (req, res) => {
    const userId = res.get("id");

    const { issueId } = req.params;

    const { content } = req.body;

    let objectIdValid = ObjectId.isValid(issueId);
    let issueFound = false;
    let error = null;

    if (objectIdValid) {
        await Issue.findById({ _id: issueId })
            .then((result) => {
                if (result != null) issueFound = true;
            })
            .catch((err) => {
                error = err;
            });

        if (issueFound && error == null) {
            const comment = new Comment({
                user: ObjectId(userId),
                content: content,
                commentType: "Issue",
            });

            await comment
                .save()
                .then(async (newComment) => {
                    await Issue.findOneAndUpdate(
                        { _id: ObjectId(issueId) },
                        { $push: { comments: ObjectId(newComment._id) } }
                    )
                        .then(() => {
                            res.status(200).json(newComment);
                        })
                        .catch((err) => {
                            res.status(500).json({
                                message: "Could not add created comment to issue!",
                                error: err,
                            });
                        });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Could create new comment!",
                        error: err,
                    });
                });
        } else if (!issueFound && error != null) {
            res.status(500).json({
                message: "Issue not found!",
            });
        } else {
            res.status(500).json({
                message: "Issue not found!",
                error: error,
            });
        }
    } else {
        res.status(500).json({
            message: "Issue id not valid!",
        });
    }
});

// Get comments from Tensor Model
router.get("/tensormodels/:tensorModelId", async (req, res) => {
    const { tensorModelId } = req.params;

    const tmIdIsValid = ObjectId.isValid(tensorModelId);

    let error = null;
    let tmFound = false;
    let commentIds = [];

    if (tmIdIsValid) {
        await TensorModel.findOne({ _id: ObjectId(tensorModelId) }).then((result) => {
            tmFound = true;
            commentIds = result.comments;
        })
            .catch((err) => {
                error = err;
            });

        if (tmFound && error == null) {
            await Comment.find({ _id: { $in: commentIds } })
                .populate("user")
                .then((results) => {
                    for (let comment of results) {
                        // Set empty string for security reasons
                        comment.user.password = "";
                    }

                    res.status(200).json(results);
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Could not find comments!",
                        error: err,
                    });
                });
        } else {
            res.status(500).json({
                message: "Tensor model not found!",
                error: error
            });
        }
    } else {
        res.status(500).json({
            message: "Tensor model ID invalid!",
        });
    }
});

// Get comments from Issue
router.get("/issues/:issueId", async (req, res) => {
    const { issueId } = req.params;

    const idIsValid = ObjectId.isValid(issueId);

    let error = null;
    let issueFound = false;
    let commentIds = [];

    if (idIsValid) {

        await Issue.findOne({ _id: ObjectId(issueId) }).then((result) => {
            issueFound = true;
            commentIds = result.comments;
        })
            .catch((err) => {
                error = err;
            });

        if (issueFound && error == null) {
            await Comment.find({ _id: { $in: commentIds } })
                .populate("user")
                .then((results) => {
                    for (let comment of results) {
                        // Set empty string for security reasons
                        comment.user.password = "";
                    }

                    res.status(200).json(results);
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Could not find comments!",
                        error: err,
                    });
                });
        } else {
            res.status(500).json({
                message: "Issue not found!",
                error: error
            });
        }
    } else {
        res.status(500).json({
            message: "Issue ID is invalid!",
        });
    }
});

// Update comment
router.put("/:id", async (req, res) => {
    const { id } = req.params;

    const userId = res.get("id");

    const { content } = req.body;

    const idIsValid = ObjectId.isValid(id);

    if (idIsValid) {

        await Comment.findOneAndUpdate(
            { _id: ObjectId(id), user: ObjectId(userId) },
            { $set: { content: content } }
        )
            .then(() => {
                res.status(200).json({ message: "Comment successfully updated!" });
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Could not update comment",
                    error: err,
                });
            });
    } else {
        res.status(500).json({
            message: "Comment ID is invalid!",
        });
    }
});

// Delete comment
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const userId = res.get("id");

    const idIsValid = ObjectId.isValid(id);

    let isSuccess = false;

    if (idIsValid) {

        await Comment.findOneAndDelete({
            _id: ObjectId(id),
            user: ObjectId(userId),
        }).then(() => {
            isSuccess = true;
        });

        if (isSuccess) {
            await Issue.findOneAndUpdate(
                { comments: id },
                { $pull: { comments: ObjectId(id) } }
            );

            await TensorModel.findOneAndUpdate(
                { comments: id },
                { $pull: { comments: ObjectId(id) } }
            );

            res.status(200).json({ message: "Comment successfully deleted!" });
        } else {
            res.status(500).json({ message: "Could not delete comment (not found) !" });
        }
    } else {
        res.status(500).json({
            message: "Comment ID is invalid!",
        });
    }
});

// Upvote Comment
router.patch("/:id/upvote", async (req, res) => {
    const { id } = req.params;
    const userId = res.get('id');

    const idIsValid = ObjectId.isValid(id);

    let hasUpvoted = false;
    let isfound = false;

    if (idIsValid) {

        await Comment.findOne({ _id: ObjectId(id) }).then(async (result) => {
            isfound = true;
            if (result.upvotes.includes(userId)) {
                hasUpvoted = true;
            }
        })
            .catch(() => {

            });

        if (!hasUpvoted && isfound) {
            // Add upvote
            await Comment.findOneAndUpdate(
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
                        message: "Could not update (add) upvotes of Comment!",
                        error: err,
                    });
                });
        } else if (hasUpvoted && isfound) {
            // Remove upvote
            await Comment.findOneAndUpdate(
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
                        message: "Could not update (remove) upvotes of Comment!",
                        error: err,
                    });
                });
        } else {
            res.status(500).json({
                message: "Could not find and update upvotes of Comment!",
            });
        }
    } else {
        res.status(500).json({
            message: "Comment ID is invalid!",
        });
    }
});

module.exports = router;
