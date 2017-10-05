var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var myPort = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg"},
    {name: "Granite Hill", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
    {name: "Mt. View", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"}
];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds",function (req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds"); //redirect defaults to a GET request
});

app.listen(myPort, function(){
    console.log("Server is listening on port " + myPort);
});