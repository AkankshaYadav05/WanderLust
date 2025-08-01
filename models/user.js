const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "/default-avatar.jpg" 
    }
});

userSchema.plugin(passportLocalMongoose);   
module.exports = mongoose.model("User", userSchema);