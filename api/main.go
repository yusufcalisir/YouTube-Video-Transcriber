package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"transcriber/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// TranscriptionRequest represents the incoming JSON request structure
type TranscriptionRequest struct {
	URL      string `json:"url" binding:"required"`      // YouTube video URL
	Language string `json:"language" binding:"required"` // Target language for transcription
	Mode     string `json:"mode" binding:"required"`     // Transcription mode (normal/detailed/summary)
}

// TranscriptionResponse represents the API response structure
type TranscriptionResponse struct {
	Text string `json:"text"` // Transcribed text result
}

// Global service instance for handling transcription requests
var transcriptionService *service.TranscriptionService

func main() {
	// Initialize the transcription service
	var err error
	transcriptionService, err = service.NewTranscriptionService()
	if err != nil {
		log.Fatal("Failed to initialize transcription service: ", err)
	}

	// Set up Gin web framework with default middleware
	r := gin.Default()

	// Configure CORS middleware for frontend access
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Register API routes
	r.POST("/api/transcribe", handleTranscribe)

	// Get server port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start the HTTP server
	log.Printf("Server starting on port %s...\n", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server: ", err)
	}
}

// handleTranscribe processes incoming transcription requests
func handleTranscribe(c *gin.Context) {
	var req TranscriptionRequest

	// Parse and validate the JSON request body
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Process the transcription request
	text, err := transcriptionService.TranscribeVideo(req.URL, req.Language, req.Mode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the transcription result
	response := TranscriptionResponse{
		Text: text,
	}

	c.JSON(http.StatusOK, response)
}
