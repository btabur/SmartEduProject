const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");


exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name:req.body.name,
      description:req.body.description,
      category:req.body.category,
      user:req.session.userID
    });
    req.flash("success",`${course.name} has been created successfully`)
    res.status(201).redirect('/courses')
  } catch (error) {
    req.flash("error",'Something happened')
    res.status(400).redirect('/courses')
  }
};

exports.getAllCourses = async (req, res) => {
  try {


    const categorySlug = req.query.categories;  // url deki query i çekiyoruz
    const query = req.query.search;

    const category = await Category.findOne({slug:categorySlug})  // query ye göre categories listesinden istenen category yi alıyoruz

    let filter = {};

    if(categorySlug) {
      filter= {category:category._id}
    }

    if(query) {
      filter = {name:query}
    }

    if(!query && ! categorySlug) {
      filter.name = '';
      filter.category=null
    }


    const courses = await Course.find({
      $or:[
        {name:{$regex: '.*' + filter.name + '.*', $options:'i'}},
        {category:filter.category}
      ]
    }).sort('-createdAt').populate('user')  // kursları filterledikten sonra oluşturulma tarihlerine göre sıralar
    const categories = await Category.find();

    res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.getCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID)
    const course = await Course.findOne({slug: req.params.slug}).populate('user')  //user bilgisini eklemek için bu şekilde kullandık
    const categories = await Category.find();
    res.status(200).render("course", {
      course,
      page_name: "courses",
      user,
      categories

    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
   const user = await User.findById(req.session.userID);
   await user.courses.push({_id: req.body.course_id});
   await user.save();

   res.status(200).redirect('/users/dashboard')
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
   const user = await User.findById(req.session.userID);
   await user.courses.pull({_id: req.body.course_id});
   await user.save();

   res.status(200).redirect('/users/dashboard')
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
 
    const deletedCourse = await Course.findOneAndDelete({ slug:req.params.slug });

    if (!deletedCourse) {
      // Eğer silinen bir kurs bulunamazsa
      return res.status(404).json({
        status: 'fail',
        message: 'Kurs bulunamadı.',
      });
    }

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


exports.updateCourse = async (req, res) => {
  try {
 
    const course =await Course.findOne({slug:req.params.slug});
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;

    course.save();
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