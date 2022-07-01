const fetch = require("node-fetch");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const path = require("path");

app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("contact.html", { root: __dirname });
});
const client_id = "oobVGja6bsRkU5qU1PWjcMnjEK0nIMfgBttT0V8V";
const client_secret =
  "n8MLcxcTb4xS0cbKE4stYVWeawQ2u6oVxeHZDAD21PGFXfM8SqtD59PSHMomab9n233p5B0MrkLeGAjK9xMz7YqJoeQKrxRqHNxecbmyqvnPugnemfwQr4yKF0RmNw7L";
const client = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
fetch("https://www.udemy.com/api-2.0/courses/", {
  headers: {
    Authorization: `Basic ${client}`,
  },
})
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// console.log(client);
