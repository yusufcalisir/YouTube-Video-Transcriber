"use client";

import { useState } from "react";

// Main page component for the YouTube Video Transcriber application
const Page = () => {
  // State management for form inputs and UI
  const [url, setUrl] = useState(""); // YouTube URL input
  const [language, setLanguage] = useState("en"); // Selected language
  const [mode, setMode] = useState("normal"); // Transcription mode
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [transcription, setTranscription] = useState(""); // Transcription result
  const [error, setError] = useState(""); // Error message handling

  // Handle form submission and API call
  const handleSubmit = async () => {
    // Validate URL input
    if (!url) {
      setError("Please enter a YouTube URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Make API request to backend service
      const response = await fetch("http://localhost:8080/api/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          language,
          mode,
        }),
      });

      // Handle API response errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to transcribe video");
      }

      // Update UI with transcription result
      const data = await response.json();
      setTranscription(data.text);
    } catch (err) {
      // Handle and display errors
      setError(
        err instanceof Error
          ? err.message
          : "Failed to transcribe video. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle copying transcription to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(transcription);
  };

  // Handle downloading transcription as text file
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([transcription], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcription.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            YouTube Video Transcriber
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Convert any YouTube video into text with just one click
          </p>
        </div>

        {/* Main Input Section */}
        <div className="max-w-2xl mx-auto">
          {/* Form Container */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            {/* YouTube URL Input Field */}
            <div className="mb-6">
              <label
                htmlFor="youtube-url"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                YouTube Video URL
              </label>
              <input
                type="text"
                id="youtube-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
                placeholder="Paste your YouTube video URL here..."
              />
              {/* Error Message Display */}
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Language Selection Dropdown */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="tr">Turkish</option>
                  <option value="es">Spanish</option>
                </select>
              </div>

              {/* Transcription Mode Selection */}
              <div>
                <label
                  htmlFor="mode"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Mode
                </label>
                <select
                  id="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="normal">Normal</option>
                  <option value="detailed">Detailed (with timestamps)</option>
                  <option value="summary">Summary</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Converting...
                </div>
              ) : (
                "Convert to Text"
              )}
            </button>
          </div>

          {/* Results Section - Only shown when there's a transcription */}
          {transcription && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Transcription Result
                </h2>
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
                  >
                    Download
                  </button>
                </div>
              </div>
              {/* Transcription Text Display */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-h-[200px] whitespace-pre-wrap">
                {transcription}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Wrapper component for client-side rendering
export default function Home() {
  return (
    <div suppressHydrationWarning>
      <Page />
    </div>
  );
}
