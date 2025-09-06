# Admin Seeding Guide

This guide explains how to create admin users in the AegisExpress Logistics system using different methods.

## Overview

There are **four ways** to seed admin users:

1. **CLI Method**: Seed a single admin via command line (for initial setup)
2. **REST Client Method**: Easy visual method using VS Code (recommended for admins)
3. **API Single**: Create one admin via API endpoint
4. **API Multiple**: Create multiple admins via API endpoint

---

## Method 1: CLI Seeding (Initial Admin)

This method is used to create the first admin user when setting up the system.

### Prerequisites

1. Set environment variables in `.env` file:

```env
ADMIN_SEED_TOKEN=CHANGE_ME
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=Passw0rd!
```

### Steps

1. **Navigate to API directory:**

```bash
cd api
```

2. **Run the seeding command:**

```bash
npm run dev -- --seed-admin
# OR
node server.js --seed-admin
```

### What happens:

- Checks if `ADMIN_SEED_TOKEN` is set
- Creates admin user with email and password from environment variables
- Prevents duplicate seeding using Redis flag
- Exits after seeding

### Output:

```
✅ Admin seeded: owner@example.com
```

---

## Method 2: REST Client Method (Easiest for Admins) ⭐

This is the **easiest method** for non-technical admins to seed new users.

### Prerequisites

1. **VS Code** with "REST Client" extension installed
2. **Existing admin credentials** (email and password)
3. **API server running** on localhost:5000

### Steps

1. **Open the REST file:**

   - Navigate to `api/seedAdmin.rest` in VS Code
   - The file contains pre-written requests

2. **Update your credentials:**

   ```
   @email = your-admin@example.com
   @password = YourAdminPassword
   ```

3. **Login to get token:**

   - Click "Send Request" above the login request
   - Copy the `token` value from response

4. **Update token variable:**

   ```
   @token = paste-your-jwt-token-here
   ```

5. **Seed new admin:**
   - Modify the email/password in the seeding request
   - Click "Send Request" to create the admin

### Visual Example:

```http
### Step 1: Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "owner@example.com",
  "password": "Passw0rd!"
}

### Step 2: Seed Admin (after copying token)
POST http://localhost:5000/api/auth/seed-admins
Authorization: Bearer eyJhbGciOiJIUzI1NiI...
Content-Type: application/json

{
  "admins": [
    {
      "email": "newadmin@example.com",
      "password": "SecurePass123!",
      "role": "admin"
    }
  ]
}
```

---

## Method 3: API Single Admin Seeding

Create individual admin users via the API endpoint.

### Prerequisites

1. **Authentication**: You need an existing admin token
2. **API Running**: The server must be running

### Request Format

**Endpoint:** `POST /api/auth/seed-admins`

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN_FROM_LOGIN
Content-Type: application/json
```

**Note:** The JWT token is obtained by logging in first (see "Getting Admin Token" section below).

**Body (Single Admin):**

```json
{
  "admins": [
    {
      "email": "admin2@example.com",
      "password": "SecurePass123!",
      "role": "admin"
    }
  ]
}
```

### Example using curl:

```bash
curl -X POST http://localhost:5000/api/auth/seed-admins \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_FROM_LOGIN" \
  -H "Content-Type: application/json" \
  -d '{
    "admins": [
      {
        "email": "admin2@example.com",
        "password": "SecurePass123!",
        "role": "admin"
      }
    ]
  }'
```

**Note:** Replace `YOUR_JWT_TOKEN_FROM_LOGIN` with the actual JWT token you received when logging in.

### Example using Postman/Insomnia:

1. **Method**: POST
2. **URL**: `http://localhost:5000/api/auth/seed-admins`
3. **Headers**:
   - `Authorization`: `Bearer YOUR_JWT_TOKEN_FROM_LOGIN`
   - `Content-Type`: `application/json`
4. **Body**: JSON with admins array

**Important:** Get the JWT token by logging in first!

---

