const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let raw_token = req.headers["Authorization"] || req.headers["authorization"];
  if (!raw_token) {
    res.status(403).send("No token!");
    return;
  }

  let token = raw_token.split(" ")[1];
  if (!token) {
    res.status(403).send("No token!");
    return;
  }
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid token!");
    }
    if (decoded) {
      //console.log(decoded);
      req.user = decoded;
      next();
    }
  });
};

const authWithOutResponse = (req, res, next) => {
  let raw_token = req.headers["Authorization"] || req.headers["authorization"];
  if (!raw_token) {
    // console.log(raw_token);
    req.user = null;
    return next();
  }

  let token = raw_token.split(" ")[1];
  if (!token) {
    req.user = null;
    next();
  }
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
      return next();
    }
    if (decoded) {
      // console.log(decoded);
      req.user = decoded;
      return next();
    }
  });
};

module.exports = { auth, authWithOutResponse };
