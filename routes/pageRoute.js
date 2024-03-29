const express = require('express');

const redirectMiddleware = require('../middlewares/redirectMiddleware')

const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
//redirectMiddleware :  bir kullanıcı var ise register ve login sayfalarına ulaşmasını engeller
router.route('/register').get(redirectMiddleware,pageController.getRegisterPage)
router.route('/login').get(redirectMiddleware,pageController.getLoginPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.sendEmail)

module.exports=router