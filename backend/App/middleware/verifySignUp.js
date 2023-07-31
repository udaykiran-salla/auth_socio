const db = require("../model");

const User = db.user;

exports.checkDuplicateEmail = (req, res, next) => {


    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  
};