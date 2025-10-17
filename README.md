# Airport Admin Panel

Software Engineering Economics Lab #2, ITMO SE (var no scrum)

A comprehensive web-based administration panel for airport management, built with React (frontend) and Ktor (backend).

## Overview

This is a demonstration airport management system designed for educational and example purposes. It provides a full-featured admin panel for managing various aspects of airport operations including flights, airlines, passengers, gates, staff, weather monitoring, baggage tracking, maintenance scheduling, and security alerts.

**Note:** This is example code that may contain intentional mistakes and is not production-ready. It's designed to demonstrate concepts and provide a starting point for learning.

## Features

### Frontend (React + TypeScript)
- **Dashboard** - Real-time overview of airport operations with key metrics
- **Flight Management** - Track and manage all flights with status updates
- **Airline Management** - Manage partner airlines and their information
- **Passenger Tracking** - Monitor passenger check-in status and information
- **Gate Management** - View and assign gates across terminals
- **Staff Management** - Track staff schedules, roles, and assignments
- **Weather Monitoring** - Real-time weather conditions and flight impact assessment
- **Baggage Tracking** - Monitor baggage status and location
- **Maintenance Scheduling** - Schedule and track maintenance operations
- **Security Monitoring** - Track and manage security alerts

### Backend (Ktor + Kotlin)
- RESTful API with comprehensive endpoints
- In-memory database (for example purposes)
- CORS support for cross-origin requests
- JSON serialization with kotlinx.serialization
- Structured data models for all entities
- Sample data initialization

## Project Structure

```
.
├── backend/                 # Ktor backend
│   ├── src/
│   │   └── main/
│   │       ├── kotlin/
│   │       │   └── com/airport/admin/
│   │       │       ├── models/      # Data models
│   │       │       ├── routes/      # API routes
│   │       │       ├── database/    # In-memory database
│   │       │       └── Application.kt
│   │       └── resources/
│   │           └── logback.xml
│   ├── build.gradle.kts
│   └── settings.gradle.kts
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── types/          # TypeScript types
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── tailwind.config.js

```

## Getting Started

### Prerequisites

- **Backend:**
  - JDK 17 or higher
  - Gradle 8.4 or higher

- **Frontend:**
  - Node.js 18 or higher
  - npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
./gradlew build
```

3. Run the server:
```bash
./gradlew run
```

The backend API will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Core Endpoints

- **Flights**: `/api/flights`
- **Airlines**: `/api/airlines`
- **Passengers**: `/api/passengers`
- **Gates**: `/api/gates`
- **Staff**: `/api/staff`
- **Weather**: `/api/weather/current`
- **Runways**: `/api/runways`
- **Baggage**: `/api/baggage`
- **Maintenance**: `/api/maintenance`
- **Security Alerts**: `/api/security/alerts`
- **Dashboard Stats**: `/api/dashboard/stats`

All endpoints support standard REST operations (GET, POST, PUT, DELETE where applicable).

## Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Ktor 2.3.5** - Server framework
- **Kotlin 1.9.20** - Programming language
- **kotlinx.serialization** - JSON serialization
- **kotlinx-datetime** - Date/time handling
- **Exposed** - SQL framework (not used in this example, but included)
- **H2 Database** - In-memory database (configured but not used)

## Data Models

The system includes comprehensive data models for:
- Flights with status tracking
- Airlines with ratings and contact info
- Passengers with check-in status
- Gates with capacity and facilities
- Staff with roles and certifications
- Weather conditions with multiple metrics
- Runways with operational status
- Baggage with tracking information
- Maintenance with scheduling
- Security alerts with severity levels

## Development Notes

This is **example code** intended for:
- Learning purposes
- Demonstration of concepts
- Starting point for projects
- Understanding architecture patterns

### Known Limitations
- Uses in-memory storage (data is lost on restart)
- No authentication/authorization
- Limited error handling
- No data validation
- Simplified business logic
- May contain intentional or unintentional bugs
- Not optimized for production use

## License

This project is for educational purposes. Please check with your institution regarding usage and distribution.
