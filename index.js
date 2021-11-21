const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const app=express();
const log=console.log;

require('dotenv').config({
    path:"config.env"
});

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(morgan("dev"));


const fetch=require('./routes/fetch');
app.use("/fetch",fetch);
const weather=require('./routes/weather');
app.use("/weather",weather);


app.listen(3001,()=>{
    console.log("started!");
});