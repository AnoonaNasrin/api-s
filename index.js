const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose")
const authRouter = require("./routes/auth")

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/',authRouter)

mongoose.connect("mongodb://localhost:27017/myDb")


app.listen(4000, () => {
    console.log("Server running in 4000");
});
