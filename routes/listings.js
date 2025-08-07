const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateCreateListing, validateEditListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });




router.route("/")
.get( wrapAsync(listingController.index))     //Index Route
.post( isLoggedIn, upload.single('listing[image][url]'),validateCreateListing,  wrapAsync(listingController.createListing));   //Create route


//New Route
router.get("/new", isLoggedIn , listingController.renderNewForm);





router.route("/search")
.get(listingController.searchByCountry); //Search route

router.route("/:id")
.get(listingController.showListing)      //Show route
.put(isLoggedIn, isOwner, upload.single('listing[image][url]'), validateEditListing, wrapAsync(listingController.updateListing))    //Update route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));     //Delete route


//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


//Booking Route
router.get('/:id/booking', isLoggedIn, wrapAsync(listingController.renderBookingForm));

// router.post('/booking', (req, res) => {
//   const { checkin, checkout, guests } = req.body;
//   console.log('Booking received:', { checkin, checkout, guests });
//   res.send('Booking confirmed!'); // or redirect to confirmation page
// });







module.exports = router;
