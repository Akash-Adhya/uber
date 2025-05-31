# An Open-Source UBER Clone with *Leaflet* & *OpenStreetMap* Integration

This project is a full-stack ride-hailing app inspired by Uber, built with modern web technologies. A key distinction is the use of open-source mapping tools — OpenStreetMap and Leaflet — instead of Google Maps, making it free, flexible, and community-powered.

---

## 📚 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Features](#features)
- [Frontend Details](#frontend-details)
- [Backend Details](#backend-details)   
- [Notes](#notes)
- [License](#license)
- [Contact](#contact)

---

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, React Icons etc.
- **Backend**: Node.js, Express, MongoDB, JWT, bcrypt etc.
- **Mapping**: OpenStreetMap, Leaflet
- **Other Tools**: ESLint, Prettier, dotenv etc.

---

## Project Structure

```
uberclone/
├── frontend/              # Frontend application
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # Context API for state management
│   │   ├── pages/         # Page components for routing
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # Entry point for the React app
│   │   ├── index.css      # Global CSS and Tailwind imports
│   │   └── App.css        # App-level styles
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── eslint.config.js   # ESLint configuration
│   ├── index.html         # Main HTML entry point
│   └── README.md          # Frontend documentation
├── backend/               # Backend application
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Middleware functions
│   ├── utils/             # Utility functions
│   ├── server.js          # Entry point for the backend
│   └── README.md          # Backend documentation
└── README.md              # Main project documentation
```

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Akash-Adhya/uberclone.git
   cd uberclone
   ```

2. **Setup the backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update the .env file with your MongoDB URI and JWT secret
   npm start
   ```

3. **Setup the frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

---

## Features

### User Features

- Signup, login, and logout
- Book rides and view ride details
- View ride history

### Captain Features

- Signup, login, and logout
- Accept and manage ride requests
- View earnings and ride statistics

### General Features

- Responsive design for mobile and desktop
- Real-time updates using WebSockets
- Secure authentication with JWT
- Integration with map services for location and distance calculations

### Open-Source Mapping with OpenStreetMap and Leaflet
Unlike many applications that rely on proprietary mapping services like Google Maps, this project utilizes OpenStreetMap in conjunction with Leaflet to provide interactive map functionalities. This approach offers several advantages:

- Cost-Effective: Eliminates the need for paid mapping APIs.
- Customizable: Greater control over map appearance and behavior.
- Community-Driven: Benefit from continuous updates and contributions from the global OpenStreetMap community.
- Moneycontrol: By leveraging these open-source tools, the application ensures scalability and flexibility without incurring additional costs.

---

## Frontend Details

The frontend is built with **React** and styled using **Tailwind CSS**. It includes the following key components:

- **Pages**: Start, Login, Signup, Home, Riding, NotFound
- **Components**: FinishRide, CaptainDetails
- **State Management**: Context API for managing user and captain states

For more details, refer to the [frontend README](./frontend/README.md).

---

## Backend Details

The backend is built with **Node.js** and **Express** and uses **MongoDB** for data storage. It includes the following key features:

- **Models**: User, Captain, Ride
- **Routes**: User, Captain, Ride, Map
- **Authentication**: JWT-based authentication for secure access
- **Validation**: Input validation using middleware

For more details, refer to the [backend README](./backend/README.md).

---

## Notes

- Ensure the backend server is running before using the frontend.
- Use the `.env` file to configure environment variables for both the frontend and backend.
- Contributions are welcome! Feel free to open issues or submit pull requests.



## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or feedback or suggestions, please contact [Akash Adhya](mailto:akashadhya@gmail.com).