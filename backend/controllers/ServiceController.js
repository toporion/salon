const ServiceModel = require("../models/ServiceModel");

const addService = async (req, res) => {
    try {
        const serviceData = req.body;
        const image = req.file ? req.file.path : null;

        const newService = await ServiceModel(
            {
                ...serviceData,
                image,
                createdBy: req.user._id
            }
        )
        await newService.save()
        res.status(200).json({
            success: true,
            message: "Successfully create service",
            data: newService
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const getAllServices = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;

        let searchcriteria = {}

        if (search) {
            searchcriteria = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } }
                ]
            }
        }

        const allServices = await ServiceModel.find(searchcriteria)
            .populate('createdBy', 'name email')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalServices = await ServiceModel.countDocuments(searchcriteria);
        const totalPages = Math.ceil(totalServices / limit);

        res.status(200).json({
            success: true,
            message: "all services are loaded",
            data: {
                allServices,
                totalServices,
                totalPages,
                currentPage: page
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const serviceById = async (req, res) => {
    try {
        const { id } = req.params;

        const singleService = await ServiceModel.findById({ _id: id })
        if (!singleService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        res.status(200).json({
            success: true,
            message: "successfully by get service",
            data: singleService
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updateServices = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceData = req.body;

    if (req.file) {
      serviceData.image = req.file.path; // or your cloud path (e.g., cloudinary URL)
    }

    const updateData = await ServiceModel.findOneAndUpdate(
      { _id: id },
      { ...serviceData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteItem = await ServiceModel.deleteOne({ _id: id })

        res.status(200).json({
            succes: true,
            message: "sucessfully deleted item",
            data: deleteItem
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { addService, getAllServices, serviceById, updateServices, deleteService };