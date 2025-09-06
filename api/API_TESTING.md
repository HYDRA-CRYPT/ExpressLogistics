# API Testing Examples

## Test Admin Seeding

### Test Login (Get Token)

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "owner@example.com",
  "password": "Passw0rd!"
}
```

### Test Seed Single Admin

```http
POST http://localhost:5000/api/auth/seed-admins
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

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

### Test Seed Multiple Admins

```http
POST http://localhost:5000/api/auth/seed-admins
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

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

### Test Get User Profile

```http
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

### Test Health Check

```http
GET http://localhost:5000/api/health
```

## cURL Examples

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@example.com",
    "password": "Passw0rd!"
  }'
```

### Seed Admin

```bash
curl -X POST http://localhost:5000/api/auth/seed-admins \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "admins": [
      {
        "email": "admin@example.com",
        "password": "SecurePass123!",
        "role": "admin"
      }
    ]
  }'
```
