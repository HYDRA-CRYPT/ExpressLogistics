# AegisExpress Logistics Documentation

## Overview

AegisExpress Logistics is a comprehensive shipment tracking and delivery management system. The application allows users to track packages in real-time, manage deliveries, generate invoices, and visualize shipment routes on interactive maps. Built with **React TypeScript** for the frontend and **Node.js Express** for the backend, it features real-time tracking, PDF invoice generation, interactive maps with route visualization, and administrative management capabilities.

---

## Features

### General Features:

- **Real-time Shipment Tracking:** Track packages with detailed status updates and location history
- **Interactive Route Mapping:** Visualize shipment routes with custom markers and progressive route display
- **Invoice Management:** Generate and manage PDF invoices with Cloudinary integration
- **Administrative Dashboard:** Comprehensive admin panel for managing shipments and users
- **Multi-status Tracking:** Support for various shipment statuses (Pending, Shipped, In Transit, On Hold, Delivered)
- **Email Notifications:** Automated email notifications for shipment updates
- **PDF Generation:** Dynamic PDF invoice creation and management
- **Caching System:** Redis-based caching for improved performance

### Technologies Used:

- **Frontend:** React.js, TypeScript, Vite, React Router, Zustand, React Leaflet, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB with Mongoose, Redis
- **Mapping:** OpenStreetMap with Leaflet, Nominatim Geocoding API
- **File Storage:** Cloudinary for PDF invoice storage
- **Validation:** Zod validation schemas
- **Testing:** Jest for unit testing
- **Authentication:** JWT-based authentication system

---

## File and Folder Structure

### Frontend (Client)

