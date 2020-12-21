//touch server.js
//npm init
//npm i express


const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//mandatory function to display the values
app.get("/",function(req,res){
   //sending the form
    res.sendFile(__dirname+"/index.html");
})
//inorder to get the data from a web page it has to be in form tags
//What will happen when the user clicks the button GO 
app.post("/",function(req,res){

const country = req.body.cityName;
const appKey = "c6098ac8ee2dce9bfc6663aa32f74be8";
const unit="metric";

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+country+"&units="+unit+"&appid="+appKey;
    https.get(url, function(response){
        console.log(response.statusCode);

        // this is a function to acess the weather data inside opening url function
        response.on("data",function(data){
            const weatherData=JSON.parse(data);//the data is stored
            //console.log(weatherData);//This is the full weather data is shown in hyper terminal
            const temp =weatherData.main.temp;//this is how you would acess the data
            const icon = weatherData.weather[0].icon;
            

            const imgURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write("<p>The weather currently in "+country+" is "+ "<em>"+weatherData.weather[0].description+"</em>" + ".");
            res.write("<h1>The temperature in "+country+ " is " + temp +" Celcius.</h1>");
            res.write("<img src="+imgURL+">");
            
            res.send();//it should be empty and at the end of the res.write
        })
    })
})

 

app.listen(process.env.PORT ||3000, function() {
    console.log("Server started on port 3000");
  });