const multer = require('multer');
const path = require('path');
const cors = require('cors');

const determineFileCategory = (mimeType, url) => {
  if (mimeType.startsWith('image/') && url.startsWith('/api/posts')) {
    return 'blogPostImages';
  } else if (mimeType.startsWith('image/') && url.startsWith('/api/authors')) {
    return 'authorImages';
  } else if (mimeType.startsWith('image/') && url.startsWith('/api/ads')) {
    return 'adsImages';
  } else if (mimeType.startsWith('image/')) {
    return 'otherImages';
  } else if (mimeType.startsWith('application/pdf')) {
    return 'pdfFiles';
  } else {
    return 'otherFiles';
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileCategory = determineFileCategory(file.mimetype, req.url);
    const uploadDir = path.join(__dirname, '..', 'uploads', fileCategory);
    cb(null, uploadDir);
    // cb(null, `src/uploads/${fileCategory}`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 }, // 500 KB limit
  fileFilter: function (req, file, cb) {
    const allowedFormats = /\.(png|jpeg|jpg)$/i;
    if (allowedFormats.test(file.originalname)) {
      return cb(null, true);
    }
    cb(new Error('Invalid file format. Please choose a .png or .jpeg image.'));
  },
});

// Use a dynamic fieldname based on the URL
const uploadMiddleware = (req, res, next) => {
  let fieldname;
  if (req.url.startsWith('/api/posts')) {
    fieldname = 'headerImage';
  } else if (req.url.startsWith('/api/authors')) {
    fieldname = 'authorDP';
  } else if (req.url.startsWith('/api/ads')) {
    fieldname = 'adImage';
  } else {
    // return res.status(404).json({ error: 'Invalid URL for file upload' });
    fieldname='misc';
  }

  const uploadInstance = upload.single(fieldname);
  uploadInstance(req, res, function (err) {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(400).json({ error: 'Error uploading image' });
    }
      // Set CORS headers
      // res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URI);
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // If upload is successful, move to the next middleware or route handler
    next();
  });
};

module.exports = uploadMiddleware;
