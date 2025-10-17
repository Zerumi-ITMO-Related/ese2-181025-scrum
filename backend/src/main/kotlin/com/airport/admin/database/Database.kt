package com.airport.admin.database

import com.airport.admin.models.*
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import java.util.*

// In-memory database simulation
object Database {
    private val flights = mutableMapOf<String, Flight>()
    private val airlines = mutableMapOf<String, Airline>()
    private val passengers = mutableMapOf<String, Passenger>()
    private val gates = mutableMapOf<String, Gate>()
    private val staff = mutableMapOf<String, Staff>()
    private val weather = mutableMapOf<String, Weather>()
    private val runways = mutableMapOf<String, Runway>()
    private val baggage = mutableMapOf<String, Baggage>()
    private val maintenance = mutableMapOf<String, Maintenance>()
    private val securityAlerts = mutableMapOf<String, SecurityAlert>()
    
    init {
        initializeSampleData()
    }
    
    // Flight operations
    fun getAllFlights(): List<Flight> = flights.values.toList()
    fun getFlight(id: String): Flight? = flights[id]
    fun createFlight(flight: Flight): Flight {
        flights[flight.id] = flight
        return flight
    }
    fun updateFlight(id: String, flight: Flight): Flight? {
        if (!flights.containsKey(id)) return null
        flights[id] = flight
        return flight
    }
    fun deleteFlight(id: String): Boolean = flights.remove(id) != null
    
    // Airline operations
    fun getAllAirlines(): List<Airline> = airlines.values.toList()
    fun getAirline(id: String): Airline? = airlines[id]
    fun createAirline(airline: Airline): Airline {
        airlines[airline.id] = airline
        return airline
    }
    fun updateAirline(id: String, airline: Airline): Airline? {
        if (!airlines.containsKey(id)) return null
        airlines[id] = airline
        return airline
    }
    fun deleteAirline(id: String): Boolean = airlines.remove(id) != null
    
    // Passenger operations
    fun getAllPassengers(): List<Passenger> = passengers.values.toList()
    fun getPassenger(id: String): Passenger? = passengers[id]
    fun getPassengersByFlight(flightId: String): List<Passenger> =
        passengers.values.filter { it.flightId == flightId }
    fun createPassenger(passenger: Passenger): Passenger {
        passengers[passenger.id] = passenger
        return passenger
    }
    fun updatePassenger(id: String, passenger: Passenger): Passenger? {
        if (!passengers.containsKey(id)) return null
        passengers[id] = passenger
        return passenger
    }
    fun deletePassenger(id: String): Boolean = passengers.remove(id) != null
    
    // Gate operations
    fun getAllGates(): List<Gate> = gates.values.toList()
    fun getGate(id: String): Gate? = gates[id]
    fun createGate(gate: Gate): Gate {
        gates[gate.id] = gate
        return gate
    }
    fun updateGate(id: String, gate: Gate): Gate? {
        if (!gates.containsKey(id)) return null
        gates[id] = gate
        return gate
    }
    fun deleteGate(id: String): Boolean = gates.remove(id) != null
    
    // Staff operations
    fun getAllStaff(): List<Staff> = staff.values.toList()
    fun getStaff(id: String): Staff? = staff[id]
    fun createStaff(staffMember: Staff): Staff {
        staff[staffMember.id] = staffMember
        return staffMember
    }
    fun updateStaff(id: String, staffMember: Staff): Staff? {
        if (!staff.containsKey(id)) return null
        staff[id] = staffMember
        return staffMember
    }
    fun deleteStaff(id: String): Boolean = staff.remove(id) != null
    
    // Weather operations
    fun getLatestWeather(): Weather? = weather.values.maxByOrNull { it.timestamp }
    fun createWeather(weatherData: Weather): Weather {
        weather[weatherData.id] = weatherData
        return weatherData
    }
    
    // Runway operations
    fun getAllRunways(): List<Runway> = runways.values.toList()
    fun getRunway(id: String): Runway? = runways[id]
    fun updateRunway(id: String, runway: Runway): Runway? {
        if (!runways.containsKey(id)) return null
        runways[id] = runway
        return runway
    }
    
    // Baggage operations
    fun getAllBaggage(): List<Baggage> = baggage.values.toList()
    fun getBaggage(id: String): Baggage? = baggage[id]
    fun getBaggageByFlight(flightId: String): List<Baggage> =
        baggage.values.filter { it.flightId == flightId }
    fun createBaggage(bag: Baggage): Baggage {
        baggage[bag.id] = bag
        return bag
    }
    fun updateBaggage(id: String, bag: Baggage): Baggage? {
        if (!baggage.containsKey(id)) return null
        baggage[id] = bag
        return bag
    }
    
