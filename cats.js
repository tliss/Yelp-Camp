var mongoose = require("mongoose");

var uri = "mongodb://104.131.74.25:27017/cat_app";
//var uri = "mongodb://ian:secretPassword@104.131.74.25:27017/cool_db";

var options = {
    useMongoClient: true,
};

mongoose.connect(uri, options, function(err){
    if (err) {
        throw err;
    }
});
mongoose.Promise = global.Promise;

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// Amodel is an object that gives you easy access to a collection
// mongoose.model returns a new object with a whole bunch of new methods like create()
var Cat = mongoose.model("Cat", catSchema);  //"Cat" is the singular version of our collection name | catSchema is is used to validate any documents we save to that collection

//add a new cat to the DB

Cat.create({
   name: "Snow White",
   age: 15,
   temerament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });
//
// george.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG!");
//     } else {
//         console.log("WE JUST SAVED A CAT TO THE DB:\n");
//         console.log(cat);
//     }
// });

//retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err);
    } else {
        console.log("ALL THE CATS....\n");
        console.log(cats);
    }
});