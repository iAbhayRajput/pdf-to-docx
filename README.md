# PDF to DOCX Converter

A web application that converts PDF files to DOCX format using Node.js and Python. This application provides a user-friendly interface for uploading PDF files and downloading the converted DOCX files.

## Features

- PDF to DOCX conversion
- Real-time progress tracking
- File upload and download functionality
- Clean and intuitive user interface
- Automatic file cleanup after download

## Prerequisites

- Node.js (v12 or higher)
- Python 3.x
- Required Python packages (for PDF to DOCX conversion)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Pdf-2-docx
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Install required Python packages:
```bash
pip install -r requirements.txt
```

## Project Structure

```
Pdf-2-docx/
├── app8.js              # Main application file
├── public/             # Static files (CSS, client-side JS)
├── views/              # EJS templates
├── uploads/            # Temporary storage for uploaded files
└── Pdf-2-docx/         # Python conversion scripts
```

## Usage

1. Start the server:
```bash
node app8.js
```

2. Open your web browser and navigate to `http://localhost:3000`

3. Upload a PDF file using the web interface

4. Wait for the conversion process to complete

5. Download the converted DOCX file

## Technical Details

- Built with Express.js for the backend
- Uses EJS for templating
- Implements Server-Sent Events (SSE) for real-time progress updates
- Uses Python for PDF to DOCX conversion
- Implements session management for file handling
- Includes logging functionality using Winston

## Dependencies

### Node.js Dependencies
- express
- multer
- python-shell
- express-session
- winston
- ejs

### Python Dependencies
- pdf2docx (and related packages)

## Error Handling

The application includes comprehensive error handling for:
- File upload issues
- Conversion failures
- Download problems
- File cleanup operations

## Security Features

- Secure file handling
- Session management
- Temporary file cleanup
- Input validation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
