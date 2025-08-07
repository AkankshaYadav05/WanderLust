const User = require("../models/user");
const Listing = require("../models/listing");


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs", { showFooter: false });
}

module.exports.signup = async(req,res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        });
        
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs" , { showFooter: false });
};


module.exports.login = async (req,res) => {
    req.flash("success", "Welcome back to WanderLust! ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    
};


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    });
};


module.exports.renderProfile = async (req, res) => {
    try {
        const user = req.user;

        // Optional: fetch listings by this user
        const userListings = await Listing.find({ owner: user._id });

        res.render("users/profile", { user, userListings });
    } catch (err) {
        console.error("Error loading profile:", err);
        req.flash("error", "Unable to load profile.");
        res.redirect("/");
    }
};
