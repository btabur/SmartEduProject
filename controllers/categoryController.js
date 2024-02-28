const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).redirect('/users/dashboard')
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
 
  await Category.findByIdAndDelete(req.params.id);
  

  
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