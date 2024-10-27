
# React Native CLI Assignment - Blott

**Author**: Hasith Methmal Jayasekara  
**Date**: October 26, 2024

Welcome to my React Native CLI assignment! This guide will provide all the necessary steps to get the app running on both iOS and Android platforms.

---

## 📋 Prerequisites

To ensure the app works smoothly, please check that you have the following tools installed and up-to-date:

- Node.js
- npm
- React Native CLI
- Java 17 (or newer) - Required for Android

## 🚀 Getting Started

Follow these steps to clone, install dependencies, set up environment variables, and run the application.

### 1. Clone the Repository

```bash
git clone https://github.com/hasithmeth/hasithBlott.git
cd hasithBlott
```

### 2. Set Up Environment Variables

After cloning, create a `.env` file from the `.env.template`:

```bash
cp .env.template .env
```

Then, add your `API_KEY` and any other required environment variables in the `.env` file.

### 3. Install Dependencies

Run the following command to install all necessary packages:

```bash
npm install
```

### 4. Set Up iOS (macOS only)

To link native dependencies and ensure everything is ready for iOS, run:

```bash
npx pod-install
```

### 5. Run the Application

You're ready to launch the app!

- **iOS**:

  ```bash
  npx react-native run-ios
  ```

- **Android**:

  Ensure you’re using Java 17 or newer, then run:

  ```bash
  npx react-native run-android
  ```

### 6. Run Tests

To run tests, simply use:

```bash
npm test
```

This will execute all the available tests in the project.

---

## ℹ️ Additional Notes

- Make sure Android Studio and Xcode (macOS) are set up and configured to work with React Native.
- Ensure you have an Android or iOS simulator/emulator running, or connect a physical device before starting the app.

---

## 👨‍💻 Author

This project was created by Hasith Methmal Jayasekara.  
Feel free to reach out for any questions or improvements!

---

Enjoy exploring the app!
