const Review= require("../models/review.js");
const Listing = require("../models/listing.js");

//post Review Route
module.exports.createReview = async(req,res)=>{
let listing = await Listing.findById(req.params.id);
 let newReview = new Review(req.body.review);
 newReview.author = req.user._id;
 listing.reviews.push(newReview);
 await newReview.save();
 await listing.save();
req.flash("success","create review Successfully");
 res.redirect(`/listings/${listing._id}`);
}

// delete review route 
module.exports.destroyReview =  async(req,res)=>{
        let {id,reviewId} = req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}} )
        await Review.findByIdAndDelete(reviewId);
        req.flash("success","Delete review Successfully")
        res.redirect(`/listings/${id}`)
    }