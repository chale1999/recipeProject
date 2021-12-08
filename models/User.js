const crypto = require('crypto');
const mongoose = require("mongoose");
const bcrpyt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required : [true, "Please provide a First Name"]
    },
    lastName:{
        type:String,
        required : [true, "Please provide a Last Name"]
    },
    username:{
        type:String,
        required : [true, "Please provide a username"],
        min: 3, 
        max: 20,
        unique: true
    },
    email:{
        type:String,
        required: [true, "Please provide an email"],
        max:50,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    password:{
        type: String,
        required: [true, "Please choose a password"],
        minlength: 6,
        select : false
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
    verifyEmailToken: String,
    profilePicture:{
        type:String,
        default: ""
    },
    coverPicture:{
        type:String,
        default: ""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    bookmarks:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    desc:{
        type: String,
        max:50,
    },
 },
 {timestamps: true}
);

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrpyt.genSalt(10);
    this.password = await bcrpyt.hash(this.password, salt);
    next();
});



UserSchema.methods.matchPasswords = async function(password) {
    return await bcrpyt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({email: this.email,lastName: this.lastName,firstName: this.firstName ,username: this.username, id: this._id,}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};


UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 20 * (60 * 1000); // this token expires in 20 mins

    return resetToken;
}

UserSchema.methods.getEmailVerifyToken = function() {
    const verifyToken = crypto.randomBytes(20).toString("hex");

    this.verifyEmailToken = crypto.createHash("sha256").update(verifyToken).digest("hex");

    return verifyToken;
}

module.exports = mongoose.model("User", UserSchema);
