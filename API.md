# API Documentation

Base URL: `http://localhost:8080/api`

## Authentication
Currently, no authentication is required (example code only).

## Common Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "error": "Optional error message"
}
```

## Endpoints

### Dashboard

#### GET /dashboard/stats
Get overall statistics for the dashboard.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalFlights": 4,
    "activeFlights": 3,
    "delayedFlights": 1,
    "totalPassengers": 2,
    "availableGates": 14,
    "staffOnDuty": 2,
    "weatherCondition": "PARTLY_CLOUDY",
    "securityAlerts": 1
  }
}
```

### Flights

#### GET /flights
Get all flights.

#### GET /flights/{id}
Get a specific flight by ID.

#### POST /flights
Create a new flight.

**Request Body:**
```json
{
  "flightNumber": "AA123",
  "airlineId": "airline-1",
  "origin": "JFK",
  "destination": "LAX",
  "departureTime": "2025-10-18T08:00:00Z",
  "arrivalTime": "2025-10-18T11:30:00Z",
  "aircraftType": "Boeing 737",
  "capacity": 180,
  "terminal": "A"
}
```

#### PUT /flights/{id}
Update a flight.

**Request Body:**
```json
{
  "status": "DELAYED",
  "gateId": "gate-5",
  "delayMinutes": 30,
  "departureTime": "2025-10-18T08:30:00Z"
}
```

#### DELETE /flights/{id}
Delete a flight.

### Airlines

#### GET /airlines
Get all airlines.

#### GET /airlines/{id}
Get a specific airline by ID.

#### POST /airlines
Create a new airline.

**Request Body:**
```json
{
  "name": "Example Airways",
  "code": "EXA",
  "country": "USA",
  "contactEmail": "contact@example.com",
  "contactPhone": "+1-555-0000",
  "activeFlights": 0,
  "rating": 4.5
}
```

#### PUT /airlines/{id}
Update an airline.

#### DELETE /airlines/{id}
Delete an airline.

### Passengers

#### GET /passengers
Get all passengers. Optional query parameter: `?flightId={id}`

#### GET /passengers/{id}
Get a specific passenger by ID.

#### POST /passengers
Create a new passenger.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "passportNumber": "US123456789",
  "nationality": "USA",
  "dateOfBirth": "1990-01-01",
  "email": "john@example.com",
  "phone": "+1-555-1234",
  "flightId": "flight-1",
  "seatNumber": "12A",
  "checkInStatus": "NOT_CHECKED_IN",
  "baggageCount": 1
}
```

#### PUT /passengers/{id}
Update a passenger.

### Gates

#### GET /gates
Get all gates.

#### GET /gates/{id}
Get a specific gate by ID.

#### POST /gates
Create a new gate.

**Request Body:**
```json
{
  "number": "A15",
  "terminal": "A",
  "status": "AVAILABLE",
  "capacity": 200,
  "facilities": ["WiFi", "Charging", "Restrooms"]
}
```

#### PUT /gates/{id}
Update a gate.

### Staff

#### GET /staff
Get all staff members.

#### GET /staff/{id}
Get a specific staff member by ID.

#### POST /staff
Create a new staff member.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "GATE_AGENT",
  "email": "jane@airport.com",
  "phone": "+1-555-2000",
  "employeeId": "EMP123",
  "shift": "Morning (06:00-14:00)",
  "status": "ON_DUTY",
  "hireDate": "2020-01-15",
  "certifications": ["Safety", "Customer Service"]
}
```

#### PUT /staff/{id}
Update a staff member.

### Weather

#### GET /weather/current
Get current weather conditions.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "weather-1",
    "timestamp": "2025-10-17T21:00:00Z",
    "temperature": 22.5,
    "condition": "PARTLY_CLOUDY",
    "windSpeed": 15.0,
    "windDirection": "NW",
    "visibility": 10.0,
    "pressure": 1013.25,
    "humidity": 65,
    "precipitation": 0.0,
    "cloudCoverage": 40
  }
}
```

### Runways

#### GET /runways
Get all runways.

#### GET /runways/{id}
Get a specific runway by ID.

#### PUT /runways/{id}
Update a runway status.

### Baggage

#### GET /baggage
Get all baggage. Optional query parameter: `?flightId={id}`

#### GET /baggage/{id}
Get specific baggage by ID.

#### POST /baggage
Create a new baggage record.

**Request Body:**
```json
{
  "tagNumber": "AA123-001",
  "passengerId": "pass-1",
  "flightId": "flight-1",
  "weight": 23.5,
  "status": "CHECKED_IN",
  "location": "Check-in Counter",
  "type": "CHECKED",
  "specialHandling": false
}
```

#### PUT /baggage/{id}
Update baggage information.

### Maintenance

#### GET /maintenance
Get all maintenance records.

#### GET /maintenance/{id}
Get a specific maintenance record by ID.

#### POST /maintenance
Create a new maintenance record.

**Request Body:**
```json
{
  "targetType": "GATE",
  "targetId": "gate-10",
  "scheduledDate": "2025-10-20T02:00:00Z",
  "status": "SCHEDULED",
  "description": "Routine inspection and cleaning",
  "technician": "Maintenance Team A",
  "priority": "MEDIUM",
  "estimatedDuration": 120
}
```

#### PUT /maintenance/{id}
Update a maintenance record.

### Security Alerts

#### GET /security/alerts
Get all security alerts.

#### GET /security/alerts/{id}
Get a specific security alert by ID.

#### POST /security/alerts
Create a new security alert.

**Request Body:**
```json
{
  "timestamp": "2025-10-17T21:00:00Z",
  "level": "MEDIUM",
  "location": "Terminal A, Gate 5",
  "description": "Suspicious package reported",
  "status": "ACTIVE",
  "reportedBy": "Security Officer #25"
}
```

#### PUT /security/alerts/{id}
Update a security alert.

## Status Codes

- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST request
- `400 Bad Request` - Invalid request parameters
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Enums

### FlightStatus
- SCHEDULED
- BOARDING
- DEPARTED
- IN_FLIGHT
- LANDED
- ARRIVED
- DELAYED
- CANCELLED

### CheckInStatus
- NOT_CHECKED_IN
- CHECKED_IN
- BOARDED
- NO_SHOW

### GateStatus
- AVAILABLE
- OCCUPIED
- MAINTENANCE
- CLOSED

### StaffRole
- GATE_AGENT
- SECURITY
- CUSTOMS
- GROUND_CREW
- AIR_TRAFFIC_CONTROLLER
- MAINTENANCE
- MANAGER
- CUSTOMER_SERVICE

### StaffStatus
- ON_DUTY
- OFF_DUTY
- ON_BREAK
- SICK_LEAVE
- VACATION

### WeatherCondition
- CLEAR
- PARTLY_CLOUDY
- CLOUDY
- RAINY
- STORMY
- SNOWY
- FOGGY
- WINDY

### MaintenanceStatus
- SCHEDULED
- IN_PROGRESS
- COMPLETED
- CANCELLED
- OVERDUE

### MaintenancePriority
- LOW
- MEDIUM
- HIGH
- CRITICAL

### SecurityLevel
- LOW
- MEDIUM
- HIGH
- CRITICAL

### AlertStatus
- ACTIVE
- INVESTIGATING
- RESOLVED
- FALSE_ALARM
