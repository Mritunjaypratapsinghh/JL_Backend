const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const jobSchema = new mongoose.Schema({
    jobId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
    },
    jobSkills: {
        type: [String],
        required: true
    },
    jobCategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    payScaleMin: {
        type: Number,
        required: true
    },
    payScaleMax: {
        type: Number,
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });

jobSchema.plugin(aggregatePaginate);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
