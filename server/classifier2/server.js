const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');

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

    // Call the Python script with the uploaded file
    const pythonScript = './script.py';
    const imagePath = path.join('./uploads', filename);
    const command = `python ${pythonScript} ${imagePath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        return res.status(500).json({ error: 'Image processing failed' });
      }

      
      // Parse the output from the Python script
      const output = JSON.parse(stdout);
      
      // Prepare the response data
      const responseData = {
        filename: filename,
        graphData: output.graphData,
        message: output.message
      };
      
      console.log("Eureka:", output.message)
      
      // Send the response back to the client
      res.json(responseData);
    });
  });

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
