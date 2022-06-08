const {
  CreateUser,
  LoginUser,
} = require("../../../controllers/UserController");
const auth = require("../../../utils/auth");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("ok");
});

router.post("/register", (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  //Validation
  const email_regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (user.name.trim().length === 0) {
    res.status(400).send();
  } else if (user.email.trim().length === 0) {
    res.status(400).send();
  } else if (!user.email.toLowerCase().match(email_regex)) {
    res.status(400).send();
  } else if (user.password.trim().length === 0) {
    res.status(400).send();
  }

  CreateUser(user, res);
});

router.post("/login", (req, res) => {
  const user = { email: req.body.email, password: req.body.password };
  // Validation
  console.log(user);

  LoginUser(user, res);
});
module.exports = router;
