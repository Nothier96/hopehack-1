const fetch = require("node-fetch");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// const path = require("path");

app.use(express.static("public"));
// app.use(express.static(path.resolve(__dirname, "public")));
app.use("/css", express.static(__dirname + "public/css"));

//template engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

// seting up routes
const courseRouter = require("./src/routes/courses");
app.use("/", courseRouter);

// app.get("/", (req, res) => {
//   res.sendFile("index.html", { root: __dirname });
// });

// app.get("/contact", (req, res) => {
//   res.sendFile("contact.html", { root: __dirname });
// });
// app.get("/third/api", (req, res) => {
//   res.render("thirdparty.ejs", (results) => {
//     const client_id = "oobVGja6bsRkU5qU1PWjcMnjEK0nIMfgBttT0V8V";
//     const client_secret =
//       "n8MLcxcTb4xS0cbKE4stYVWeawQ2u6oVxeHZDAD21PGFXfM8SqtD59PSHMomab9n233p5B0MrkLeGAjK9xMz7YqJoeQKrxRqHNxecbmyqvnPugnemfwQr4yKF0RmNw7L";
//     const client = Buffer.from(`${client_id}:${client_secret}`).toString(
//       "base64"
//     );
//     async function fetchCourse() {
//       try {
//         const response = await fetch(
//           "https://redventures.udemy.com/api-2.0/courses/?duration=medium&ordering=most-reviewed&page=2&page_size=12&price=price-paid&search=javascript",
//           {
//             headers: {
//               Authorization: `Basic ${client}`,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   });
// });
// app.get("/third", (req, res) => {
//   res.render("thirdparty.ejs");
// });
// const client_id = "oobVGja6bsRkU5qU1PWjcMnjEK0nIMfgBttT0V8V";
// const client_secret =
//   "n8MLcxcTb4xS0cbKE4stYVWeawQ2u6oVxeHZDAD21PGFXfM8SqtD59PSHMomab9n233p5B0MrkLeGAjK9xMz7YqJoeQKrxRqHNxecbmyqvnPugnemfwQr4yKF0RmNw7L";
// const client = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
// let duration = "medium",
//   ordering = "relevance",
//   pricing = "price-paid",
//   course = "javascript";
// fetch(
//   `https://www.udemy.com/api-2.0/courses/?duration=${duration}&ordering=${ordering}&page=2&page_size=12&price=${pricing}&search=${course}`,
//   {
//     headers: {
//       Authorization: `Basic ${client}`,
//     },
//   }
// )
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => {
//     console.log(err);
//   });
// let api_url = `https://www.udemy.com/api-2.0/courses/?duration=${duration}&ordering=${ordering}&page=2&page_size=12&price=${pricing}&search=${course}`;
// async function getcourse() {
//   const response = await fetch(api_url, {
//     headers: {
//       Authorization: `Basic ${client}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   const data = await response.json();
//   console.log(data);
// }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// console.log(client);
