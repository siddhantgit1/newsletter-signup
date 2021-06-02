//jshint esversion: 6
const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const client = require("@mailchimp/mailchimp_marketing")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  console.log(firstName, lastName, email);

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  const run = async () => {
    try {
       const response = await client.lists.addListMember("63d3a63335", {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
           FNAME: subscribingUser.firstName,
           LNAME: subscribingUser.lastName
         }
       });
       console.log(response);
       res.sendFile(__dirname + "/success.html");
     } catch (err) {
       console.log(err.status);
       res.sendFile(__dirname + "/failure.html");
     }
   };

   run();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

client.setConfig({

  apiKey: "6a14ab0590d21039370e61258b67d578-us6",

  server: "us6",

});



app.listen(process.env.PORT ||3000, function(){
  console.log("Server is running on port 3000");
});


// const jsonData = JSON.stringify(data);
//
// const url = "https://$API_SERVER.api.mailchimp.com/3.0/lists/63d3a63335"


// apiKey
// 6a14ab0590d21039370e61258b67d578-us6

//list
//63d3a63335

//url of mailchimp
//"https://$API_SERVER.api.mailchimp.com/3.0/lists" \
