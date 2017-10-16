var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    myPort      = 3000,
    mongoose    = require("mongoose");

var uri = "mongodb://104.131.74.25:27017/yelp_camp";

var options = {
    useMongoClient: true,
};

mongoose.connect(uri, options, function(err){
    if (err) {
        throw err;
    }
});

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"
//     }, function(err, campground){
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
       if (err){
           console.log(err);
       } else {
           res.render("campgrounds", {campgrounds: allCampgrounds});
       }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds",function (req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};

    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds"); //redirect defaults to a GET request
        }
    })
});

app.listen(myPort, function(){
    console.log("Server is listening on port " + myPort);
});