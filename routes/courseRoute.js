const express = require('express')

const courseController = require('../controllers/courseController');

const router = express.Router();

router.route('/').get(courseController.createCourse)  //http://localhost:3000/courses


module.exports=router