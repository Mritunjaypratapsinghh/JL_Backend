const mongoose = require("mongoose")
const {v4 : uuidv4} = require("uuid")

const categorySchema = new mongoose.Schema({
    categoryId : {
        type : String,
        default : uuidv4,
    },
    categoryName : {
        type: String,
        required : true,
        unique : [true,"Category Already Exists"]
    }
},{_id : false})

const Category = mongoose.model("Category",categorySchema)

module.exports = Category 