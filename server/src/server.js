//src/server.js
const express = require('express');
const cors = require('cors');
var session = require('express-session'); // Import express-session
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const path = require('path');
const uploadMiddleware = require('./middleware/uploadMiddleware');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const http = require('http');
const https = require('https');
const fs = require('fs');

let cookieParser = require('cookie-parser');
app.use(cookieParser());

console.log(process.env.ADMIN_URI);
const corsOptions = {
  origin: true, // Replace with your frontend URL
  credentials: true, // Enable credentials (cookies)
};
app.use(cors(corsOptions));
 
const sess = {
  secret: 'your-secret-key',//process.env.SESSION_SECRET, // Store secret key in environment variable
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration
    sameSite: 'lax', // Use lax sameSite policy
  },
}; 
// Configure trust proxy and secure cookies for production environment
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true
}

app.use(session(sess))
app.use(bodyParser.json());
app.use(uploadMiddleware);

// Use routes
app.use(routes);

// app.use('/uploads', cors(corsOptions), express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

let server;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  // Read SSL certificate and private key files
  const options = {
    key: fs.readFileSync(process.env.PRIVATE_KEY_PATH), // Read private key path from environment variable
    cert: fs.readFileSync(process.env.CERTIFICATE_PATH) // Read certificate path from environment variable
  };

  // Create HTTPS server with provided options
  server = https.createServer(options, app);
//  server.use(cors(corsOptions)); // Assuming `corsOptions` is properly defined

} else {
  // Create HTTP server
  server = http.createServer(app);
}

server.listen(PORT, () => {
  console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });