//Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//Set up the port
var PORT = process.env.PORT || 3000;

//initiate the Express Router
var app = express();

//Set up the Express Router
var router = express.Router();

//Designate the public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to the Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser in the app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Have each request go through the router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise us the localhost database
var db = process.env.MONGOD_URI  || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to the database
mongoose.connect(db, function(error) {
    // Log any errors with the mongoose connection
    if (error) {
        console.log(error);
    }
    // Or log a success
    else {
        console.log("mongoose connection is successful");
    }
});

// Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});