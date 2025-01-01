package service

import (
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/kkdai/youtube/v2"
)

// TranscriptionService handles video downloading and transcription operations
type TranscriptionService struct {
	downloadDir string // Directory for temporary file storage
}

// NewTranscriptionService creates and initializes a new transcription service
func NewTranscriptionService() (*TranscriptionService, error) {
	// Create a temporary directory for downloads
	downloadDir := filepath.Join(os.TempDir(), "transcriber-downloads")
	if err := os.MkdirAll(downloadDir, 0755); err != nil {
		return nil, fmt.Errorf("failed to create download directory: %v", err)
	}

	return &TranscriptionService{
		downloadDir: downloadDir,
	}, nil
}

// TranscribeVideo processes a YouTube video URL and returns its transcription
// It handles the complete pipeline: download -> extract audio -> transcribe
func (s *TranscriptionService) TranscribeVideo(url, language, mode string) (string, error) {
	// Step 1: Download the video
	videoPath, err := s.downloadVideo(url)
	if err != nil {
		return "", fmt.Errorf("failed to download video: %v", err)
	}
	defer os.Remove(videoPath) // Clean up video file after processing

	// Step 2: Extract audio from video
	audioPath := videoPath + ".wav"
	if err := s.extractAudio(videoPath, audioPath); err != nil {
		return "", fmt.Errorf("failed to extract audio: %v", err)
	}
	defer os.Remove(audioPath) // Clean up audio file after processing

	// Step 3: Transcribe the audio
	text, err := s.transcribeAudio(audioPath, language)
	if err != nil {
		return "", fmt.Errorf("failed to transcribe audio: %v", err)
	}

	// Step 4: Process the transcription based on selected mode
	return s.processTranscription(text, mode), nil
}

// downloadVideo downloads a YouTube video and saves it locally
func (s *TranscriptionService) downloadVideo(url string) (string, error) {
	client := youtube.Client{}

	// Get video metadata
	video, err := client.GetVideo(url)
	if err != nil {
		return "", err
	}

	// Get available formats with audio
	formats := video.Formats.WithAudioChannels()
	if len(formats) == 0 {
		return "", fmt.Errorf("no formats with audio found")
	}

	// Select the first format with audio
	format := &formats[0]

	// Create output file in temporary directory
	outputPath := filepath.Join(s.downloadDir, video.ID+".mp4")
	outputFile, err := os.Create(outputPath)
	if err != nil {
		return "", err
	}
	defer outputFile.Close()

	// Download the video stream
	stream, _, err := client.GetStream(video, format)
	if err != nil {
		return "", err
	}
	defer stream.Close()

	// Copy the stream to the output file
	_, err = io.Copy(outputFile, stream)
	if err != nil {
		return "", err
	}

	return outputPath, nil
}

// extractAudio extracts audio from video file using FFmpeg
func (s *TranscriptionService) extractAudio(videoPath, audioPath string) error {
	// FFmpeg command to extract audio in WAV format
	// -vn: disable video
	// -acodec pcm_s16le: use PCM codec
	// -ar 16000: set sample rate to 16kHz
	// -ac 1: set to mono channel
	cmd := exec.Command("ffmpeg", "-i", videoPath, "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", audioPath)
	return cmd.Run()
}

// transcribeAudio converts audio to text using speech recognition
func (s *TranscriptionService) transcribeAudio(string, string) (string, error) {
	// TODO: Implement actual transcription using Whisper API or other service
	// For now, return a mock transcription
	return "This is a mock transcription. The actual transcription will be implemented using Whisper API or similar service.", nil
}

// processTranscription applies post-processing based on selected mode
func (s *TranscriptionService) processTranscription(text, mode string) string {
	switch mode {
	case "detailed":
		// TODO: Add timestamps and speaker detection
		return text
	case "summary":
		// TODO: Generate AI summary
		return "Summary: " + text
	default:
		return text
	}
}