    // Maintenance operations
    fun getAllMaintenance(): List<Maintenance> = maintenance.values.toList()
    fun getMaintenance(id: String): Maintenance? = maintenance[id]
    fun createMaintenance(maint: Maintenance): Maintenance {
        maintenance[maint.id] = maint
        return maint
    }
    fun updateMaintenance(id: String, maint: Maintenance): Maintenance? {
        if (!maintenance.containsKey(id)) return null
        maintenance[id] = maint
        return maint
    }
    
    // Security alert operations
    fun getAllSecurityAlerts(): List<SecurityAlert> = securityAlerts.values.toList()
    fun getSecurityAlert(id: String): SecurityAlert? = securityAlerts[id]
    fun createSecurityAlert(alert: SecurityAlert): SecurityAlert {
        securityAlerts[alert.id] = alert
        return alert
    }
    fun updateSecurityAlert(id: String, alert: SecurityAlert): SecurityAlert? {
        if (!securityAlerts.containsKey(id)) return null
        securityAlerts[id] = alert
        return alert
    }
    
    // Dashboard stats
    fun getDashboardStats(): DashboardStats {
        val activeFlights = flights.values.count { 
            it.status in listOf(FlightStatus.SCHEDULED, FlightStatus.BOARDING, FlightStatus.IN_FLIGHT) 
        }
        val delayedFlights = flights.values.count { it.status == FlightStatus.DELAYED }
        val availableGates = gates.values.count { it.status == GateStatus.AVAILABLE }
        val staffOnDuty = staff.values.count { it.status == StaffStatus.ON_DUTY }
        val activeAlerts = securityAlerts.values.count { it.status == AlertStatus.ACTIVE }
        val latestWeather = getLatestWeather()
        
        return DashboardStats(
            totalFlights = flights.size,
            activeFlights = activeFlights,
            delayedFlights = delayedFlights,
            totalPassengers = passengers.size,
            availableGates = availableGates,
            staffOnDuty = staffOnDuty,
            weatherCondition = latestWeather?.condition?.name ?: "UNKNOWN",
            securityAlerts = activeAlerts
        )
    }
    
