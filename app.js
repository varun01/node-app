const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const http = require("http");
const port = process.env.PORT || 8085;

//Middle ware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post("/register", (req, res) => {
  const data = JSON.stringify(req.body);
  let dataFromApi = "";
  const options = {
    host: "localhost",
    port: 9090,
    path: "/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
  const request = http.request(options, (resp) => {
    resp.on("data", (chunk) => {
      dataFromApi += chunk;
      res.status(200).send(dataFromApi);
    });
  });
  request.write(data);
  request.end();
});

app.get("/getAllUsers", (req, res) => {
  let dataFromApi = "";
  http.get("http://localhost:9090/getAllUsers", (resp) => {
    resp.on("data", (chunk) => {
        dataFromApi += chunk;
        res.status(200).send(dataFromApi);
      });
  });
});

app.get("/findUser/:name", (req, res) => {
  const name = req.params.name;
  let dataFromApi = "";
  const url = "http://localhost:9090/findUser"+name;
  http.get(url, (resp) => {
    resp.on("data", (chunk) => {
      dataFromApi += chunk;
      res.status(200).send(dataFromApi);
    });
  });
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
