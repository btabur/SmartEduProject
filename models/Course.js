const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        unique:true,
        required:true
    },
    description: {
        type: String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        unique:true,
    }

});

//veri tabanına kaydedilmeden önce kullanılan kurs ismini slugify ile slug şekline çevirerek modele ekler
CourseSchema.pre('validate',function(next){
    this.slug=slugify(this.name, {
        lover:true,
        strict:true, // name içerisinde : gibi gereksiz karakterler varsa bunları yok sayacak
    })
    next();
})

const Course = mongoose.model('Course',CourseSchema);

module.exports = Course