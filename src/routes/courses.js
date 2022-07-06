const express = require("express");
const bodyParser = require("body-parser");
const courseRouter = express.Router();
const axios = require("axios");
const e = require("express");
const connection= 'mongodb+srv://taigatop:MuzvoMZhYmXLSgTH@cluster0.qat9t7x.mongodb.net/?retryWrites=true&w=majority'
const MongoClient=require('mongodb').MongoClient;

courseRouter.use(bodyParser.json());
courseRouter.use(bodyParser.urlencoded({ extended: true }));
courseRouter.get("/", (req, res) => {
  res.render("index");
});
courseRouter.get("/about", (req, res) => {
  res.render("about");
});
courseRouter.get("/courses", (req, res) => {
  res.render("courses");
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
      //  console.log('Connected to Database');
       const db=client.db('schoolDB');
       const schoolData = db.collection('schools');
       let city = req.body.cityQuery
      let schoolType=req.body.schoolType
      var arrayNum=0; 
 
       schoolData.find().toArray()
       .then(data =>{
        //  console.log(req.body);
         let result=data[0][city][schoolType];
        //  console.log(JSON.stringify(result));
         res.render("schoolsRender",{result});
     })
       }); 
  } catch {}
 });
 courseRouter.get("/calendar", (req,res)=>{
  try{
   MongoClient.connect(connection,{ useUnifiedTopology: true })
   .then(client =>{
      //  console.log('Connected to Database');
       const db=client.db('loginHOPE');
       const calendar = db.collection('calendar');

      calendar.find().toArray()
       .then(result=>{
        //  console.log(result);
        //  let result=data[0][city][schoolType];
        //  console.log(JSON.stringify(result));
        // if(resultPost.user==)
         res.render('calendar',{result});
     })
       }); 
  } catch {}
 });
 courseRouter.post("/calendarACC", (req,res)=>{
  try{
   MongoClient.connect(connection,{ useUnifiedTopology: true })
   .then(client =>{
      //  console.log('Connected to Database');
       const db=client.db('loginHOPE');
       const calendarAcc = db.collection('account');
       let acc = req.body.account;
      let pass=req.body.password;

      let accEntry= { user: `${acc}`, password:`${pass}`};
      calendarAcc.find().toArray()
       .then(resultPost=>{

         console.log(resultPost[0]);
        //  let result=data[0][city][schoolType];
        //  console.log(JSON.stringify(result));
        if(resultPost[0].user==accEntry.user && resultPost[0].password===accEntry.password){
         res.redirect('calendarAdmin');
        }
        else{
          res.redirect('calendar');
        }
        // else{
        // alert("Username and password not found");
        // }
     })
       }); 
  } catch (err) { res.redirect('calendar'); }
 });
 courseRouter.get("/calendarAdmin", (req,res)=>{
  try{
   MongoClient.connect(connection,{ useUnifiedTopology: true })
   .then(client =>{
      //  console.log('Connected to Database');
       const db=client.db('loginHOPE');
       const calendar = db.collection('calendar');

      calendar.find().toArray()
       .then(result=>{
         console.log(result);
        //  let result=data[0][city][schoolType];
        //  console.log(JSON.stringify(result));
        // if(resultPost.user==)
         res.render('calendarAdmin',{result});
     })
       }); 
  } catch {}
 });

 courseRouter.post("/calendarPOST", (req,res)=>{
  try{
   MongoClient.connect(connection,{ useUnifiedTopology: true })
   .then(client =>{
      //  console.log('Connected to Database');
       const db=client.db('loginHOPE');
       const thinkCalendar = db.collection('calendar');
       let event = req.body.eventName
      let eventDate=req.body.date;

      let dataEntry= { event: `${event}`, date:`${eventDate}`};
      thinkCalendar.insertOne(dataEntry)
       .then(resultPost=>{
        //  console.log(req.body);
        //  let result=data[0][city][schoolType];
        //  console.log(JSON.stringify(result));
         res.redirect('/calendarAdmin');
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
      if(language==="--"){
        language='';
      }
      else{
        language=`&language=${language}`
      }
      if(duration==="--"){
        duration='';
      }
      else{
        duration=`&duration=${duration}`
      }
      if(order==='--'){
        order='';
      }
      else{
        order=`&ordering=${order}`;
      }
      if(pricing==='--'){
        pricing='';
      }
      else{
        pricing=`&price=${pricing}`
      }

    const client_id = "oobVGja6bsRkU5qU1PWjcMnjEK0nIMfgBttT0V8V";
    const client_secret =
      "n8MLcxcTb4xS0cbKE4stYVWeawQ2u6oVxeHZDAD21PGFXfM8SqtD59PSHMomab9n233p5B0MrkLeGAjK9xMz7YqJoeQKrxRqHNxecbmyqvnPugnemfwQr4yKF0RmNw7L";
    const client = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );
    const courseApi = await axios.get(
      // `https://www.udemy.com/api-2.0/courses/?duration=${duration}&ordering=${order}&page=2&page_size=12&price=${pricing}&search=${course}&language=${language}`,
      // `https://www.udemy.com/api-2.0/courses/&search=${course}?duration=${duration}&ordering=${order}&page=2&page_size=12&price=${pricing}&language=${language}`,
      `https://www.udemy.com/api-2.0/courses/?search=${course}${duration}${order}${pricing}${language}`,
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
