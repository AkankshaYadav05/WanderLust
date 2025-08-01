const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {
        type:Number,
        required:true,
    },
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    facilities: {
        type: [String],
        default: [],
    },
    geometry: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
        type: String,
        enum: ['beach', 'room', 'iconic-city', 'mountains', 'castles', 'amazing-pools', 'camping', 'forest', 'arctic', 'domes', 'boats'],
    }
    

});

// Post mongoose middleware
listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;