```
client/
├── public/
│   └── react.svg
├── src/
│   ├── Admin/
│   │   ├── AdminLayout.tsx
│   │   ├── auth/
│   │   │   └── Login.tsx
│   │   ├── pages/
│   │   │   ├── AllShipment.tsx
│   │   │   ├── CreateDelivery.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── EditShipment.tsx
│   │   │   ├── OwnerTrackDetails.tsx
│   │   │   ├── ShipmentDetails.tsx
│   │   │   ├── TimelineComponent.tsx
│   │   │   └── TrackShipments.tsx
│   │   └── stores/
│   │       ├── api.ts
│   │       └── data.json
│   ├── assets/
│   │   ├── login-img.jpg
│   │   ├── react.svg
│   │   └── data/
│   │       └── api.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   └── [other UI components]
│   │   ├── AdminPanel.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── BeautifulErrorUI.tsx
│   │   ├── chart-area-interactive.tsx
│   │   ├── data-table.tsx
│   │   ├── EditShipmentForm.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── login-form.tsx
│   │   ├── MapView.tsx
│   │   ├── NoDataUI.tsx
│   │   ├── NotFound.tsx
│   │   ├── SearchAndFilters.tsx
│   │   ├── ShipmentCard.tsx
│   │   ├── ShipmentForm.tsx
│   │   ├── StatsCard.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── Testimony.tsx
│   │   ├── TrackingInput.tsx
│   │   └── [other components]
│   ├── context/
│   │   └── ThemeProvider.tsx
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   ├── useDelivery.ts
│   │   ├── useFetch.ts
│   │   ├── useMutate.ts
│   │   └── useShipmentData.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── Service.tsx
│   │   ├── Track.tsx
│   │   └── TrackDetails.tsx
│   ├── routes/
│   │   └── router.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── deliveryService.ts
│   │   ├── mapService.ts
│   │   ├── pdfGenerator.tsx
│   │   └── ProtectedRoute.tsx
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── deliveryStore.ts
│   │   ├── invoiceStore.ts
│   │   └── useStore.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   ├── package.ts
│   │   ├── shipment.ts
│   │   ├── shipmentTypes.ts
│   │   ├── ThemeContext.ts
│   │   ├── tracking.ts
│   │   └── types.ts
│   └── utils/
│       ├── getIcon.tsx
│       ├── Url.ts
│       └── utilsFile.ts
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Backend (API)

```
api/
├── config/
│   ├── db.js
│   └── redis.js
├── controllers/
│   ├── auth.controller.js
│   ├── delivery.controller.js
│   └── invoice.controller.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── delivery.model.js
│   ├── invoice.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── delivery.routes.js
│   └── invoice.routes.js
├── services/
│   ├── cacheService.js
│   ├── emailService.js
│   ├── logService.js
│   ├── mapService.js
│   └── pdfService.js
├── tests/
│   ├── delivery.test.js
│   ├── invoice.test.js
│   └── map.test.js
├── utils/
│   ├── logger.js
│   └── validators.js
├── .babelrc
├── .env
├── .gitignore
├── app.js
├── babel.config.cjs
├── package.json
├── server.js
└── test.rest
```

---

## Backend Overview

### Models

1. **Delivery Model (`delivery.model.js`)**

   - **Fields:**
     - `trackingCode`: Unique 10-digit tracking identifier
     - `sender`: Sender information (name, email, phone, address, city, country)
     - `receiver`: Receiver information (name, email, phone, address, city, country)
     - `shipmentType`: Type of shipment (Document, Parcel, Freight, Other)
     - `items`: Array of items being shipped
     - `deliveryFee`: Cost of delivery
     - `currency`: Currency for the delivery fee
     - `status`: Current shipment status
     - `history`: Array of location updates with coordinates
     - `dateSent`: Date when shipment was dispatched
     - `deliveryDate`: Expected/actual delivery date
     - `invoiceUrl`: URL to generated invoice PDF

2. **User Model (`user.model.js`)**

   - **Fields:**
     - `username`: User's username
     - `email`: User's email address
     - `password`: Encrypted password
     - `role`: User role (admin, user)

3. **Invoice Model (`invoice.model.js`)**
   - **Fields:**
     - `invoiceNumber`: Unique invoice identifier
     - `deliveryId`: Reference to delivery document
     - `amount`: Invoice amount
     - `status`: Invoice status (pending, paid, overdue)
     - `dueDate`: Payment due date

### API Endpoints

#### **Authentication Routes (`/api/auth`)**

1. **POST** `/register`: Register a new user
2. **POST** `/login`: Authenticate user and return JWT token
3. **POST** `/logout`: Logout user
4. **GET** `/profile`: Get user profile information

#### **Delivery Routes (`/api/deliveries`)**

1. **GET** `/`: Get all deliveries (admin only)
2. **POST** `/`: Create a new delivery
3. **GET** `/:id`: Get delivery by ID
4. **PUT** `/:id`: Update delivery information
5. **DELETE** `/:id`: Delete a delivery
6. **GET** `/track/:trackingCode`: Track shipment by tracking code
7. **GET** `/track/:trackingCode/full`: Get full tracking details with history
8. **POST** `/:id/update-location`: Add location update to shipment history

#### **Invoice Routes (`/api/invoices`)**

1. **GET** `/`: Get all invoices
2. **POST** `/`: Generate new invoice
3. **GET** `/:id`: Get invoice by ID
4. **PUT** `/:id`: Update invoice
5. **GET** `/:id/pdf`: Generate and download invoice PDF

---

## Frontend Overview

### State Management

The application uses **Zustand** for state management with dedicated stores:

1. **`deliveryStore.ts`**

   - Manages shipment data and tracking information
   - Handles API calls for fetching and updating deliveries
   - Provides validation and normalization functions

2. **`authStore.ts`**

   - Manages user authentication state
   - Handles login/logout functionality
   - Stores JWT tokens and user information

3. **`invoiceStore.ts`**
   - Manages invoice data and generation
   - Handles PDF creation and Cloudinary uploads

### Key Components

1. **`MapView.tsx`**

   - Interactive map component using React Leaflet
   - Displays shipment routes with custom markers
   - Features progressive route visualization (completed vs remaining)
   - Custom icons for different location types:
     - 📤 Sender location (green)
     - 📥 Receiver location (red)
     - ✈️ Current package location (orange)
     - 📍 Historical locations (blue)

2. **`TrackingInput.tsx`**

   - User-friendly tracking code input component
   - Real-time validation and search functionality

3. **`ShipmentCard.tsx`**

   - Displays shipment information in card format
   - Status-based styling and icons

4. **`TimelineComponent.tsx`**
   - Shows shipment history in timeline format
   - Displays location updates with timestamps

### Custom Hooks

1. **`useDelivery.ts`**

   - Handles delivery-related API operations
   - Provides loading states and error handling

2. **`useFetch.ts`**

   - Generic data fetching hook
   - Implements caching and retry logic

3. **`useShipmentData.ts`**
   - Specialized hook for shipment data management
   - Handles real-time updates and validation

---

## Key Features Implementation

### Real-time Tracking System

```javascript
// Example: Tracking a shipment
const trackShipment = async (trackingCode) => {
  const response = await fetch(`/api/deliveries/track/${trackingCode}/full`);
  const shipmentData = await response.json();

  // Update map with route points
  const routePoints = createRoutePoints(shipmentData);
  setRoutePoints(routePoints);
};
```

### Interactive Map with Route Visualization

```typescript
// MapView component features:
// - Progressive route drawing (completed vs remaining)
// - Custom markers for different location types
// - Real-time coordinate updates from shipment history
// - Geocoding for address-to-coordinate conversion

