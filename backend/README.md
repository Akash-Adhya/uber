# UBER Backend API Documentation

This document provides a comprehensive overview of the UBER Backend API, including endpoints for user and captain management, ride operations, and map functionalities. It also outlines the validation rules for request parameters and provides examples for each endpoint.

---

## 📚 Table of Contents

- [Tech Stack ](#tech-stack)
- [User Endpoints](#user-endpoints)
- [Captain Endpoints](#captain-endpoints)
- [Map Endpoints](#map-endpoints)
- [Ride Endpoints](#ride-endpoints)
- [Validation Rules](#validation-rules)
- [Notes](#notes)

---


## Tech Stack

- **Node.js** with **Express**
- **MongoDB** with Mongoose
- **JWT** for Authentication
- **bcryptjs** for Password Hashing
- **dotenv** for Environment Configuration

---

##  User Endpoints 

### Register User

**Endpoint:**  
`POST /users/register`

Registers a new user in the system.

#### Request Body

| Field                | Type   | Required | Description                                   |
|----------------------|--------|----------|-----------------------------------------------|
| `fullname.firstname` | String | Yes      | User's first name (min 3 characters)          |
| `fullname.lastname`  | String | No       | User's last name (min 3 characters, optional) |
| `email`              | String | Yes      | User's email address (must be valid)          |
| `password`           | String | Yes      | User's password (min 6 characters)            |

**Example Request:**
```json
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Example Success Response:**
```json
HTTP/1.1 201 Created
{
  "token": "<jwt_token>",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other fields
  }
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "errors": [
    {
      "msg": "First name must be 3 characters long.",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### Login User

**Endpoint:**  
`POST /users/login`

Authenticates a user and returns a token.

#### Request Body

| Field      | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| `email`    | String | Yes      | User's email address (must be valid) |
| `password` | String | Yes      | User's password (min 6 characters)   |

**Example Request:**
```json
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "token": "<jwt_token>",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other fields
  }
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
{
  "message": "Invalid email or password"
}
```

---

### User Profile

**Endpoint:**  
`POST /users/profile`

Retrieves the profile of the authenticated user.

#### Request Headers

| Field           | Type   | Required | Description                       |
|-----------------|--------|----------|-----------------------------------|
| `Authorization` | String | Yes      | Bearer token received after login |

**Example Request:**
```http
POST /users/profile
Authorization: Bearer <jwt_token>
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
  // ...other fields
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
{
  "message": "Unauthorized access !!"
}
```

---

### Logout User

**Endpoint:**  
`POST /users/logout`

Logs out the currently authenticated user.

#### Request Headers

| Field           | Type   | Required | Description                       |
|-----------------|--------|----------|-----------------------------------|
| `Authorization` | String | Yes      | Bearer token received after login |

**Example Request:**
```http
POST /users/logout
Authorization: Bearer <jwt_token>
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "message": "Logout successfully"
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
{
  "message": "Unauthorized access !!"
}
```

---

## Captain Endpoints

### Register Captain

**Endpoint:**  
`POST /captains/register`

Registers a new captain in the system.

#### Request Body

| Field                    | Type   | Required | Description                                         |
|--------------------------|--------|----------|-----------------------------------------------------|
| `fullname.firstname`     | String | Yes      | Captain's first name (min 3 characters)             |
| `fullname.lastname`      | String | No       | Captain's last name (optional)                      |
| `email`                  | String | Yes      | Captain's email address (must be valid)             |
| `password`               | String | Yes      | Captain's password (min 6 characters)               |
| `vehicle.color`          | String | Yes      | Vehicle color (min 3 characters)                    |
| `vehicle.plate`          | String | Yes      | Vehicle plate (min 3 characters)                    |
| `vehicle.capacity`       | Number | Yes      | Vehicle capacity (must be a number)                 |
| `vehicle.vehicleType`    | String | Yes      | Vehicle type: 'car', 'bike', or 'shuttle'           |

**Example Request:**
```json
POST /captains/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "WB 15 A 1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Example Success Response:**
```json
HTTP/1.1 201 Created
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "WB 15 A 1234",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other fields
  }
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "message": "Captain already exists for this email!!"
}
```

---

### Login Captain

**Endpoint:**  
`POST /captains/login`

Authenticates a captain and returns a token.

#### Request Body

| Field      | Type   | Required | Description                              |
|------------|--------|----------|------------------------------------------|
| `email`    | String | Yes      | Captain's email address (must be valid)  |
| `password` | String | Yes      | Captain's password (min 6 characters)    |

**Example Request:**
```json
POST /captains/login
Content-Type: application/json

{
  "email": "alice.smith@example.com",
  "password": "securepassword"
}
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com"
    // ...other fields
  }
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
{
  "message": "Invalid email or password"
}
```

---

### Captain Profile

**Endpoint:**  
`POST /captains/profile`

Retrieves the profile of the authenticated captain.

#### Request Headers

| Field           | Type   | Required | Description                       |
|-----------------|--------|----------|-----------------------------------|
| `Authorization` | String | Yes      | Bearer token received after login |

**Example Request:**
```http
POST /captains/profile
Authorization: Bearer <jwt_token>
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "_id": "captain_id",
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "WB 15 A 1234",
    "capacity": 4,
    "vehicleType": "car"
  }
  // ...other fields
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
{
  "message": "Unauthorized access !"
}
```

---

### Logout Captain

**Endpoint:**  
`POST /captains/logout`

Logs out the currently authenticated captain.

#### Request Headers

| Field           | Type   | Required | Description                       |
|-----------------|--------|----------|-----------------------------------|
| `Authorization` | String | Yes      | Bearer token received after login |

**Example Request:**
```http
POST /captains/logout
Authorization: Bearer <jwt_token>
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "message": "Logout successfully"
}
```

**Example Error Response:**
```json
HTTP/1.1 401 Unauthorized
{
  "message": "Unauthorized access !"
}
```

---

## 🗺️ Map Endpoints

### Get Coordinates

**Endpoint:**  
`GET /maps/get-coordinates`

Fetches coordinates for a given address.  

#### Query Parameters

| Parameter | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| `address` | String | Yes      | Address to fetch coordinates for |

**Example Request:**
```http
GET /maps/get-coordinates?address=1600 Amphitheatre Parkway, Mountain View, CA
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "latitude": 37.4220656,
  "longitude": -122.0840897
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "message": "Address is required"
}
```

---

### Get Distance and Time

**Endpoint:**  
`GET /maps/get-distance-time`

Fetches distance and time between two locations.  

#### Query Parameters

| Parameter    | Type   | Required | Description                |
|--------------|--------|----------|----------------------------|
| `origin`     | String | Yes      | Starting location          |
| `destination`| String | Yes      | Destination location       |

**Example Request:**
```http
GET /maps/get-distance-time?origin=San Francisco, CA&destination=Los Angeles, CA
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "distance": "383 miles",
  "duration": "5 hours 30 minutes"
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "message": "Origin and destination are required"
}
```

---

### Get Suggestions

**Endpoint:**  
`GET /maps/get-suggestions`

Fetches autocomplete suggestions for a given input.  

#### Query Parameters

| Parameter | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| `input`   | String | Yes      | Input text for suggestions      |

**Example Request:**
```http
GET /maps/get-suggestions?input=1600 Amphitheatre Parkway
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "suggestions": [
    "1600 Amphitheatre Parkway, Mountain View, CA",
    "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA"
  ]
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "message": "Input is required"
}
```

---

## 🚕 Ride Endpoints

### Create Ride

**Endpoint:**  
`POST /rides/create`

Creates a new ride request.  

#### Body Parameters

| Parameter    | Type   | Required | Description                |
|--------------|--------|----------|----------------------------|
| `pickup`     | String | Yes      | Pickup location            |
| `destination`| String | Yes      | Destination location       |
| `vehicleType`| String | Yes      | Type of vehicle (`auto`, `car`, `moto`) |

**Example Request:**
```json
POST /rides/create
Content-Type: application/json

{
  "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
  "destination": "1 Infinite Loop, Cupertino, CA",
  "vehicleType": "car"
}
```

**Example Success Response:**
```json
HTTP/1.1 201 Created
{
  "rideId": "ride_id",
  "status": "pending",
  "driver": null
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "message": "Invalid vehicle type"
}
```

---

### Get Fare

**Endpoint:**  
`GET /rides/get-fare`

Fetches the estimated fare for a ride.  

#### Query Parameters

| Parameter    | Type   | Required | Description                |
|--------------|--------|----------|----------------------------|
| `pickup`     | String | Yes      | Pickup location            |
| `destination`| String | Yes      | Destination location       |

**Example Request:**
```http
GET /rides/get-fare?pickup=1600 Amphitheatre Parkway, Mountain View, CA&destination=1 Infinite Loop, Cupertino, CA
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "fare": 25.50,
  "currency": "USD"
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "message": "Pickup and destination are required"
}
```

---

### Confirm Ride

**Endpoint:**  
`POST /rides/confirm`

Confirms a ride by the captain.  

#### Body Parameters

| Parameter    | Type   | Required | Description                |
|--------------|--------|----------|----------------------------|
| `rideId`     | String | Yes      | ID of the ride to confirm  |

**Example Request:**
```json
POST /rides/confirm
Content-Type: application/json

