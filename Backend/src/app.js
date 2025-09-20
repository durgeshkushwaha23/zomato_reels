const express = require('express');
const cookieparser = require("cookie-parser")
const authRoutes = require("./routes/auth_routes")
const foodRouters = require("./routes/Food_routes")
const app = express();

app.use(cookieparser());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("hello world")
});

app.use('/api/auth',authRoutes)
app.use("/api/food",foodRouters)

module.exports = app;