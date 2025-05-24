# Uber Clone Frontend

This is the frontend of the Uber Clone project, built using **React**, **Vite**, and **Tailwind CSS**. It provides a responsive and interactive user interface for both users and captains.

---

## 📚 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Environment Variables](#environment-variables)

---

## Tech Stack

- **React** for building the user interface.
- **Vite** for fast development and build tooling.
- **Tailwind CSS** for styling.
- **React Router** for routing.
- **React Icons** for icons.
- **React Hot Toast** for notifications.

---

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   ├── context/            # Context API for state management
│   ├── pages/              # Page components for routing
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point for the React app
│   ├── index.css           # Global CSS and Tailwind imports
│   └── App.css             # App-level styles
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML entry point
└── README.md               # Project documentation
```

---

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Akash-Adhya/uberclone.git
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

---

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Runs ESLint to check for code issues.

---

## Features

- **User Authentication**: Signup, login, and logout for users and captains.
- **Ride Booking**: Users can book rides and view ride details.
- **Captain Dashboard**: Captains can manage rides and view earnings.
- **Responsive Design**: Fully responsive UI for mobile and desktop.
- **Notifications**: Toast notifications for user feedback.

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_BASE_URL=<backend-api-url>
```

Replace `<backend-api-url>` with the URL of your backend server.

---


## Notes

- This project uses **Vite** for fast builds and hot module replacement.
- Tailwind CSS is used for styling, and custom styles can be added in `index.css` or `App.css`.
- Ensure the backend server is running for API calls to work.
