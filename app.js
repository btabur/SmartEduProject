const express = require("express");
const mongoose = require('mongoose')
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute')


const app = express();

//connetct db

mongoose.connect('mongodb://127.0.0.1/smartEdu-db')
.then(()=> console.log('Db Connected Succesfuly'));


//Template Engine
app.set("view engine","ejs")


//Middlewares
app.use(express.static("public"))

//Routers
app.use("/", pageRoute);
app.use("/courses", courseRoute);


const port = 3000;
app.listen(port, () => {
  console.log("App started");
});
