const express = require("express");
const https = require("https");
const bodyPrser = require("body-parser");

const app = express();
app.use(bodyPrser.urlencoded({
  extended: true
}));
// static files
app.use(express.static(__dirname + '/public'));

// GET DATA
app.get("/", function(req, res) {
  // res from html
  res.sendfile(__dirname + "/index.html");
});
// POST DATA
app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apikey = "5e67fc79a43ddca60e7be9bd80be72b5";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const main = weatherData.weather[0].main;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});




app.listen(3000, function() {
  console.log("server is running on port 3000.");
});
