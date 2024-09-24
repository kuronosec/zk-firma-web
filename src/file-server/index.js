const express = require('express');
const multer  = require('multer');
const os = require('os');
var cors = require('cors');

const upload = multer({ dest: os.tmpdir() });

const app = express();
// Enable CORS for all domains (or specify the React app's origin)
app.use(cors({
    origin: 'http://localhost:8080'
  }));
app.use(express.static('./../zkproof'));

app.post('/upload', upload.single('files'), function(req, res) {
    const title = req.body.title;
    const file = req.file;
  
    console.log(title);
    console.log(file);
  
    res.status(200).json({message: "Successfully Uploaded", status: 200})
  });

app.listen(8000, () => console.log('Serving at http://localhost:8000!'))
