const nodemailer = require("nodemailer");
const Course = require('../models/Course');
const User = require('../models/User')

exports.getIndexPage = async (req, res) => {

  //Kursları oluşturma tarihlerine göre sıralar ve son iki kursu getirir
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStuents= await User.find().countDocuments({role:'student'})
  const totalTeachers= await User.find().countDocuments({role:'teacher'})

    res.status(200).render('index', {
        courses,
        totalCourses,
        totalStuents,
        totalTeachers,
        page_name:'index'  // ilgili sayfaya page_name isminde bir değişken gönderiyoruz
    });
  };

  exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name:'about'
    });
  };

  exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name:'register'
    });
  };

  exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name:'login'
    });
  };

  exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name:'contact'
    });
  };

  exports.sendEmail = (req, res) => {

    try {
      const outputMessage = `
    <h1> Mail Details</h1>
    <ul>
      <li>Name:${req.body.name}  </li>
      <li>Email:${req.body.email}  </li>
    </ul>

    <h1> Message </h1> 
    <p>${req.body.message}</p>
   
   `

   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "deneme@gmail.com",
      pass: "bwwgbdgb111111",
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Smart Edu Contact Form" <deneme@gmail.com>', // sender address
      to: "btabur.0323@gmail.com", // list of receivers
      subject: " Smart Edu Contact Message", // Subject line
     
      html: outputMessage, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  };
  req.flash("success",'We received your message successfuly')
  res.status(200).redirect('contact')
      
    } catch (error) {
      req.flash("error",`Something happened! ${error}`)
      res.status(200).redirect('contact')
    }
   

}