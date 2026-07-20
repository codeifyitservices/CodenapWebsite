import Service from "../models/Service.js";

export const getServices = async (req, res, next) => {
  try {
    let services = await Service.find().sort({ order: 1 });
    
    // Check if any service is missing the "order" field
    const missingOrder = services.some(s => s.order === undefined || s.order === null);
    
    if (missingOrder) {
      // Assign sequential orders based on current list order
      for (let i = 0; i < services.length; i++) {
        if (services[i].order === undefined || services[i].order === null) {
          services[i].order = i;
          await Service.updateOne({ _id: services[i]._id }, { $set: { order: i } });
        }
      }
      // Re-fetch sorted list
      services = await Service.find().sort({ order: 1 });
    }
    
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findOne({ id: req.params.id });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const maxService = await Service.findOne().sort({ order: -1 });
    const order = req.body.order !== undefined ? req.body.order : (maxService ? maxService.order + 1 : 0);
    const newService = new Service({ ...req.body, order });
    await newService.save();
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Service with this slug/id already exists." });
    }
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findOneAndDelete({ id: req.params.id });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateServicesOrder = async (req, res, next) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: "Invalid payload format. Expected an array of orders." });
    }
    
    const bulkOps = orders.map(({ id, order }) => ({
      updateOne: {
        filter: { id },
        update: { $set: { order } }
      }
    }));
    
    await Service.bulkWrite(bulkOps);
    res.status(200).json({ message: "Services order updated successfully" });
  } catch (error) {
    next(error);
  }
};
