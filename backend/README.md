# UBER Backend API Documentation

---

## 📚 Table of Contents

- [User Endpoints](#user-endpoints)
  - [Register User](#register-user)
  - [Login User](#login-user)
  - [User Profile](#user-profile)
  - [Logout User](#logout-user)
- [Captain Endpoints](#captain-endpoints)
  - [Register Captain](#register-captain)
  - [Login Captain](#login-captain)
  - [Captain Profile](#captain-profile)
  - [Logout Captain](#logout-captain)
- [Validation Rules](#validation-rules)
- [Notes](#notes)

---

## 👤 User Endpoints

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