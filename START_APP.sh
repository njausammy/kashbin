#!/bin/bash

# Crypto Wallet App Startup Script
# Run this to start your app

clear

cat << 'EOF'

╔══════════════════════════════════════════════════════════╗
║                                                          ║
║           🚀 Starting Crypto Wallet App 🚀              ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

Starting Metro Bundler...

In 10-20 seconds you'll see:
  • QR code to scan with phone
  • Options to press for testing

How to test:
──────────────────────────────────────────────────────────

  Press 'w' → Opens in WEB BROWSER (fastest!)
  Press 'i' → Opens in iOS Simulator
  Press 'a' → Opens in Android Emulator

  Or scan QR code with Expo Go app on your phone

══════════════════════════════════════════════════════════

EOF

# Change to project directory
cd "$(dirname "$0")"

# Start Expo
npx expo start
