const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const courseRouter = express.Router();
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
courseRouter.post("/", async (req, res) => {
  //   console.log(req.body);
  //   let duration = req.body.duration,
  //     order = req.body.order,
  //     pricing = req.body,
  //     course = req.body.course;
  try {
    let duration = req.body.duration,
      order = req.body.order,
      pricing = req.body,
      course = req.body.course;
    const client_id = "oobVGja6bsRkU5qU1PWjcMnjEK0nIMfgBttT0V8V";
    const client_secret =
      "n8MLcxcTb4xS0cbKE4stYVWeawQ2u6oVxeHZDAD21PGFXfM8SqtD59PSHMomab9n233p5B0MrkLeGAjK9xMz7YqJoeQKrxRqHNxecbmyqvnPugnemfwQr4yKF0RmNw7L";
    const client = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );
    const courseApi = await axios.get(
      `https://www.udemy.com/api-2.0/courses/?duration=${duration}&ordering=${order}&page=2&page_size=12&price=${pricing}&search=${course}`,
      {
        headers: {
          Authorization: `Basic ${client}`,
        },
      }
    );
    // console.log(courseApi.data);
    res.render("courses", { courseDetail: courseApi.data.results });
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log("Error", err.message);
    }
  }
  //   console.log(duration, order, pricing, course);
});
// courseRouter.get("", async (req, res) => {
//   try {
//     let duration = " ",
//       review = " ",
//       pricing = " ",
//       course = " Javascript ";
//     const client_id = "oobVGja6bsRkU5qU1PWjcMnjEK0nIMfgBttT0V8V";
//     const client_secret =
//       "n8MLcxcTb4xS0cbKE4stYVWeawQ2u6oVxeHZDAD21PGFXfM8SqtD59PSHMomab9n233p5B0MrkLeGAjK9xMz7YqJoeQKrxRqHNxecbmyqvnPugnemfwQr4yKF0RmNw7L";
//     const client = Buffer.from(`${client_id}:${client_secret}`).toString(
//       "base64"
//     );
//     const courseApi = await axios.get(
//       `https://www.udemy.com/api-2.0/courses/?duration=medium&language=fr&ordering=relevance&page=2&page_size=12&price=price-paid&search=react`,
//       {
//         headers: {
//           Authorization: `Basic ${client}`,
//         },
//       }
//     );
//     // console.log(courseApi.data);
//     res.render("courses", { courseDetail: courseApi.data.results });
//   } catch (err) {
//     if (err.response) {
//       console.log(err.response.data);
//       console.log(err.response.status);
//       console.log(err.response.headers);
//     } else if (err.request) {
//       console.log(err.request);
//     } else {
//       console.log("Error", err.message);
//     }
//   }
// });
courseRouter.get("/third", (req, res) => {
  res.render("thirdparty");
});
courseRouter.get("/", (req, res) => {
  res.render("thirdparty");
});
// courseRouter.post("/", (req, res) => {
//   console.log(req.body);
// });
var info = [
  {
    name: "Thierno",
  },
];
courseRouter.get("/form", (req, res) => {
  res.render("form");
});

module.exports = courseRouter;
