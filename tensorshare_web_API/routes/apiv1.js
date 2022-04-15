const express = require("express");
const router = express.Router();
const jwt = require("../utils/jwt");

// ROUTES
const tensorModelRoute = require("./apiv1/tensormodelroute");
const commentRoute = require("./apiv1/commentroute");
const issueRoute = require("./apiv1/issueroute");

router.all("*", (req, res, next) => {
  const token = req.header("authtoken") || "";

  if (token === "" || token == null || token == undefined) {
    res
      .status(401)
      .json({
        message: "Unauthorized access!",
        reason: "No authtoken passed."
      });
      console.warn("*** No token passed!");
  } else {

    jwt.decodeToken(token, (err, payload) => {
      if (err) {
        console.log(err);
        res
          .status(401)
          .json({
            message: "Unauthorized access!",
            error: err,
          });
      } else {
        res.set("id", payload.sub);
        next();
      }
    });
  }
});

router.use("/tensormodels", tensorModelRoute);
router.use("/comments", commentRoute);
router.use("/issues", issueRoute);

module.exports = router;
