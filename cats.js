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

var Cat = mongoose.model("Cat", catSchema);

//add a new cat to the DB

var george = new Cat({
    name: "George",
    age: 11,
    temperament: "Grouchy"
});

george.save(function(err, cat){
    if(err){
        console.log("SOMETHING WENT WRONG!");
    } else {
        console.log("WE JUST SAVED A CAT TO THE DB: ");
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log each one