## Method 4: API Multiple Admin Seeding

Create multiple admin users in a single API call.

### Request Format

**Body (Multiple Admins):**

```json
{
  "admins": [
    {
      "email": "admin1@example.com",
      "password": "SecurePass123!",
      "role": "admin"
    },
    {
      "email": "admin2@example.com",
      "password": "AnotherPass456!",
      "role": "admin"
    },
    {
      "email": "manager@example.com",
      "password": "ManagerPass789!",
      "role": "admin"
    }
  ]
}
```

### Example Response:

```json
{
  "success": true,
  "message": "Admin seeding completed",
  "results": [
    {
      "email": "admin1@example.com",
      "status": "created",
      "message": "Admin created successfully"
    },
    {
      "email": "admin2@example.com",
      "status": "created",
      "message": "Admin created successfully"
    },
    {
      "email": "existing@example.com",
      "status": "skipped",
      "message": "Admin already exists"
    }
  ]
}
```

---

## Password Requirements

All admin passwords must meet these criteria:

- At least 8 characters long
- Contains uppercase letters (A-Z)
- Contains lowercase letters (a-z)
- Contains numbers (0-9)
- Contains special characters (@$!%\*?&)

### Valid Examples:

- `SecurePass123!`
- `Admin@2024`
- `MyPassword$1`

### Invalid Examples:

- `password` (too simple)
- `PASSWORD123` (no special character)
- `Pass@1` (too short)

---

## Security Notes

1. **Token Protection**: The seeding endpoint requires admin authentication
2. **Duplicate Prevention**: System prevents creating duplicate email accounts
3. **Password Hashing**: All passwords are automatically hashed before storage
4. **Role Validation**: Only "admin" role is supported for seeding

---

## Troubleshooting

### Common Issues:

1. **"No token provided"**

   - Solution: Include Authorization header with valid admin token

2. **"Invalid email or password"**

   - Solution: Check password requirements and email format

3. **"Admin already exists"**

   - Solution: Use different email or check existing users

4. **"Failed to seed admins"**
   - Solution: Check server logs and database connection

### Getting Admin Token:

1. **Login with existing admin:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@example.com",
    "password": "Passw0rd!"
  }'
```

2. **Copy JWT token from response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

3. **Use this JWT token in Authorization header:**

```bash
# Replace YOUR_TOKEN_HERE with the actual JWT token from login response
curl -X POST http://localhost:5000/api/auth/seed-admins \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"admins": [...]}'
```

**Important Notes:**

- `YOUR_TOKEN_HERE` = JWT token from login response (starts with eyJhbGciOiJIUzI1NiI...)
- **NOT** the `ADMIN_SEED_TOKEN` from `.env` file
- The `.env` token is only for CLI seeding, not API authentication

---

## Best Practices

1. **Initial Setup**: Use CLI method for the first admin
2. **Easy Admin Creation**: Use REST Client method (Method 2) for non-technical users
3. **Additional Admins**: Use API method for subsequent admins
4. **Batch Creation**: Use multiple admin seeding for bulk operations
5. **Secure Passwords**: Always use strong, unique passwords
6. **Environment Variables**: Keep sensitive data in `.env` files
7. **Token Security**: Never share or expose admin tokens

### Installing REST Client Extension

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "REST Client"
4. Install the extension by Huachao Mao
5. Open `api/seedAdmin.rest` file
6. You'll see "Send Request" links above each HTTP request

---

## Testing Seeded Admins

After seeding, test the admin accounts:

1. **Using REST Client (Easiest):**

   - Open `api/seedAdmin.rest`
   - Use the "Test new admin login" request
   - Update email/password and click "Send Request"

2. **Using curl:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "YOUR_ADMIN_EMAIL",
    "password": "YOUR_ADMIN_PASSWORD"
  }'
```

3. **Access Admin Panel:**
   - Navigate to: `http://localhost:5173/owner/login`
   - Login with seeded credentials
   - Verify admin dashboard access
