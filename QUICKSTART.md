# Quick Start Guide

## Prerequisites

Before you start, make sure you have:
- **Java 17+** installed
- **Node.js 18+** and npm installed
- **Git** (already cloned if you're reading this)

## 1. Quick Start (Recommended)

The easiest way to run both frontend and backend:

```bash
./start.sh
```

This will:
1. Build the backend (if needed)
2. Start the backend server on port 8080
3. Install frontend dependencies (if needed)
4. Start the frontend development server on port 3000

Then open your browser to: **http://localhost:3000**

## 2. Manual Start

### Start Backend

```bash
cd backend
./gradlew build    # First time only
./gradlew run
```

Backend will be running on **http://localhost:8080**

Test it:
```bash
curl http://localhost:8080/api/dashboard/stats
```

### Start Frontend (in a new terminal)

```bash
cd frontend
npm install        # First time only
npm run dev
```

Frontend will be running on **http://localhost:3000**

## 3. Exploring the Application

### Dashboard (Home)
- Navigate to http://localhost:3000
- See overall statistics
- View recent flights
- Monitor active operations

### Navigation
Use the sidebar to explore:
- 📊 **Dashboard** - Overview and statistics
- ✈️ **Flights** - Flight management with filters
- 🏢 **Airlines** - Partner airline information
- 👥 **Passengers** - Passenger tracking
- 🚪 **Gates** - Terminal gate management
- 👔 **Staff** - Staff directory and scheduling
- ☁️ **Weather** - Weather conditions and impact
- 📦 **Baggage** - Baggage tracking system
- 🔧 **Maintenance** - Maintenance scheduling
- 🛡️ **Security** - Security alert monitoring

## 4. Testing the API

### Get Dashboard Stats
```bash
curl http://localhost:8080/api/dashboard/stats
```

### Get All Flights
```bash
curl http://localhost:8080/api/flights
```

### Get Specific Flight
```bash
curl http://localhost:8080/api/flights/flight-1
```

### Get Current Weather
```bash
curl http://localhost:8080/api/weather/current
```

### Create a New Passenger (POST)
```bash
curl -X POST http://localhost:8080/api/passengers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "passportNumber": "US999999999",
    "nationality": "USA",
    "dateOfBirth": "1990-01-01",
    "email": "test@example.com",
    "phone": "+1-555-9999",
    "flightId": "flight-1",
    "seatNumber": "15C",
    "checkInStatus": "NOT_CHECKED_IN",
    "baggageCount": 1
  }'
```

## 5. Understanding the Data

### Sample Data Included
The application comes with pre-populated data:
- **3 Airlines**: SkyWings, Global Airways, Pacific Express
- **4 Flights**: Various routes and statuses
- **20 Gates**: Distributed across terminals A & B
- **2 Passengers**: Example passenger records
- **2 Staff Members**: Gate agent and ATC
- **Weather Data**: Current conditions
- **Security Alert**: Example alert

### Data is In-Memory
⚠️ **Important**: All data is stored in memory and will be reset when you restart the backend server.

## 6. Development

### Backend Development
The backend uses hot reload when running with `./gradlew run -t` (continuous mode):
```bash
cd backend
./gradlew run -t
```

### Frontend Development
The frontend has hot module replacement (HMR) enabled by default:
```bash
cd frontend
npm run dev
```

Changes to React components will automatically refresh in the browser.

## 7. Building for Production

### Backend
```bash
cd backend
./gradlew build
# Creates distributable in build/distributions/
```

### Frontend
```bash
cd frontend
npm run build
# Creates optimized build in dist/
```

## 8. Common Issues & Solutions

### Port Already in Use
If port 8080 or 3000 is already in use:

**Backend**: Edit `Application.kt` to change port
**Frontend**: Edit `vite.config.ts` to change port

### Backend Won't Start
- Check Java version: `java -version` (need 17+)
- Clean and rebuild: `./gradlew clean build`

### Frontend Won't Start
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### CORS Errors
The backend has CORS enabled for all origins. If you still see CORS errors:
- Check that backend is running on port 8080
- Check browser console for actual error

## 9. Project Structure Overview

```
ese2-181025-scrum/
├── backend/              # Ktor backend
│   ├── src/main/kotlin/ # Kotlin source code
│   │   └── com/airport/admin/
│   │       ├── Application.kt    # Main entry point
│   │       ├── models/           # Data models
│   │       ├── routes/           # API endpoints
│   │       └── database/         # In-memory DB
│   └── build.gradle.kts # Dependencies
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   ├── services/   # API client
│   │   └── types/      # TypeScript types
│   └── package.json    # Dependencies
│
├── README.md           # Main documentation
├── API.md             # API reference
├── FEATURES.md        # Feature descriptions
└── start.sh           # Startup script
```

## 10. Next Steps

1. ✅ Explore the dashboard
2. ✅ Try filtering flights by status
3. ✅ View gates by terminal
4. ✅ Check weather impact assessment
5. ✅ Test API endpoints with curl
6. ✅ Read API.md for complete endpoint list
7. ✅ Read FEATURES.md for detailed features
8. ✅ Read PROJECT_SUMMARY.md for architecture

## Need Help?

- 📖 **Documentation**: Check README.md, API.md, FEATURES.md
- 🔧 **API Issues**: Verify backend is running on port 8080
- 🎨 **UI Issues**: Check browser console for errors
- 🐛 **Bugs**: This is example code - some bugs are intentional!

## Learning Resources

- **Ktor**: https://ktor.io/docs/
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Tailwind CSS**: https://tailwindcss.com/

---

**Happy Coding! 🚀**
