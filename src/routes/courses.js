const express = require("express");
const courseRouter = express.Router();
const axios = require("axios");

courseRouter.get("", async (req, res) => {
  try {
    let duration = "medium",
      review = "most-reviewed",
      pricing = " ",
      course = " React";
    const client_id = "oobVGja6bsRkU5qU1PWjcMnjEK0nIMfgBttT0V8V";
    const client_secret =
      "n8MLcxcTb4xS0cbKE4stYVWeawQ2u6oVxeHZDAD21PGFXfM8SqtD59PSHMomab9n233p5B0MrkLeGAjK9xMz7YqJoeQKrxRqHNxecbmyqvnPugnemfwQr4yKF0RmNw7L";
    const client = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );
    const courseApi = await axios.get(
      `https://www.udemy.com/api-2.0/courses/?duration=${duration}&ordering=${review}&page=2&page_size=12&price=${pricing}&search=${course}`,
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
});

module.exports = courseRouter;
