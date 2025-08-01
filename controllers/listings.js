const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});

};


module.exports.renderNewForm = (req,res) => {
    res.render("./listings/new.ejs");
};


module.exports.showListing = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate( {
        path: "reviews", 
        populate: { 
            path: "author",
            select: "username avatar",
        },
       })
        .populate("owner");

    if(!listing) {
        req.flash("error", "Listing you requested for doesn't exist!");
        res.redirect("/listings");
    } else{
        res.render("./listings/show.ejs", { listing });
    }
};


module.exports.createListing = async(req,res,next) => {
  let response = await geoCodingClient
    .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
    .send()
  
    
    let url = req.file.path;
    let filename = req.file.filename;
    let listingData = req.body.listing;

    if (typeof listingData.facilities === "string") {
        listingData.facilities = listingData.facilities.split(",").map(f => f.trim());
    }

    const newListing = new Listing(listingData);

    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New listing created!");
    res.redirect("/listings");
};



module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for doesn't exist!");
        res.redirect("/listings");
    } else{
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/uploads", "uploads/h_300,w_250");
        res.render("./listings/edit.ejs", {listing, originalImageUrl});
    }
};


module.exports.updateListing = async (req,res) => {
    let  { id } = req.params;    
    let updatedData = req.body.listing;

    if (typeof updatedData.facilities === "string") {
        updatedData.facilities = updatedData.facilities.split(",").map(f => f.trim());
    }

    let listing = await Listing.findByIdAndUpdate(id, updatedData);


    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};



module.exports.searchByCountry = async (req, res) => {
  const { country } = req.query;

  if (!country || country.trim() === '') {
    return res.redirect('/listings');
  }

  const listings = await Listing.find({
    country: { $regex: new RegExp(country, 'i') }
  });

  res.render('listings/index', { allListings: listings, country });
};


module.exports.index = async (req, res) => {
    const { category } = req.query;
    let filter = {};

    if (category) {
        filter.category = category;
    }

    const listings = await Listing.find(filter);
    res.render("listings/index", { allListings: listings, category }); 
};



