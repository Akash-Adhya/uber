# User Registration API Documentation

## Endpoint

### `POST /users/register`

Registers a new user in the system.

---

## Request Body

Send a JSON object with the following structure:

| Field                  | Type   | Required | Description                                   |
|------------------------|--------|----------|-----------------------------------------------|
| `fullname.firstname`   | String | Yes      | User's first name (min 3 characters)          |
| `fullname.lastname`    | String | No       | User's last name (min 3 characters, optional) |
| `email`                | String | Yes      | User's email address (must be valid)          |
| `password`             | String | Yes      | User's password (min 6 characters)            |

**Example:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

## Responses

### 201 Created

- **Description:** User registered successfully.
- **Body:**
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

### 400 Bad Request

- **Description:** Validation failed or missing required fields.
- **Body:**
    ```json
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

## Validation Rules

- `fullname.firstname`: Required, at least 3 characters.
- `fullname.lastname`: Optional, at least 3 characters if provided.
- `email`: Required, must be a valid email.
- `password`: Required, at least 6 characters.

---

## Notes

- The `token` is a JWT for authentication in future requests.
- Passwords are securely hashed before storage.


---

## Endpoint


### `POST /users/login`

Authenticates a user and returns a token.

---

## Request Body

Send a JSON object with the following structure:

| Field      | Type   | Required | Description                                   |
|------------|--------|----------|-----------------------------------------------|
| `email`    | String | Yes      | User's email address (must be valid)          |
| `password` | String | Yes      | User's password (min 6 characters)            |

**Example:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

## Responses

### 200 OK

- **Description:** User authenticated successfully.
- **Body:**
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

### 400 Bad Request

- **Description:** Validation failed or missing required fields.
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email or password."
        }
      ]
    }
    ```

### 401 Unauthorized

- **Description:** Invalid email or password.
- **Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

---

## Validation Rules

- `email`: Required, must be a valid email.
- `password`: Required, at least 6 characters.

---

## Notes

- The `token` is a JWT for authentication in future requests.
- Passwords are securely hashed and compared during login.

---

## Endpoint

### `POST /users/profile`

Retrieves the profile of the authenticated user.

---

## Request Headers

| Field           | Type   | Required | Description                          |
|----------------|--------|----------|--------------------------------------|
| `Authorization` | String | Yes      | Bearer token received after login     |

---

## Responses

### 200 OK

- **Description:** User profile retrieved successfully.
- **Body:**
    ```json
    {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```

### 401 Unauthorized

- **Description:** No token provided or invalid token.
- **Body:**
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```

---

## Notes

- Requires authentication via JWT token in the Authorization header.
- Token must be prefixed with "Bearer ".

---

## Endpoint

### `POST /users/logout`

Logs out the currently authenticated user.

---

## Request Headers

| Field           | Type   | Required | Description                          |
|----------------|--------|----------|--------------------------------------|
| `Authorization` | String | Yes      | Bearer token received after login     |

---

## Responses

### 200 OK

- **Description:** User logged out successfully.
- **Body:**
    ```json
    {
      "message": "Logout successfully"
    }
    ```

### 401 Unauthorized

- **Description:** No token provided or invalid token.
- **Body:**
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```

---

## Notes

- Requires authentication via JWT token in the Authorization header.
- The token will be blacklisted after logout.
- Clears the authentication cookie if present.