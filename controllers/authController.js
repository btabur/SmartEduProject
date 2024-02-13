const User = require("../models/User");
const bcrypt = require("bcrypt");


exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((response) => {
        bcrypt.compare(password, response.password)
          .then((isTrue) => {
            if(isTrue) {
              req.session.userID = response._id;
              res.status(200).redirect('/')
            }else {
              res.status(200).send('password is not true');
            }
          })
          .catch((err) => {
            res.status(200).send(err);
          });
      })
      .catch(() => {
        res.status(200).send("User was not founded");
      });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
