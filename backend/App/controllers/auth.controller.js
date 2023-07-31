const db = require("../model");

const config = require('../config/auth.config')

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

const User = db.user;


//creating user

exports.signUp = async (req, res) => {

    //save the data to database

    try {
        User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            userName: req.body.userName,
            MobileNumber: req.body.MobileNumber
        })
            .then(() => {
                res.status(200).send({ messaage: "Successfully Registered" });
            })
    }
    catch (err) {
        res.status(500).send(err);
        console.log({messaage:"Registration failed"},err);
    }

};


//retriving the user 

exports.signIn = (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(401).send({ message: "User Not Found" });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }

            const token = jwt.sign({ email: user.email },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });

            res.status(200).send({
                user: user,
                accessToken: token
            });


        })
        .catch(err=>{
            res.status(500).send({message:err.message});
        });

};


exports.allUsers = (req, res) => {
   
  
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        console.log(err);
      });
  };