const createRoutePoints = async (shipmentData: ShipmentData) => {
  const points: RoutePoint[] = [];

  // Add sender point
  if (shipmentData.sender) {
    points.push({
      lat: senderCoords.lat,
      lng: senderCoords.lng,
      isOrigin: true,
      description: `Origin: ${shipmentData.sender.name}`,
    });
  }

  // Add history points
  shipmentData.history?.forEach((entry) => {
    if (entry.location && typeof entry.location === "object") {
      points.push({
        lat: entry.location.lat,
        lng: entry.location.lng,
        isHistory: true,
        status: entry.status,
      });
    }
  });

  // Add receiver point
  if (shipmentData.receiver) {
    points.push({
      lat: receiverCoords.lat,
      lng: receiverCoords.lng,
      isDestination: true,
      description: `Destination: ${shipmentData.receiver.name}`,
    });
  }

  return points;
};
```

### PDF Invoice Generation with Cloudinary

```javascript
// PDF generation and upload to Cloudinary
const generateInvoice = async (deliveryData) => {
  // Generate PDF using jsPDF
  const pdf = new jsPDF();
  pdf.text("Invoice", 20, 20);
  pdf.text(`Tracking Code: ${deliveryData.trackingCode}`, 20, 40);

  // Convert to blob and upload to Cloudinary
  const pdfBlob = pdf.output("blob");
  const formData = new FormData();
  formData.append("file", pdfBlob);
  formData.append("upload_preset", "delivery_invoices");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dk1cria0z/raw/upload`,
    { method: "POST", body: formData }
  );

  const result = await response.json();
  return result.secure_url;
};
```

---

## Environment Variables

### Backend (.env)

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aegisexpress
DB_NAME=aegisexpress

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dk1cria0z
CLOUDINARY_API_KEY=747368826295982
CLOUDINARY_API_SECRET=HbljlQwEoDR6ndvo98KNQy6Lbyk

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=dk1cria0z
VITE_CLOUDINARY_UPLOAD_PRESET=delivery_invoices

# Map Configuration
VITE_MAP_API_KEY=your_map_api_key
```

---

## Running the Application

### Backend

1. Install dependencies:

   ```bash
   cd api
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start MongoDB and Redis servers

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend

1. Install dependencies:

   ```bash
   cd client
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Full Application

1. Start both servers:

   ```bash
   # Terminal 1 - Backend
   cd api && npm run dev

   # Terminal 2 - Frontend
   cd client && npm run dev
   ```

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## Testing

### Backend Tests

```bash
cd api
npm test
```

### Frontend Tests

```bash
cd client
npm test
```

### API Testing

Use the provided `test.rest` file with REST Client extension in VS Code for API endpoint testing.

---

## Cloudinary Setup for Invoice Storage

### 1. Create Upload Preset

1. Go to [Cloudinary Console](https://console.cloudinary.com)
2. Navigate to **Settings** → **Upload**
3. Create preset named `delivery_invoices` with:
   - Signing mode: `Unsigned`
   - Resource type: `Raw`
   - Allowed formats: `pdf`
   - Max file size: `10MB`

### 2. Configure Environment Variables

```env
CLOUDINARY_CLOUD_NAME=dk1cria0z
CLOUDINARY_UPLOAD_PRESET=delivery_invoices
```

### 3. Test Upload Preset

```bash
curl -X POST \
  https://api.cloudinary.com/v1_1/dk1cria0z/raw/upload \
  -F "file=@/path/to/test.pdf" \
  -F "upload_preset=delivery_invoices" \
  -F "public_id=test-invoice" \
  -F "folder=delivery-invoices"
```

---

## Future Enhancements

1. **Real-time Notifications:** WebSocket integration for live shipment updates
2. **Mobile Application:** React Native app for mobile tracking
3. **Advanced Analytics:** Comprehensive reporting and analytics dashboard
4. **Multi-language Support:** Internationalization for global users
5. **API Rate Limiting:** Enhanced security with rate limiting
6. **Automated Testing:** Comprehensive test coverage with CI/CD pipeline
7. **Barcode Integration:** QR code generation for easy tracking
8. **Geofencing:** Automated location updates based on geographic boundaries
9. **Customer Portal:** Dedicated customer interface for shipment management
10. **Integration APIs:** Third-party logistics provider integrations

---

## Security Features

- **JWT Authentication:** Secure token-based authentication
- **Input Validation:** Comprehensive validation using Joi/Zod
- **Error Handling:** Centralized error handling middleware
- **CORS Configuration:** Proper cross-origin resource sharing setup
- **Rate Limiting:** API rate limiting for security
- **Data Sanitization:** Input sanitization to prevent injection attacks

---

## Performance Optimizations

- **Redis Caching:** Caching frequently accessed data
- **Database Indexing:** Optimized database queries with proper indexing
- **Lazy Loading:** Component lazy loading for improved initial load times
- **Image Optimization:** Cloudinary automatic image optimization
- **Code Splitting:** Vite-based code splitting for optimal bundle sizes

---

### Developed with ❤️ by

## RabbitDaCoder

_A comprehensive logistics management solution built with modern web technologies for efficient shipment tracking and delivery management._
