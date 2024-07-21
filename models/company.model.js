const mongoose = require("mongoose")
const {v4 : uuidv4} = require("uuid")
const companySchema = new mongoose.Schema({
    companyId : {
        type : String,
        default : uuidv4,
        unique : true,
    },
    companyName : {
        type : String,
        required : true,
        unique : true,
    },
    companyDescription : {
        type : String,
    },
    companyWebsite : {
        type : String,
    },
    companyLogo : {
        type : String,
    },
    companyCoverPage : {
        type : String,
    },
    companyAddresses : [
        {
            type : String,
            required : true
        }
    ],
    employessWorking : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    jobsVacant : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Job'
        }
    ]
},{_id : false , timestamps : true})

const Company = mongoose.model("Comapny",companySchema)

module.exports = Company