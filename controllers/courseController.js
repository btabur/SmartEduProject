const Course = require("../models/Course");
const Category = require("../models/Category");


exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).redirect('/courses')
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {


    const categorySlug = req.query.categories;  // url deki query i çekiyoruz

    const category = await Category.findOne({slug:categorySlug})  // query ye göre categories listesinden istenen category yi alıyoruz

    let filter = {};

    if(categorySlug) {
      filter= {category:category._id}
    }



    const courses = await Course.find(filter).sort('-createdAt')  // kursları filterledikten sonra oluşturulma tarihlerine göre sıralar
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
    const course = await Course.findOne({slug: req.params.slug});

    res.status(200).render("course", {
      course,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};