import Job from "../models/Job.js";

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findOne({ id: req.params.id });
    if (!job) {
      return res.status(404).json({ message: "Job opening not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const newJob = new Job(req.body);
    // Generate a simple id slug if not provided
    if (!newJob.id) {
      newJob.id = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    await newJob.save();
    res.status(201).json({ message: "Job opening created successfully", job: newJob });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Job with this slug/id already exists." });
    }
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job opening not found" });
    }
    res.status(200).json({ message: "Job opening updated successfully", job });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    let job = await Job.findOneAndDelete({ id });
    if (!job && id.match(/^[0-9a-fA-F]{24}$/)) {
      job = await Job.findByIdAndDelete(id);
    }
    if (!job) {
      return res.status(404).json({ message: "Job opening not found" });
    }
    res.status(200).json({ message: "Job opening deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const bulkDeleteJobs = async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid job IDs" });
    }
    await Job.deleteMany({ $or: [{ _id: { $in: ids } }, { id: { $in: ids } }] });
    res.status(200).json({ message: "Job openings deleted successfully" });
  } catch (error) {
    next(error);
  }
};
