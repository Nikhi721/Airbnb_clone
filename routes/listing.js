const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema} = require("../schema.js");
// const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage}= require("../cloudConfig.js");
// const upload = multer({dest:"uploads/"});
const upload = multer({ storage });

// index route or create route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing,upload.single('listing[image]'),wrapAsync( listingController.createListing)
// .post( upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file)
// }
);

// new route
router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm));

// show route,update route and delete route 
router.route("/:id")
.get(wrapAsync( listingController.showLisitng))
.put(validateListing,isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync( listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync( listingController.destroyListing));

// edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync( listingController.renderEditForm));



// const validateListing = (req,res,next)=>{
//    let {error} =listingSchema.validate(req.body);
//    if(error){
//     let errMsg = error.details.map((el)=> el.message).join(",");
//     throw new ExpressError(400,errMsg);
//    }else{
//     next();
//    }
// }

// index route
// router.get("/",wrapAsync(
//    listingController.index
// //    async(req,res)=>{
// //    const allListings= await Listing.find({});
// //   res.render("listings/index.ejs",{allListings});
// //     }
//    ));

// new route
// router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm
// //    async(req,res)=>{
// //    // if(!req.isAuthenticated()){
// //    //    req.flash("error","you must be logged in to create listing!");
// //    //    return res.redirect("/login");
// //    // }
// //    res.render("listings/new.ejs")
// // }
// ));

// show Route
// router.get("/:id",wrapAsync( listingController.showLisitng
// //    async(req,res)=>{
// //     let {id} =req.params;
// //     const  listing = await Listing.findById(id).populate({path:"reviews",
// //       populate:{
// //          path:"author"
// //       }
// //     }).populate("owner");
// //     if(!listing){
// //        req.flash("error","Listing you request that does'nt exists");
// //        return res.redirect("/listings");
// //     }
// //    //  console.log(listing);
// //     res.render("listings/show.ejs",{listing})
// // }
// ));

// //create route
// router.post("/",validateListing,isLoggedIn,wrapAsync( listingController.createListing
//    // async(req,res,next)=>{
//    // const newListing = new Listing(req.body.listing);
//    // newListing.owner = req.user._id;
//    // await newListing.save();
//    // req.flash("success","New Listing Created")
//    // res.redirect("/listings")
  
// // }
// ));

// // edit route
// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync( listingController.renderEditForm
// //    async(req,res)=>{
// //    let {id} =req.params;
// //     const  listing = await Listing.findById(id);
// //     if(!listing){
// //        req.flash("error","Listing you request that does'nt exists");
// //        return res.redirect("/listings");
// //     }
// //     req.flash("success","Edit Listing Successfully")
// //     res.render("listings/edit.ejs",{listing})
// // }
// ));

//Update route
// router.put("/:id",validateListing,isLoggedIn,isOwner,wrapAsync( listingController.updateListing
// //    async(req,res)=>{
// //     let {id}=req.params;
// //    //  let listing =   await Listing.findById(id);
// //    //  if(!listing.owner_id.equals(res.locals.currUser._id)){
// //    //    req.flash("error","You don't have permission to edit");
// //    //     return res.redirect(`/listings/${id}`);
// //    //  }
// //     await Listing.findByIdAndUpdate(id,{...req.body.listing});
// //     req.flash("success","Edit Listing Successfully")
// //     res.redirect(`/listings/${id}`);
// // }

// ));


//Delete route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync( listingController.destroyListing
// //    async(req,res)=>{
// //      let {id}=req.params;
// //      let deletedListing = await Listing.findByIdAndDelete(id);
// //      console.log(deletedListing);
// //      req.flash("success","Delete Listing Successfully")
// //      res.redirect("/listings");
// // }
// ));

module.exports = router;