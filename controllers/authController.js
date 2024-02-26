
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator');

const User = require("../models/User");
const Category = require('../models/Category');
const Course = require("../models/Course");


exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login')
  } catch (error) {
    const errors = validationResult(req);
    for(let i =0; i<errors.array().length;i++) {
      req.flash("error",`${errors.array()[i].msg} `)
    }
    
    res.status(400).redirect('/register')
   
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
              res.status(200).redirect('/users/dashboard')
            }else {
              req.flash("error",'Your Password is not correct')
              res.status(400).redirect('/login')
            }
          })
          .catch((err) => {
            req.flash("error",'User is not exist')
            res.status(400).redirect('/login')
          });
      })
      .catch(() => {
        req.flash("error",'User is not exist')
            res.status(400).redirect('/login')
      });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req,res)=> {
  req.session.destroy(()=> {
    res.redirect('/')
  })
}

exports.getDashboardPage = async(req, res) => {
  const user = await User.findOne({_id: req.session.userID}).populate('courses');  //bu kullanıcının kayıtlı olduğu kursları da içerisine ekler
  const categories = await Category.find();
  const courses = await Course.find({user:req.session.userID});
  const users = await User.find();

  res.status(200).render('dashboard', {
      page_name:'dashboard',
      user,
      categories,
      courses,
      users

  });
};


exports.deleteUser = async (req, res) => {
  try {
 
  await User.findByIdAndDelete(req.params.id);
  //o kullanıcıya ait bulunan kursları da siler
  await Course.deleteMany({user:req.params.id})

   

    // Başarılı silme durumu
    res.redirect('/users/dashboard');
  } catch (error) {
    // Hata durumunda
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    });
  }
};