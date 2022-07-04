const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
// using body parser to get user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//template engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

// seting up routes
const courseRouter = require("./src/routes/courses");
app.use("/", courseRouter);
// launching the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

