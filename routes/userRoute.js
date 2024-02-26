const express = require("express");
const {body} = require('express-validator');



const authController = require("../controllers/authController");
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User')

const router = express.Router();

router.route("/signup").post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),
        body('email').isEmail().withMessage('Please Enter Valid Email')
        .custom((userEmail)=> {
            return User.findOne({email:userEmail}).then(user => {
                if(user) {
                    return Promise.reject('Email is already exist')
                }
            })

        }),

        body('password').not().isEmpty().withMessage('Please Enter A Password'),
    ],
    authController.createUser); //http://localhost:3000/users/signup
router.route("/login").post(authController.loginUser); //http://localhost:3000/users/login
router.route("/logout").get(authController.logoutUser); 
// izinsiz girişleri engellemek için özel bir middleware yazdık 
// dashboard sayfasına gitmeden önce authMiddleware ile izninin olup olmadığı kontrol edilir
router.route("/dashboard").get(authMiddleware,authController.getDashboardPage); 
router.route('/:id').delete(authController.deleteUser)


module.exports = router;