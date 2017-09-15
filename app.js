var express = require("express");
var app = express();
var myPort = 3000;



app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    var campgrounds = [
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg"},
        {name: "Granite Hill", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
        {name: "Mt. View", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"}
    ]
    res.render("campgrounds");
});

app.listen(myPort, function(){
    console.log("Server is listening on port " + myPort);
});