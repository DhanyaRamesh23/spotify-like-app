const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../utils/Database");

const CreateUser = (user, res) => {
  // Check whether user with the same email exist
  const saltRounds = 10;
  let sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [user.email], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }
    if (rows && rows.length > 0) {
      res.status(409).send({ message: "User already exist!" });
    } else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          console.log(err);
          res.status(500).send();
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
            res.status(500).send();
          }

          sql =
            "INSERT INTO users (name, email, hashed_password) VALUES (?,?,?);";
          db.query(sql, [user.name, user.email, hash], (err, rows) => {
            if (err) {
              console.log(err);
              res.status(500).send();
            }
            res.status(200).send("Created user!");
          });
        });
      });
    }
  });
};

const LoginUser = (user, res) => {
  let sql = "SELECT * FROM users WHERE email = ?;";
  db.query(sql, [user.email], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }

    console.log(rows);
    if (rows && rows.length != 0) {
      const originalUser = rows[0];
      bcrypt.compare(
        user.password,
        originalUser.hashed_password,
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send();
          }

          if (result === true) {
            const token = jwt.sign(
              { user_id: originalUser.user_id },
              process.env.JWT_TOKEN_SECRET,
              {
                expiresIn: "4h",
              }
            );
            user.token = token;

            res.status(200).json({ id: user.user_id, token });
          } else {
            res.status(400).send("Invalid Credentials");
          }
        }
      );
    } else {
      res.status(404).send({ message: "No user found!" });
    }
  });
};

module.exports = { CreateUser, LoginUser };
