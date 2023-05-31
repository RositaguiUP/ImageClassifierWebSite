const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Enable CORS for all routes
app.use(cors());

// Endpoint to handle image upload
app.route('/upload')
  .post(upload.single('image'), (req, res) => {
    // Handle POST request for the '/upload' endpoint
    // Process the uploaded image and generate random data
    // Replace this logic with your own image processing and data generation code

    // Get the filename of the uploaded image
    const filename = req.file.filename;

    // Generate random data for the graph
    const graphData = Array.from({ length: 256 }, () => Math.random() * 0.8);

    // Prepare the response data
    const responseData = {
      filename: filename,
      graphData: graphData,
      message: "It's a ..."
    };

    // Send the response back to the client
    res.json(responseData);
  });

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
