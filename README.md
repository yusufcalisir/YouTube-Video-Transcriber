# YouTube Video Transcriber 🎥 ➡️ 📝

![YouTube Video Transcriber Screenshot](https://i.hizliresim.com/9vbd2o4.png)

A powerful and modern web application that converts YouTube videos into text transcriptions. Built with Next.js for the frontend and Go for the backend, offering a seamless and user-friendly experience.

## ✨ Key Features

### Core Functionality

- 🎯 **Direct YouTube Integration**: Simply paste any YouTube video URL
- 🌍 **Multi-language Support**:
  - English (en)
  - Turkish (tr)
  - Spanish (es)
  - More languages coming soon!
- 🔄 **Multiple Transcription Modes**:
  - Standard: Clean, accurate transcription
  - Detailed: Includes timestamps and speaker detection
  - Summary: AI-generated concise summary

### User Interface

- 🎨 **Modern Design**:
  - Clean, intuitive interface
  - Responsive layout for all devices
  - Dark/Light mode support
- ⚡ **Real-time Processing**:
  - Progress indicators
  - Loading animations
  - Error handling with clear messages

### Output Options

- 📋 **Copy to Clipboard**: One-click copy functionality
- 💾 **Download Options**: Save transcriptions as text files
- 📊 **Format Options**: Clean text formatting with proper spacing

## 🛠️ Technical Stack

### Frontend

- **Framework**: Next.js 14+ with TypeScript
- **Styling**: TailwindCSS for modern UI
- **State Management**: React Hooks
- **API Integration**: Fetch API with error handling
- **Components**: Custom-built, reusable components

### Backend

- **Language**: Go (Golang)
- **Web Framework**: Gin for HTTP handling
- **Video Processing**: FFmpeg for audio extraction
- **YouTube Integration**: youtube-dl for video downloading
- **API Design**: RESTful architecture

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.0.0 or higher)
- Go (v1.19 or higher)
- FFmpeg (latest stable version)
- Git (for version control)

## 🚀 Installation Guide

### Frontend Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd transcriber
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:3000`

### Backend Setup

1. **Navigate to API Directory**

   ```bash
   cd api
   ```

2. **Install Go Dependencies**

   ```bash
   go mod download
   ```

3. **Start the Server**
   ```bash
   go run main.go
   ```
   The API will be available at `http://localhost:8080`

### FFmpeg Installation

#### Windows

1. Download from official website or use Chocolatey:
   ```bash
   choco install ffmpeg
   ```

#### macOS

```bash
brew install ffmpeg
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install ffmpeg
```

## 💡 Usage Guide

1. **Starting the Application**

   - Ensure both frontend and backend servers are running
   - Open your browser to `http://localhost:3000`

2. **Transcribing a Video**

   - Paste a valid YouTube URL
   - Select desired language
   - Choose transcription mode
   - Click "Convert to Text"

3. **Managing Output**
   - View transcription in the result section
   - Use Copy button to copy to clipboard
   - Download as text file for offline use

## 🔧 Configuration

### Environment Variables

- `PORT`: Backend server port (default: 8080)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

### Custom Settings

- Audio quality settings in FFmpeg
- Transcription accuracy levels
- Output format customization

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 🐛 Troubleshooting

### Common Issues

1. **FFmpeg Not Found**

   - Ensure FFmpeg is properly installed
   - Verify system PATH includes FFmpeg

2. **API Connection Failed**

   - Check if backend server is running
   - Verify port settings
   - Check CORS configuration

3. **Video Download Issues**
   - Verify YouTube URL format
   - Check internet connection
   - Ensure video is publicly accessible

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Go community for excellent libraries
- FFmpeg for reliable media processing
- All contributors and users of this project

## 📞 Support

For support, please:

1. Check the issues section
2. Review troubleshooting guide
3. Create a new issue if needed

## 🔄 Updates

Stay tuned for upcoming features:

- Additional language support
- Enhanced AI summarization
- Batch processing capability
- Custom API integration options
  #
