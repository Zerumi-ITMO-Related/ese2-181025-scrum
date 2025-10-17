package com.airport.admin.models

import kotlinx.serialization.Serializable
import kotlinx.datetime.Instant

@Serializable
data class Flight(
    val id: String,
    val flightNumber: String,
    val airlineId: String,
    val origin: String,
    val destination: String,
    val departureTime: String,
    val arrivalTime: String,
    val status: FlightStatus,
    val gateId: String? = null,
    val aircraftType: String,
    val capacity: Int,
    val bookedSeats: Int = 0,
    val delayMinutes: Int = 0,
    val terminal: String? = null
)

@Serializable
enum class FlightStatus {
    SCHEDULED,
    BOARDING,
    DEPARTED,
    IN_FLIGHT,
    LANDED,
    ARRIVED,
    DELAYED,
    CANCELLED
}

@Serializable
data class Airline(
    val id: String,
    val name: String,
    val code: String,
    val country: String,
    val logo: String? = null,
    val contactEmail: String,
    val contactPhone: String,
    val activeFlights: Int = 0,
    val rating: Double = 0.0
)

@Serializable
data class Passenger(
    val id: String,
    val firstName: String,
    val lastName: String,
    val passportNumber: String,
    val nationality: String,
    val dateOfBirth: String,
    val email: String,
    val phone: String,
    val flightId: String,
    val seatNumber: String? = null,
    val checkInStatus: CheckInStatus,
    val boardingPass: String? = null,
    val baggageCount: Int = 0,
    val specialRequirements: String? = null
)

@Serializable
enum class CheckInStatus {
    NOT_CHECKED_IN,
    CHECKED_IN,
    BOARDED,
    NO_SHOW
}

@Serializable
data class Gate(
    val id: String,
    val number: String,
    val terminal: String,
    val status: GateStatus,
    val currentFlightId: String? = null,
    val capacity: Int,
    val facilities: List<String> = emptyList(),
    val lastMaintenance: String? = null
)

@Serializable
enum class GateStatus {
    AVAILABLE,
    OCCUPIED,
    MAINTENANCE,
    CLOSED
}

@Serializable
data class Staff(
    val id: String,
    val firstName: String,
    val lastName: String,
    val role: StaffRole,
    val email: String,
    val phone: String,
    val employeeId: String,
    val shift: String,
    val assignedGate: String? = null,
    val status: StaffStatus,
    val hireDate: String,
    val certifications: List<String> = emptyList()
)

@Serializable
enum class StaffRole {
    GATE_AGENT,
    SECURITY,
    CUSTOMS,
    GROUND_CREW,
    AIR_TRAFFIC_CONTROLLER,
    MAINTENANCE,
    MANAGER,
    CUSTOMER_SERVICE
}

@Serializable
enum class StaffStatus {
    ON_DUTY,
    OFF_DUTY,
    ON_BREAK,
    SICK_LEAVE,
    VACATION
}

@Serializable
data class Weather(
    val id: String,
    val timestamp: String,
    val temperature: Double,
    val condition: WeatherCondition,
    val windSpeed: Double,
    val windDirection: String,
    val visibility: Double,
    val pressure: Double,
    val humidity: Int,
    val precipitation: Double = 0.0,
    val cloudCoverage: Int = 0
)

@Serializable
enum class WeatherCondition {
    CLEAR,
    PARTLY_CLOUDY,
    CLOUDY,
    RAINY,
    STORMY,
    SNOWY,
    FOGGY,
    WINDY
}

@Serializable
data class Runway(
    val id: String,
    val name: String,
    val length: Int,
    val width: Int,
    val surface: String,
    val status: RunwayStatus,
    val currentOperation: String? = null,
    val maintenanceSchedule: String? = null,
    val lightingSystem: Boolean = true,
    val ils: Boolean = true
)

@Serializable
enum class RunwayStatus {
    OPERATIONAL,
    CLOSED,
    MAINTENANCE,
    PARTIALLY_OPERATIONAL
}

@Serializable
data class Baggage(
    val id: String,
    val tagNumber: String,
    val passengerId: String,
    val flightId: String,
    val weight: Double,
    val status: BaggageStatus,
    val location: String,
    val type: BaggageType,
    val specialHandling: Boolean = false,
    val notes: String? = null
)

@Serializable
enum class BaggageStatus {
    CHECKED_IN,
    IN_TRANSIT,
    LOADED,
    DELIVERED,
    LOST,
    DELAYED
}

@Serializable
enum class BaggageType {
    CARRY_ON,
    CHECKED,
    OVERSIZED,
    FRAGILE,
    SPECIAL
}

@Serializable
data class Maintenance(
    val id: String,
    val targetType: MaintenanceTarget,
    val targetId: String,
    val scheduledDate: String,
    val completedDate: String? = null,
    val status: MaintenanceStatus,
    val description: String,
    val technician: String,
    val priority: MaintenancePriority,
    val estimatedDuration: Int,
    val actualDuration: Int? = null,
    val cost: Double? = null
)

@Serializable
enum class MaintenanceTarget {
    GATE,
    RUNWAY,
    AIRCRAFT,
    FACILITY,
    EQUIPMENT
}

@Serializable
enum class MaintenanceStatus {
    SCHEDULED,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED,
    OVERDUE
}

@Serializable
enum class MaintenancePriority {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

@Serializable
data class SecurityAlert(
    val id: String,
    val timestamp: String,
    val level: SecurityLevel,
    val location: String,
    val description: String,
    val status: AlertStatus,
    val reportedBy: String,
    val resolvedBy: String? = null,
    val resolution: String? = null
)

@Serializable
enum class SecurityLevel {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

@Serializable
enum class AlertStatus {
    ACTIVE,
    INVESTIGATING,
    RESOLVED,
    FALSE_ALARM
}

// Request/Response Models
@Serializable
data class CreateFlightRequest(
    val flightNumber: String,
    val airlineId: String,
    val origin: String,
    val destination: String,
    val departureTime: String,
    val arrivalTime: String,
    val aircraftType: String,
    val capacity: Int,
    val terminal: String? = null
)

@Serializable
data class UpdateFlightRequest(
    val status: FlightStatus? = null,
    val gateId: String? = null,
    val delayMinutes: Int? = null,
    val departureTime: String? = null,
    val arrivalTime: String? = null
)

@Serializable
data class DashboardStats(
    val totalFlights: Int,
    val activeFlights: Int,
    val delayedFlights: Int,
    val totalPassengers: Int,
    val availableGates: Int,
    val staffOnDuty: Int,
    val weatherCondition: String,
    val securityAlerts: Int
)

@Serializable
data class ApiResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val message: String? = null,
    val error: String? = null
)
