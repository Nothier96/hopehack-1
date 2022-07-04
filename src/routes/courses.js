const express = require("express");
const bodyParser = require("body-parser");
const courseRouter = express.Router();
const axios = require("axios");

courseRouter.use(bodyParser.json());
courseRouter.use(bodyParser.urlencoded({ extended: true }));
courseRouter.get("/about", (req, res) => {
  res.render("about");
});
courseRouter.get("/", (req, res) => {
  res.render("index");
});
courseRouter.get("/contact", (req, res) => {
  res.render("contact");
});
courseRouter.get("/schools", (req, res) => {
  res.render("schools");
});
courseRouter.get("/third", (req, res) => {
  res.render("thirdparty");
});
courseRouter.post("/firstAPI", (req,res)=>{
  try{
   MongoClient.connect(connection,{ useUnifiedTopology: true })
   .then(client =>{
       console.log('Connected to Database');
       const db=client.db('schoolDB');
       const schoolData = db.collection('schools');
       let city = req.body.cityQuery
 let schoolType=req.body.schoolType
 var arrayNum=0; 
 
       schoolData.find().toArray()
       .then(result =>{
         console.log(req.body);
         console.log(result[0][city][schoolType]);
     })
       }); 
  } catch {}
 });

courseRouter.post("/", async (req, res) => {
  try {
    let duration = req.body.duration,
      order = req.body.order,
      pricing = req.body.price,
      course = req.body.course,
      language = req.body.language;
    const client_id = "oobVGja6bsRkU5qU1PWjcMnjEK0nIMfgBttT0V8V";
    const client_secret =
      "n8MLcxcTb4xS0cbKE4stYVWeawQ2u6oVxeHZDAD21PGFXfM8SqtD59PSHMomab9n233p5B0MrkLeGAjK9xMz7YqJoeQKrxRqHNxecbmyqvnPugnemfwQr4yKF0RmNw7L";
    const client = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );
    const courseApi = await axios.get(
      `https://www.udemy.com/api-2.0/courses/?duration=${duration}&ordering=${order}&page=2&page_size=12&price=${pricing}&search=${course}&language=${language}`,
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
      res.render("courses", { courseDetail: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      res.render("courses", { courseDetail: null });

      console.log(err.request);
    } else {
      res.render("courses", { courseDetail: null });
      console.log("Error", err.message);
    }
  }
});

courseRouter.get("/", (req, res) => {
  res.render("thirdparty");
});

courseRouter.get("/form", (req, res) => {
  res.render("form");
});

module.exports = courseRouter;
