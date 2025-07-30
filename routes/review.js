const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {reviewSchema} = require("../schema.js");
const Review= require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isReviewAuthor,validateReview} = require("../middleware.js");
const reviewController  = require("../controllers/review.js");

// const validateReview = (req,res,next)=>{
//    let {error} = reviewSchema.validate(req.body);
//    if(error){
//     let errMsg = error.details.map((el)=> el.message).join(",");
//     throw new ExpressError(400,errMsg);
//    }else{
//     next();
//    }
// }


//create review
router.post("/",isLoggedIn,validateReview,wrapAsync( reviewController.createReview
//     async(req,res)=>{
//   // console.log(req.params.id);
//  let listing = await Listing.findById(req.params.id);
//  let newReview = new Review(req.body.review);
//  newReview.author = req.user._id;
//  listing.reviews.push(newReview);
//  await newReview.save();
//  await listing.save();
// //  console.log(listing);
// req.flash("success","create review Successfully");
//  res.redirect(`/listings/${listing._id}`);
// }
));

// Delete Reviews Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
    wrapAsync( reviewController.destroyReview
    //     async(req,res)=>{
    //     let {id,reviewId} = req.params;
    //     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}} )
    //     await Review.findByIdAndDelete(reviewId);
    //     req.flash("success","Delete review Successfully")
    //     res.redirect(`/listings/${id}`)
    // }
));


module.exports = router;
