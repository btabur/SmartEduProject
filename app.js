const express = require("express");
const mongoose = require('mongoose')
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute')


const app = express();

//connetct db

mongoose.connect('mongodb://127.0.0.1/smartEdu-db')
.then(()=> console.log('Db Connected Succesfuly'));


//Template Engine
app.set("view engine","ejs")


//Middlewares
app.use(express.static("public"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routers
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);


const port = 3000;
app.listen(port, () => {
  console.log("App started");
});
