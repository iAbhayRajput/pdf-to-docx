const express = require('express');
const multer = require('multer');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const winston = require('winston');

// Initialize Winston logger
const customTransport = new winston.transports.Console({
    level: 'info',
    format: winston.format.simple(),
});
const logger = winston.createLogger({
    transports: [customTransport],
});

// Create Express app
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

let progressData = {
    percent: 50,
    message: 'Converting...',
    complete: false
};

// Function to trigger action based on log message
function triggerAction(message) {
    if (message.includes('PDF converted to Docx successfully')) {
        progressData.percent = 100;
        progressData.message = 'Conversion complete';
        progressData.complete = true;

        // Render the progress page with the updated progressData
        console.log('Updating progress data:', progressData);
    }
}

// Call triggerAction function when a log event occurs
logger.on('logging', (transport, level, message) => {
    triggerAction(message);
});

// Function to send SSE messages
const sendEventStreamMessage = (res, data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
};

// Route to show the progress
app.get('/progress', (req, res) => {
    // Set up SSE headers
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    // Send initial progress data
    sendEventStreamMessage(res, progressData);
});

// Function to convert the file
function convertFile(pdfPath, originalname) {
    return new Promise((resolve, reject) => {
        try {
            // Your conversion logic goes here
            // For example, using PythonShell to convert the PDF file to DOCX
            const pyshell = new PythonShell('./Pdf-2-docx/pdf-2-docx.py', {
                mode: 'text',
                pythonPath: 'python',
                scriptPath: __dirname,
                args: [pdfPath, './']
            });

            pyshell.on('message', (msg) => {
                console.log(msg); // Log progress messages
                // Update progress data here
                progressData.percent = 50; // Example update
            });



            pyshell.on('error', (err) => {
                console.error(err);
                reject(err); // Reject the Promise on error
            });

            pyshell.end((err) => {
                if (err) {
                    reject(err); // Reject the Promise on error
                } else {
                    console.log('PDF converted to Docx successfully');
                    // Update progress data
                    progressData.percent = 100;
                    progressData.message = 'Conversion completed';
                    progressData.complete = true;
                    resolve(); // Resolve the Promise when conversion is complete
                }
            });
        } catch (err) {
            reject(err); // Reject the Promise on error
        }
    });
}
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/convert', upload.single('pdfFile'), async (req, res) => {
    try {
        // Start the conversion process
        req.session.filename = req.file.filename;
        req.session.path = req.file.path;
        req.session.originalname = req.file.originalname;

        // Render the progress page with the title
        res.render('progress', { progressData, title: 'PDF to DOCX Conversion Progress' });

        // Wait for the conversion to complete
        await convertFile(req.file.path, req.file.originalname);

        // Render the confirmation page
        res.render('confirmation', { filename: req.session.filename, path: req.session.path, originalname: req.session.originalname });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error converting PDF to DOCX');
    }
});app.get('/confirmation', (req, res) => {
    // Render the confirmation page
    res.render('confirmation', { filename: req.session.filename, path: req.session.path, originalname: req.session.originalname });
});

app.get('/download', (req, res) => {
    // Initiate the download of the converted file
    const { filename, path, originalname } = req.session;
    const absoluteFilePath = path;
    const downloadedFileName = originalname.replace(/\.[^/.]+$/, "") + '.docx';
    res.download(absoluteFilePath, downloadedFileName, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error downloading converted file');
        } else {
            console.log('File downloaded successfully');
            
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
