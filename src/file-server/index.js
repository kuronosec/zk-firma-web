// Import the required libraries
const express = require('express');
var cors = require('cors');

const app = express();
// Enable CORS for local test
app.use(cors({
    origin: 'http://localhost:8080'
  }));

// Allow to download files from the zk directory
app.use(express.static('./../zkproof'));

app.listen(8000, () => console.log('Serving at http://localhost:8000!'));
