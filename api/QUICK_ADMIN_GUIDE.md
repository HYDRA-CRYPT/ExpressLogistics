# Quick Admin Seeding Instructions

## For Non-Technical Admins 👨‍💼

Follow these simple steps to create new admin accounts:

### Step 1: Install VS Code Extension

1. Open VS Code
2. Press `Ctrl+Shift+X` (Extensions)
3. Search for "REST Client"
4. Click "Install" on the extension by Huachao Mao

### Step 2: Open the Admin File

1. In VS Code, open the file: `api/seedAdmin.rest`
2. You'll see several HTTP requests with "Send Request" links

### Step 3: Login to Get Your Token

1. Update your admin credentials at the top:
   ```
   @email = your-email@example.com
   @password = YourPassword
   ```
2. Click "Send Request" above the login section
3. Copy the long `token` value from the response

### Step 4: Update Token

1. Find this line: `@token = eyJhbGciOiJIUzI1NiI...`
2. Replace everything after `= ` with your copied token

### Step 5: Create New Admin

1. Find the "Seed a single admin" section
2. Change the email and password:
   ```json
   {
     "email": "newadmin@example.com",
     "password": "SecurePass123!",
     "role": "admin"
   }
   ```
3. Click "Send Request"

### Step 6: Verify Success

Look for a response like:

```json
{
  "success": true,
  "results": [
    {
      "email": "newadmin@example.com",
      "status": "created",
      "message": "Admin created successfully"
    }
  ]
}
```

## That's it! 🎉

The new admin can now login at: `http://localhost:5173/owner/login`

### Need Help?

- Check the full guide: `ADMIN_SEEDING_GUIDE.md`
- Make sure the API server is running on port 5000
- Ensure passwords meet requirements (8+ chars, uppercase, lowercase, number, special character)
