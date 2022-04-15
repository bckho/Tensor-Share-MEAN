const moment = require("moment");
const jwt = require("jwt-simple");
const config = require("./config.js");

//
// Encode
//
function encodeToken(userId) {
  const payload = {
    exp: moment().add(1, "days").unix(),
    iat: moment().unix(),
    sub: userId,
  };
  return jwt.encode(payload, config.jwtSecretKey);
}

//
// Decode
//
function decodeToken(token, cb) {
  try {
    const payload = jwt.decode(token, config.jwtSecretKey);

    if (moment().unix() > payload.exp) {
      cb(new Error("token_has_expired"));
    } else {
      cb(null, payload);
    }
  } catch (err) {
    cb(err, null);
  }
}

module.exports = {
  encodeToken,
  decodeToken,
};