    private fun initializeSampleData() {
        // Sample Airlines
        airlines["airline-1"] = Airline(
            id = "airline-1",
            name = "SkyWings International",
            code = "SKW",
            country = "USA",
            contactEmail = "info@skywings.com",
            contactPhone = "+1-555-0001",
            activeFlights = 12,
            rating = 4.5
        )
        airlines["airline-2"] = Airline(
            id = "airline-2",
            name = "Global Airways",
            code = "GLB",
            country = "UK",
            contactEmail = "contact@globalair.co.uk",
            contactPhone = "+44-20-5550002",
            activeFlights = 8,
            rating = 4.2
        )
        airlines["airline-3"] = Airline(
            id = "airline-3",
            name = "Pacific Express",
            code = "PCX",
            country = "Japan",
            contactEmail = "service@pacificexpress.jp",
            contactPhone = "+81-3-5550003",
            activeFlights = 15,
            rating = 4.7
        )
        
        // Sample Gates
        for (i in 1..20) {
            val terminal = if (i <= 10) "A" else "B"
            gates["gate-$i"] = Gate(
                id = "gate-$i",
                number = "$terminal${i.toString().padStart(2, '0')}",
                terminal = terminal,
                status = if (i % 3 == 0) GateStatus.OCCUPIED else GateStatus.AVAILABLE,
                capacity = 200 + (i * 10),
                facilities = listOf("WiFi", "Charging Stations", "Restrooms")
            )
        }
        
        // Sample Flights
        val now = Clock.System.now()
        flights["flight-1"] = Flight(
            id = "flight-1",
            flightNumber = "SKW101",
            airlineId = "airline-1",
            origin = "JFK",
            destination = "LAX",
            departureTime = "2025-10-18T08:00:00Z",
            arrivalTime = "2025-10-18T11:30:00Z",
            status = FlightStatus.SCHEDULED,
            gateId = "gate-1",
            aircraftType = "Boeing 737-800",
            capacity = 189,
            bookedSeats = 156,
            terminal = "A"
        )
        flights["flight-2"] = Flight(
            id = "flight-2",
            flightNumber = "GLB202",
            airlineId = "airline-2",
            origin = "LHR",
            destination = "JFK",
            departureTime = "2025-10-18T10:00:00Z",
            arrivalTime = "2025-10-18T13:00:00Z",
            status = FlightStatus.BOARDING,
            gateId = "gate-3",
            aircraftType = "Airbus A380",
            capacity = 525,
            bookedSeats = 489,
            terminal = "A"
        )
        flights["flight-3"] = Flight(
            id = "flight-3",
            flightNumber = "PCX303",
            airlineId = "airline-3",
            origin = "NRT",
            destination = "SFO",
            departureTime = "2025-10-18T14:00:00Z",
            arrivalTime = "2025-10-18T08:00:00Z",
            status = FlightStatus.DELAYED,
            gateId = "gate-6",
            aircraftType = "Boeing 787-9",
            capacity = 290,
            bookedSeats = 267,
            delayMinutes = 45,
            terminal = "A"
        )
        flights["flight-4"] = Flight(
            id = "flight-4",
            flightNumber = "SKW404",
            airlineId = "airline-1",
            origin = "ORD",
            destination = "MIA",
            departureTime = "2025-10-18T09:30:00Z",
            arrivalTime = "2025-10-18T13:45:00Z",
            status = FlightStatus.IN_FLIGHT,
            aircraftType = "Boeing 737-900",
            capacity = 220,
            bookedSeats = 198,
            terminal = "B"
        )
        
        // Sample Passengers
        passengers["pass-1"] = Passenger(
            id = "pass-1",
            firstName = "John",
            lastName = "Smith",
            passportNumber = "US123456789",
            nationality = "USA",
            dateOfBirth = "1985-05-15",
            email = "john.smith@email.com",
            phone = "+1-555-1001",
            flightId = "flight-1",
            seatNumber = "12A",
            checkInStatus = CheckInStatus.CHECKED_IN,
            baggageCount = 2
        )
        passengers["pass-2"] = Passenger(
            id = "pass-2",
            firstName = "Emma",
            lastName = "Johnson",
            passportNumber = "UK987654321",
            nationality = "UK",
            dateOfBirth = "1990-08-22",
            email = "emma.j@email.co.uk",
            phone = "+44-20-1002",
            flightId = "flight-2",
            seatNumber = "8C",
            checkInStatus = CheckInStatus.BOARDED,
            baggageCount = 1
        )
        
        // Sample Staff
        staff["staff-1"] = Staff(
            id = "staff-1",
            firstName = "Michael",
            lastName = "Brown",
            role = StaffRole.GATE_AGENT,
            email = "m.brown@airport.com",
            phone = "+1-555-2001",
            employeeId = "EMP001",
            shift = "Morning (06:00-14:00)",
            assignedGate = "gate-1",
            status = StaffStatus.ON_DUTY,
            hireDate = "2020-01-15",
            certifications = listOf("Customer Service", "Safety")
        )
        staff["staff-2"] = Staff(
            id = "staff-2",
            firstName = "Sarah",
            lastName = "Davis",
            role = StaffRole.AIR_TRAFFIC_CONTROLLER,
            email = "s.davis@airport.com",
            phone = "+1-555-2002",
            employeeId = "EMP002",
            shift = "Day (08:00-16:00)",
            status = StaffStatus.ON_DUTY,
            hireDate = "2018-06-20",
            certifications = listOf("ATC License", "Radar Operations", "Emergency Procedures")
        )
        
        // Sample Weather
        weather["weather-1"] = Weather(
            id = "weather-1",
            timestamp = now.toString(),
            temperature = 22.5,
            condition = WeatherCondition.PARTLY_CLOUDY,
            windSpeed = 15.0,
            windDirection = "NW",
            visibility = 10.0,
            pressure = 1013.25,
            humidity = 65,
            cloudCoverage = 40
        )
        
        // Sample Runways
        runways["runway-1"] = Runway(
            id = "runway-1",
            name = "09L/27R",
            length = 3000,
            width = 45,
            surface = "Asphalt",
            status = RunwayStatus.OPERATIONAL,
            lightingSystem = true,
            ils = true
        )
        runways["runway-2"] = Runway(
            id = "runway-2",
            name = "09R/27L",
            length = 2800,
            width = 45,
            surface = "Concrete",
            status = RunwayStatus.OPERATIONAL,
            lightingSystem = true,
            ils = true
        )
        
        // Sample Baggage
        baggage["bag-1"] = Baggage(
            id = "bag-1",
            tagNumber = "SKW101-001",
            passengerId = "pass-1",
            flightId = "flight-1",
            weight = 23.5,
            status = BaggageStatus.CHECKED_IN,
            location = "Check-in Counter A",
            type = BaggageType.CHECKED
        )
        
        // Sample Maintenance
        maintenance["maint-1"] = Maintenance(
            id = "maint-1",
            targetType = MaintenanceTarget.GATE,
            targetId = "gate-5",
            scheduledDate = "2025-10-19T02:00:00Z",
            status = MaintenanceStatus.SCHEDULED,
            description = "Regular cleaning and inspection",
            technician = "Tech Team A",
            priority = MaintenancePriority.MEDIUM,
            estimatedDuration = 120
        )
        
        // Sample Security Alerts
        securityAlerts["alert-1"] = SecurityAlert(
            id = "alert-1",
            timestamp = now.toString(),
            level = SecurityLevel.LOW,
            location = "Terminal B, Gate 15",
            description = "Unattended baggage reported",
            status = AlertStatus.INVESTIGATING,
            reportedBy = "Security Officer #42"
        )
    }
}
