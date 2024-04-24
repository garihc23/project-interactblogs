const { Advertisement } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

// Controller function for creating a new advertisement
const createAdvertisement = async (req, res) => {
  try {
    const { title, description, targetUrl, startDate, endDate, width, height, isActive, adType } = req.body;

    const adImage = req.file ? req.file.filename : null;
    // console.log("adIMAG-COntroll",adImage,req);
    const newAdvertisement = await Advertisement.create({
      advertisementId: uuidv4(),
      title,
      description,
      targetUrl,
      startDate,
      endDate,
      width,
      height,
      isActive,
      adType,
      adImage,
    });

    return res.status(201).json(newAdvertisement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for fetching all advertisements with optional search query
const getAllAdvertisements = async (req, res) => {
  try {
    // Extract the search query from the request query parameters
    const { title } = req.query;
    
    // Define a condition object to filter advertisements based on search criteria
    const condition = title ? {title: { [Op.like]: `%${title}%` }} : {};
    console.log("CONDITO",condition)
    // Fetch advertisements from the database based on the condition
    const advertisements = await Advertisement.findAll({ where: condition });
    // console.log(advertisements);
    return res.status(200).json(advertisements);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for getting an advertisement by advertisementId
const getAdvertisementById = async (req, res) => {
  try {
    const { advertisementId } = req.params;
    console.log("adID",advertisementId)
    // Use the middleware to increment views
    // await incrementViewsMiddleware(req, res);

    // Retrieve the advertisement by advertisementId
    const advertisement = await Advertisement.findOne({ where: { advertisementId } });

    if (!advertisement) {
      return res.status(404).json({ error: 'Advertisement not found' });
    }

    return res.status(200).json(advertisement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for updating an advertisement by advertisementId
const updateAdvertisement = async (req, res) => {
  try {
    console.log(req)
    const { advertisementId } = req.params;
    console.log("FROMUPCONT", advertisementId)
    const { title, description, adImage, targetUrl, startDate, endDate, width, height, isActive, adType } = req.body;

    const existingAd = await Advertisement.findOne({ where: { advertisementId } });

    if (!existingAd) {
      return res.status(404).json({ error: 'Advertisement not found' });
    }

    // Update the advertisement
    await existingAd.update({
      title,
      description,
      adImage,
      targetUrl,
      startDate,
      endDate,
      width,
      height,
      adType,
      isActive,
    });

    // Get the updated advertisement
    const updatedAdvertisement = await Advertisement.findOne({ where: { advertisementId } });
    return res.status(200).json(updatedAdvertisement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for archiving an advertisement by advertisementId
const archiveAdvertisement = async (req, res) => {
  try {
    const { advertisementId } = req.params;

    const advertisement = await Advertisement.findOne({ where: { advertisementId } });

    if (!advertisement) {
      return res.status(404).json({ error: 'Advertisement not found' });
    }

    // Set isActive to false to archive the advertisement
    await advertisement.update({ isActive: false });

    return res.status(200).json({ message: 'Advertisement archived successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete the ad
const deleteAdvertisement = async (req, res) => {
  try {
    const { advertisementId } = req.params;
    const existingAd = await Advertisement.findOne({ where: { advertisementId } });

    if (!existingAd) {
      return res.status(404).json({ error: 'Advertisement not found' });
    }

    // Delete the ad
    await existingAd.destroy();
    return res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error('Error deleting ad:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Middleware to increment views for an advertisement by advertisementId
const incrementViewsMiddleware = async (req, res, next) => {
  try {
    const { advertisementId } = req.params;
    const advertisement = await Advertisement.findOne({ where: { advertisementId } });

    if (advertisement) {
      // Increment views
      await advertisement.increment('views');
    }

    next();
  } catch (error) {
    console.error(error);
    next();
  }
};


// Middleware to increment clicks for an advertisement by advertisementId
const incrementClicksMiddleware = async (req, res, next) => {
  try {
    const { advertisementId } = req.params;
    const advertisement = await Advertisement.findOne({ where: { advertisementId } });

    if (advertisement) {
      // Increment clicks
      await advertisement.increment('clicks');
    }

    next();
  } catch (error) {
    console.error(error);
    next();
  }
};

module.exports = {
  createAdvertisement,
  getAllAdvertisements,
  getAdvertisementById,
  updateAdvertisement,
  archiveAdvertisement,
  deleteAdvertisement,
  incrementViewsMiddleware,
  incrementClicksMiddleware,
  // Add more exported functions as needed
};
