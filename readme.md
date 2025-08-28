# Cloudinary Setup Guide for Delivery Invoices

## 1. Create Upload Preset

Follow these steps to create the required upload preset for your delivery invoices:

### Step 1: Access Cloudinary Dashboard

1. Go to [Cloudinary Console](https://console.cloudinary.com)
2. Log in to your account (dk1cria0z)

### Step 2: Create Upload Preset

1. Navigate to **Settings** → **Upload** in the left sidebar
2. Scroll down to **Upload presets** section
3. Click **Add upload preset**

### Step 3: Configure Upload Preset

Set up the preset with these settings:

**Basic Settings:**

- **Preset name**: `delivery_invoices`
- **Signing mode**: `Unsigned` (allows frontend uploads)
- **Resource type**: `Raw` (for PDF files)

**Upload Manipulations:**

- **Folder**: `delivery-invoices` (optional, for organization)
- **Public ID**: `Use filename` or `Use original filename`
- **Unique filename**: `True` (prevents conflicts)

**Advanced Settings:**

- **Allowed formats**: `pdf` (restrict to PDF files only)
- **Max file size**: `10000000` (10MB - adjust as needed)
- **Auto tagging**: `invoice, delivery` (optional, for organization)

### Step 4: Save Preset

1. Click **Save** at the bottom of the form
2. Your preset `delivery_invoices` is now ready to use

## 2. Environment Variables (Recommended)

For better security, create a `.env.local` file in your project root:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dk1cria0z
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=delivery_invoices

# Optional: For server-side operations (keep private)
CLOUDINARY_API_KEY=747368826295982
CLOUDINARY_API_SECRET=HbljlQwEoDR6ndvo98KNQy6Lbyk
```

## 3. Update Code to Use Environment Variables

If you want to use environment variables, update the upload function:

```typescript
// Cloudinary configuration from environment
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dk1cria0z";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "delivery_invoices";
```

## 4. Test Upload Preset

You can test if your upload preset works by using this curl command:

```bash
curl -X POST \
  https://api.cloudinary.com/v1_1/dk1cria0z/raw/upload \
  -F "file=@/path/to/test.pdf" \
  -F "upload_preset=delivery_invoices" \
  -F "public_id=test-invoice" \
  -F "folder=delivery-invoices"
```

## 5. Cloudinary URL Structure

Your uploaded PDFs will have URLs like:

```
https://res.cloudinary.com/dk1cria0z/raw/upload/v1234567890/delivery-invoices/BLD1735123456789123.pdf
```

## 6. Folder Organization

Your Cloudinary media library will be organized like this:

```
delivery-invoices/
├── BLD1735123456789001-1735123456789.pdf
├── BLD1735123456789002-1735123456790.pdf
└── BLD1735123456789003-1735123456791.pdf
```

## 7. Security Considerations

### For Production:

1. **Restrict domains**: In Cloudinary settings, add your domain to allowed origins
2. **Enable notifications**: Set up webhook notifications for upload events
3. **Monitor usage**: Set up usage alerts to prevent unexpected charges

### Upload Limits:

- **File size**: 10MB per file (adjustable)
- **File types**: PDF only (configured in preset)
- **Daily quota**: Monitor in Cloudinary dashboard

## 8. Troubleshooting

### Common Issues:

**Upload Preset Not Found:**

- Ensure the preset name matches exactly: `delivery_invoices`
- Check that signing mode is set to "Unsigned"

**CORS Errors:**

- Add your domain to allowed origins in Cloudinary settings
- For development, `localhost:3000` should be allowed

**File Size Errors:**

- Check file size limits in your upload preset
- Default limit might be too small for some PDFs

**Invalid Resource Type:**

- Ensure resource_type is set to 'raw' for PDF files
- Don't use 'image' resource type for PDFs

## 9. Monitoring Uploads

Monitor your uploads in Cloudinary:

1. Go to **Media Library**
2. Filter by folder: `delivery-invoices`
3. View upload statistics in **Dashboard**

## 10. Backup Strategy

Consider implementing a backup strategy:

- Download important invoices periodically
- Set up automatic backups using Cloudinary's backup service
- Keep local copies of critical invoices

---

**Next Steps:**

1. Create the upload preset as described above
2. Test the upload functionality with your app
3. Monitor the first few uploads to ensure everything works correctly
