const express = require("express");
// const assert = require("assert");

const router = express.Router();

const { ObjectId } = require("mongoose").Types;

// const User = require("../../models/user");
const TensorModel = require("../../models/tensorModel");
const Issue = require("../../models/issue");
const Comment = require("../../models/comment");

// Create new Issue
router.post('/', async (req, res) => {
    const userId = res.get('id');

    const {
        title,
        description,
        tensorModelId
    } = req.body;

    const tmIdIsValid = ObjectId.isValid(tensorModelId);

    let error = null;
    let tmFound = false;

    if (tmIdIsValid) {

        await TensorModel.findOne({ _id: ObjectId(tensorModelId) })
            .then((result) => {
                if (result != null) tmFound = true;
            })
            .catch((err) => {
                error = err;
            });

        if (tmFound && error == null) {
            const issue = new Issue({
                title: title,
                description: description,
                user: ObjectId(userId)
            });

            await issue.save()
                .then(async (newIssue) => {
                    await TensorModel.findOneAndUpdate(
                        { _id: ObjectId(tensorModelId) },
                        { $push: { issues: ObjectId(newIssue._id) } })
                        .then(() => {
                            res.status(200).json(newIssue);
                        })
                        .catch((err) => {
                            res.status(500).json({
                                message: "Could not update tensor model with new issue!",
                                error: err
                            });
                        });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Could not create new issue!",
                        error: err
                    });
                });
        } else {
            res.status(404).json({
                message: "Could not find tensor model!",
                error: error
            });
        }
    } else {
        res.status(500).json({
            message: "Given tensormodel ID is invalid!"
        });
    }
});

// Get issues by tensormodel id
router.get('/tensormodels/:tensorModelId', async (req, res) => {
    const { tensorModelId } = req.params;

    const idIsValid = ObjectId.isValid(tensorModelId);

    let error = null;
    let tmFound = false;
    let issueIds = [];

    if (idIsValid) {

        await TensorModel.findOne({ _id: ObjectId(tensorModelId) })
            .then((result) => {
                tmFound = true;

                issueIds = result.issues;
            })
            .catch((err) => {
                error = err;
            });

        if (tmFound && error == null && issueIds.length > 0) {
            await Issue.find({ _id: { $in: issueIds } })
                .populate('user')
                .then((results) => {
                    // Set empty string for security reasons
                    for (let tm of results) {
                        tm.user.password = "";
                    }
                    res.status(200).json(results);
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Could not get issues!",
                        error: err
                    });
                });
        } else if (tmFound && error == null && issueIds.length === 0) {
            res.status(200).json(issueIds);
        } else {
            res.status(404).json({
                message: "Could not find issues of tensor model!",
                error: error
            });
        }
    } else {
        res.status(500).json({
            message: "tensormodel id is invalid!"
        });
    }
});

// Get issue by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const idIsValid = ObjectId.isValid(id);

    if (idIsValid) {

        await Issue.findOne({ _id: ObjectId(id) })
            .populate('user')
            .then((result) => {
                // Set empty string for security reasons
                result.user.password = "";

                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Could not get issue!",
                    error: err
                });
            });
    } else {
        res.status(500).json({
            message: "issue id is invalid!"
        });
    }
});

// Update issue contents
router.put('/:id', async (req, res) => {
    const userId = res.get('id');

    const { id } = req.params;

    const idIsValid = ObjectId.isValid(id);

    const {
        title,
        description
    } = req.body;

    const updatedIssue = {
        title: title,
        description: description
    };

    if (idIsValid) {

        await Issue.findOneAndUpdate(
            { _id: ObjectId(id), user: ObjectId(userId) },
            updatedIssue,
            { new: true })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Cannot update issue.",
                    error: err
                });
            });
    } else {
        res.status(500).json({
            message: "issue id is invalid!"
        });
    }
});

// Close issue
router.patch('/:id/close', async (req, res) => {
    const userId = res.get('id');

    const { id } = req.params;

    const idIsValid = ObjectId.isValid(id);

    const updatedIssue = {
        closedDate: Date.now(),
        isSolved: true
    };

    let error = null;
    let alreadyClosed = false;

    if (idIsValid) {

        await Issue.findOne({ _id: ObjectId(id), user: ObjectId(userId) })
            .then((result) => {
                if (result.isSolved) {
                    alreadyClosed = true;
                }
            })
            .catch((err) => {
                error = err;
            });

        if (!alreadyClosed && error == null) {
            await Issue.findOneAndUpdate(
                { _id: ObjectId(id), user: ObjectId(userId) },
                updatedIssue
            )
                .then(() => {
                    res.status(200).json({
                        message: "Successfully closed issue!"
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Could not update issue.",
                        error: err
                    });
                });

        } else if (alreadyClosed && error == null) {
            res.status(409).json({
                message: "Issue is already closed!"
            });
        } else {
            res.status(404).json({
                message: "issue not found!",
                error: error
            });
        }

    } else {
        res.status(500).json({
            message: "issue id is invalid!"
        });
    }
});

// Delete issue
router.delete('/:id', async (req, res) => {
    const userId = res.get('id');

    const { id } = req.params;

    const idIsValid = ObjectId.isValid(id);

    let temp = null;
    let deleteError = null;

    if (idIsValid) {

        // find and delete issue
        await Issue.findOneAndDelete({ _id: ObjectId(id), user: ObjectId(userId) })
            .then((result) => {
                temp = result;
            })
            .catch((err) => {
                deleteError = err;
            });

        if (temp != null) {
            // Delete comments of issue
            await Comment.deleteMany({ _id: { $in: temp.comments } });

            // Pull issue id from tensor model issue list
            await TensorModel.findOneAndUpdate(
                { issues: id },
                { $pull: { issues: id } }
            )
                .then(() => {
                    res.status(200).json({
                        message: "Successfully deleted issue!"
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Could not update (remove) issue of Tensor Model!",
                        error: err,
                    });
                });
        } else {
            res.status(404).json({
                message: "Could not delete issue!",
                error: deleteError
            });
        }
    } else {
        res.status(500).json({
            message: "issue id is invalid!"
        });
    }
});

module.exports = router;
