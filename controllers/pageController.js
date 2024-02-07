exports.getIndexPage = (req, res) => {
    res.status(200).render('index', {
        page_name:'index'  // ilgili sayfaya page_name isminde bir değişken gönderiyoruz
    });
  };

  exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name:'about'
    });
  };