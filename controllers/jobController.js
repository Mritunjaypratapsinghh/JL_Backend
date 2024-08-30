const Job = require("../models/job.model");

exports.postJob = async (req, res) => {
  const {
    jobTitle,
    jobDescription,
    jobSkills,
    jobCategories,
    payScaleMin,
    payScaleMax,
  } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role; // Assuming the user's role is stored in req.user.role

  // //   Allow both recruiters and admins to post jobs
  //   if (userRole !== "recruiter" && userRole !== "admin") {
  //     return res
  //       .status(403)
  //       .json({ message: "You do not have permission to post a job." });
  //   }

  try {
    const job = new Job({
      jobTitle,
      jobDescription,
      jobSkills,
      jobCategories, // Assuming this is an array of ObjectId strings
      company: req.body.company, // Ensure the company field is provided
      payScaleMin,
      payScaleMax,
      applications: [], // Initialize as empty array if needed
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { location, jobType, minSalary, maxSalary } = req.query;
    let filter = {};

    if (location) filter.location = location;
    if (jobType) filter.jobType = jobType;
    if (minSalary && maxSalary)
      filter.payScaleMin = { $gte: parseFloat(minSalary) };
    if (maxSalary) filter.payScaleMax = { $lte: parseFloat(maxSalary) };

    const jobs = await Job.find(filter)
      .populate("company")
      .populate("jobCategories");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving jobs", error });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    console.error("Error retrieving job:", error); // Log the error details
    res.status(500).json({ message: "Error retrieving job", error });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};
