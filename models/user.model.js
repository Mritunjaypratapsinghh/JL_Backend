const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    userId : {
        type : String,
        default : uuidv4,
        unique : true
    },
    userRole : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Role'
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required : true,
        unique: [true, "Email Already Exists"]
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    profile_picture: {
        type: String, // cloudnary
    },
    resume: {
        type: String, // cloudnary
    },
    skills: {
        type: Array,
    },
    dob: {
        type: Date,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    refreshToken: {
        type: String,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Job
        }
    ]

}, { _id: false, timestamps: true });

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        userId : this.userId,
        email : this.email,
        // userRole : this.userRole,
        fullName : this.fullName
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        userId : this.userId,
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}


const User = mongoose.model('User', userSchema);

module.exports = User;



