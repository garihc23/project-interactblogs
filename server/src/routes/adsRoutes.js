// src/routes/adsRoutes.js
const express = require('express');
const {
    createAdvertisement,
    getAllAdvertisements,
    getAdvertisementById,
    updateAdvertisement,
    archiveAdvertisement,
    deleteAdvertisement,
    incrementClicksMiddleware,
    incrementViewsMiddleware

} = require('../controllers/adsController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');
const upploadMiddleware= require('../middleware/uploadMiddleware');


const router = express.Router();

// Endpoint for creating a new advertisement
router.post('/ads', authenticateUser, authorizeAdmin, createAdvertisement);

// Endpoint for fetching all advertisements
router.get('/ads', getAllAdvertisements);

// Endpoint for getting an advertisement by advertisementId
router.get('/ads/:advertisementId', getAdvertisementById);

// Endpoint for updating an advertisement
router.patch('/ads/:advertisementId', authenticateUser, authorizeAdmin, updateAdvertisement);

//Endpoint for deleting an advertisement
router.delete('/ads/:advertisementId', authenticateUser, authorizeAdmin, deleteAdvertisement);

// Endpoint for archiving an advertisement
router.put('/ads/archive/:advertisementId', authenticateUser, authorizeAdmin, archiveAdvertisement);

// Endpoint for clicking an advertisement by advertisementId
router.post('/ads/:advertisementId/click', incrementClicksMiddleware, getAdvertisementById);

// Add more routes as needed

module.exports = router;
