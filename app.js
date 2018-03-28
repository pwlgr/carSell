const   express     = require('express'),
        parser      = require('body-parser'), //lets us extract 'body' elements from templates
        sanitizier  = require('express-sanitizer'), //middleware for caja-html-sanitizer
        override    = require('method-override'),
        mongoose    = require('mongoose'),
        app         = express();


// var options ={
//     useMongoClient: true
// };

mongoose.Promise = global.Promise;
mongoose.Connect = global.Connect;

// ------------APP CONFIG---------------

// mongoose.connect("mongodb://localhost/car")  // mongoose connect
mongoose.connect("mongodb://admin:admin@ds123799.mlab.com:23799/carsell")  // mongoose connect

app.use(parser.urlencoded({extended:true}));
app.use(sanitizier());
app.set('view engine', 'ejs') // so there is no need to write .ejs in template extension
app.use(express.static("public"));
app.use(override("_method"))//changes the method to whatever we want using this patter, html only accepts get and put


//-------------MONGOOSE MODEL CONFIG---------------

let carSchema = new mongoose.Schema({
    make:String,
    model:String,
    year:Number,
    description: String,
    image:String,
    price:Number,
    // carType:String,
    made: {type:Date, default: Date.now}

})

let Car = mongoose.model("Car", carSchema ) //compiles into model


//--------------RESTful ROUTES-----------------

app.get("/", (req,res) => {
    // res.redirect("/cars")
    res.redirect("/cars")
})


//NEW ROUTE 

app.get("/cars/new", (req,res) => {
    res.render("new")
})

//INDEX ROUTE

app.get("/cars", (req,res) => {
    Car.find({}, (err, foundCars) => { //view all cars
        if(err){
            console.log(err)
        }
        else {
            res.render("index", {cars: foundCars})// es6 syntax cars = (cars:cars)
        }
    })
})

//CREATE ROUTE

app.post("/cars", (req,res) => {
    //create offer
    req.body.car.body = req.sanitize(req.body.car.body)// first body comes from the form, second from car[body]
    Car.create(req.body.car, (err, newCar) => {
        if(err){
            res.render("new")
        }
        else{
            res.redirect("/cars")
        }
    })
})


//SHOW ROUTE

app.get("/cars/show/:id", (req,res) => {
    Car.findById(req.params.id, (err, foundCar) => {
        if(err){
            res.redirect("/cars")
        }
        else{
            res.render("show", {car:foundCar})
        }
    })
})

//EDIT ROUTE

app.get("/cars/show/:id/edit", (req,res) => {
    Car.findById(req.params.id, (err,foundCar) => {
        if(err){
            res.redirect("/cars")
        }
        else {
            res.render("edit", {car:foundCar})
        }
    })
})

//UPDATE ROUTE

app.put("/cars/show/:id", (req,res) => {
    req.body.car.body = req.sanitize(req.body.car.body)
    Car.findByIdAndUpdate(req.params.id, req.body.car, (err, updatedCar) => { // comes from form in edit.ejs
        if(err){
            res.redirect("/cars")
        }
        else{
            res.redirect("/cars/show/" + req.params.id)
        }
    })
})

//DELETE ROUTE

app.delete("/cars/:id", (req,res) => {
    Car.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/cars")
        }
        else{
            res.redirect("/cars")
        }
    })
})

app.listen(3001, 'localhost', () => {
    console.log("sellCar app is running")
})


