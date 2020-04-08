const express = require("express");
const app = express();
app.set("trust proxy", true);

const requestTime = (req, res, next) => {
  req.startTime = Date.now();
  next();
};

const responseTime = (req, res, next) => {
  res.endTime = Date.now();
  next();
};

const clientIP = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(`Requested from: ${ip}`);
  next();
};

app.use([requestTime, responseTime, clientIP]);

app.get("/", (req, res) => {
  const timeDuration = res.endTime - req.startTime;
  console.log(timeDuration);
  var responseText = "Hello World!<br>";
  responseText += `<small>Request finished in: ${timeDuration}.</small> </br>`;
  res.send(responseText);
});

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${3000}`)
);
