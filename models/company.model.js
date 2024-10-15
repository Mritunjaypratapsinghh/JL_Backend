const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const companySchema = new mongoose.Schema({
    companyId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    companyName: {
        type: String,
        required: true,
        unique: true,
    },
    companyDescription: {
        type: String,
    },
    companyWebsite: {
        type: String,
    },
    companyLogo: {
        type: String,
    },
    companyCoverPage: {
        type: String,
    },
    companyAddresses: [
        {
            type: String,
            required: true
        }
    ],
    employessWorking: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    jobsVacant: [
        {
            type: String,
            ref: 'Job'
        }
    ]
}, { timestamps: true }); // Add timestamps if needed

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
