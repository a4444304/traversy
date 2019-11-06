const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig(model)");
const Sequelize = require("sequelize");
// We are going to bring in the opt object
// so we can use the like operator.
const Op = Sequelize.Op;

// Get gig list
router.get("/", (req, res) => 
    Gig.findAll()
    .then(gigs => res.render("gigs", {
        gigs
    }))
    .catch(err => console.log(err)));

// Display add gig form
router.get("/add", (req, res) => res.render("add"));

// Add a gig,this is where we will submit our form and get a post request
router.post("/add", (req, res) => {
    // From the data we want to pull out title, technologies,budget, description,and contact_email.
let { title, technologies, budget,description, contact_email } = req.body;
// This data will be available in the body.

// Client side validation
let errors = [];
// Validate Fields
if(!title) {
    errors.push({ text: "Please add a title" });
}
if(!technologies) {
    errors.push({ text: "Please add some technologies" });
}
if(!description) {
    errors.push({ text: "Please add a description" });
}
if(!contact_email) {
    errors.push({ text: "Please add a contact email" });
}

// Check for errors
if(errors.length > 0) {
    res.render("add", {
        errors,
        title, 
        technologies,
        budget, 
        description, 
        contact_email
    });
} else {
    if(!budget) {
        budget = "Unknown";
    } else {
        budget = `$${budget}`;
    }
// This will make entries all lower case letters, and remove space after comma.
    technologies = technologies.toLowerCase().replace(/, /g, ",");
    // Insert into the table our model with the (.create) method.
    Gig.create({
        title,
        technologies,
        description,
        budget,
        contact_email
})
// This will return a promise with the (.then) method.
    .then(gig => res.redirect("/gigs"))
    .catch(err => console.log(err));
}
});

// Search for gigs
router.get("/search", (req, res) => {
    let { term } = req.query;
// To make lower case.
    term = term.toLowerCase();


// This is saying "anything" javascript "anything".
    Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    // This findAll will give us a promise back.
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => console.log(err));
});
    
module.exports = router;