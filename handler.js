const serverless = require("serverless-http");
const express = require("express");
const app = express();
const https = require('https');

app.get("/", (req, res, next) => {
  return res.status(404).json({ message: "Invalid route" });
});

app.get("/cities", (req, res, next) => {
  // console.log(req.query)
  const city = req.query.name;

  let dataString = '';
  if (city === undefined)
    return res.status(404).json({ message: "City name property not found" });
  if (city === "")
    return res.status(404).json({ message: "City not found" });

  const apiKey = "YOUR API KEY"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  https.get(url, function(owResp) {
    owResp.on('data', chunk => {
        dataString += chunk;
    });
    owResp.on('end', () => {
        // console.log(dataString);
        try {
          const jsonRes = JSON.parse(dataString);
          const code = jsonRes.cod;
          const message = jsonRes.message;

          // return open weather error messages if not 200
          if(code != 200)
              return res.status(code).json({ message: message });

          const temp = jsonRes.main.temp;
          const condition = jsonRes.weather[0].description;

          // check if temperature and condition exists
          if(!temp || !condition)
              return res.status(400).json({ message: "Weather info not found" });

          const hello = "Hello " + city +
              "! Current temperature is " + temp +
              " degree, and weather condition is " + condition + "!";
          return res.status(200).json({ message: hello });

        } catch(e) {
          console.log('catch is called')
          return res.status(500).json({ message: "Something went wrong" });
        }
    });
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
