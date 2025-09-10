# CRUD Operations Setup Guide

## Complete Implementation Status

✅ Backend CRUD API endpoints (GET, POST, PUT, DELETE)
✅ Frontend TanStack Query integration
✅ Create laptops (AddLaptop component)
✅ Read laptops (LaptopList component)
✅ Update laptops (Edit modal in LaptopList)
✅ Delete laptops (Delete button in LaptopList)

## How to Start the Application

### 1. Start MongoDB

Make sure MongoDB is running on your system:

```bash
net start MongoDB
```

### 2. Initialize Database (First Time Only)

```bash
cd BackEnd
node init.js
```

### 3. Start Backend Server

```bash
cd BackEnd
npm start
# or
nodemon index.js
```

Backend will run on: http://localhost:3000

### 4. Start Frontend (New Terminal)

```bash
cd FrontEnd
npm run dev
```

Frontend will run on: http://localhost:5173

## API Endpoints

### GET /data

- Fetches all laptops
- Returns: Array of laptop objects

### GET /data/:id

- Fetches single laptop by ID
- Returns: Single laptop object

### POST /add-laptop

- Creates new laptop
- Body: laptop object with all fields

### PUT /update-laptop/:id

- Updates existing laptop
- Body: updated laptop fields

### DELETE /delete-laptop/:id

- Deletes laptop by ID
- Returns: success message

## Frontend Routes

- `/dashboard/laptops` - View all laptops (with edit/delete)
- `/dashboard/add-laptop` - Add new laptop form
- `/dashboard` - Main dashboard

## Features Implemented

1. **Complete CRUD Operations**

   - Create: Add new laptops with form validation
   - Read: Display all laptops in a responsive table
   - Update: Inline edit with modal popup
   - Delete: Confirm and delete laptops

2. **TanStack Query Integration**

   - Automatic cache management
   - Optimistic updates
   - Error handling
   - Loading states

3. **Modern UI/UX**

   - Responsive design
   - Loading indicators
   - Error messages
   - Form validation

4. **Real-time Updates**
   - Automatic refresh after mutations
   - Instant UI feedback

## Database Schema

```javascript
{
  brand: String,
  model: String,
  year: Number,
  processor: String,
  ram: String,
  storage: String,
  price: Number,
  condition: "new" | "used",
  description: String,
  createdAt: Date
}
```

The CRUD operations are now fully integrated with TanStack Query and ready to use!
