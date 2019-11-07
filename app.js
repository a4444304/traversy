const express = require("express");
const expresshandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// Database
const db = require("./config/database");

// Test DB
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log("Error: " + err))

const app = express();

// Handlebars
app.engine("handlebars", expresshandlebars({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Index route, where we use the layout (landing.handlebars).
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// Gig routes
app.use("/gigs", require("./routes/gigs(routes)"));

// Load Edit Form, Brad I have no idea if this will work. 
// I am trying to make our edit button do something.
app.get("/views/add.handlebars", function(req, res){
    EditJobPost.findByClass(req. params. class, function(err, edit){
        res.render("edit_jobPost", {
            title:"edit title",
            edit:edit
        });
    });
});
// Update Submit POST Route
app.post("/views/edit.handlebars", function(req, res){
    let edit = new EditJobPost();
    edit.title = req.body.title;
    edit.technologies = req.body.technologies;
    edit.budget = req.body.budget;

    edit.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect("/");
        }
    });
});
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));