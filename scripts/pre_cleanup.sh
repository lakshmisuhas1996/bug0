#!/bin/bash

# Pre-cleanup script
# This script runs before test execution

echo "Running pre-cleanup script..."

# Create logs directory if it doesn't exist
mkdir -p logs/screenshots
mkdir -p logs/videos
mkdir -p test-results

# Clean previous test results (optional)
# Uncomment the next line if you want to clean previous results
# rm -rf test-results/*

echo "Pre-cleanup completed."

