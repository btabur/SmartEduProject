const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        unique:true,
        required:true
    },
    slug:{
        type:String,
        unique:true,
    }

});

//veri tabanına kaydedilmeden önce kullanılan kurs ismini slugify ile slug şekline çevirerek modele ekler
CategorySchema.pre('validate',function(next){
    this.slug=slugify(this.name, {
        lover:true,
        strict:true, // name içerisinde : gibi gereksiz karakterler varsa bunları yok sayacak
    })
    next();
})

const Category = mongoose.model('Category',CategorySchema);

module.exports = Category