{
  "rideId": "ride_id"
}
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "message": "Ride confirmed",
  "rideId": "ride_id",
  "status": "confirmed"
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "message": "Invalid ride ID"
}
```

---

### Start Ride

**Endpoint:**  
`GET /rides/start-ride`

Starts a ride after OTP verification.  

#### Query Parameters

| Parameter    | Type   | Required | Description                |
|--------------|--------|----------|----------------------------|
| `rideId`     | String | Yes      | ID of the ride to start    |
| `otp`        | String | Yes      | OTP for verification       |

**Example Request:**
```http
GET /rides/start-ride?rideId=ride_id&otp=123456
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "message": "Ride started",
  "rideId": "ride_id",
  "status": "in_progress"
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "message": "Invalid OTP"
}
```

---

### End Ride

**Endpoint:**  
`POST /rides/end-ride`

Ends an ongoing ride.  

#### Body Parameters

| Parameter    | Type   | Required | Description                |
|--------------|--------|----------|----------------------------|
| `rideId`     | String | Yes      | ID of the ride to end      |

**Example Request:**
```json
POST /rides/end-ride
Content-Type: application/json

{
  "rideId": "ride_id"
}
```

**Example Success Response:**
```json
HTTP/1.1 200 OK
{
  "message": "Ride ended",
  "rideId": "ride_id",
  "status": "completed",
  "fare": 25.50
}
```

**Example Error Response:**
```json
HTTP/1.1 400 Bad Request
{
  "message": "Invalid ride ID"
}
```

---

## Validation Rules

### User

- `fullname.firstname`: **Required**, at least 3 characters.
- `fullname.lastname`: Optional, at least 3 characters if provided.
- `email`: **Required**, must be a valid email.
- `password`: **Required**, at least 6 characters.

### Captain

- `fullname.firstname`: **Required**, at least 3 characters.
- `fullname.lastname`: Optional.
- `email`: **Required**, must be a valid email.
- `password`: **Required**, at least 6 characters.
- `vehicle.color`: **Required**, at least 3 characters.
- `vehicle.plate`: **Required**, at least 3 characters.
- `vehicle.capacity`: **Required**, must be a number.
- `vehicle.vehicleType`: **Required**, must be one of `'car'`, `'bike'`, or `'shuttle'`.

---

## Notes

- All endpoints return **JSON** responses.
- The `token` is a **JWT** for authentication in future requests.
- Passwords are securely hashed before storage and compared during login.
- All protected endpoints require the `Authorization` header with a Bearer token.
- The token will be blacklisted after logout.
- Clears the authentication cookie if present.

---