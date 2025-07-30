const Listing = require("../models/listing.js");
const maptilerclient = require("@maptiler/client");
const mapToken = process.env.MAP_TOKEN;
maptilerclient.config.apiKey =mapToken;


// index route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// new route
module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new.ejs");
};

// show route
module.exports.showLisitng = async (req, res) => {
   let {id} =req.params;
    const  listing = await Listing.findById(id).populate({path:"reviews",
      populate:{
         path:"author"
      }
    }).populate("owner");
    if(!listing){
       req.flash("error","Listing you request that does'nt exists");
       return res.redirect("/listings");
    }
  res.render("listings/show.ejs", { listing });
};

// create route

module.exports.createListing = async (req, res, next) => {
  const response = await maptilerclient.geocoding.forward(req.body.listing.location);
  // console.log(result.features[0].geometry);
  
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry =   response.features[0].geometry;
  let savedLisiting =await newListing.save();
  console.log(savedLisiting)
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

// edit route
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you request that does'nt exists");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")
  req.flash("success", "Edit Listing Successfully");
  res.render("listings/edit.ejs", { listing ,originalImageUrl});
};

// update route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Edit Listing Successfully");
  res.redirect(`/listings/${id}`);
};

// delete route

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Delete Listing Successfully");
  res.redirect("/listings");
};
