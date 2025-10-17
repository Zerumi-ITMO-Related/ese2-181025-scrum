package com.airport.admin.routes

import com.airport.admin.database.Database
import com.airport.admin.models.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

fun Route.flightRoutes() {
    route("/flights") {
        // Get all flights
        get {
            val flights = Database.getAllFlights()
            call.respond(ApiResponse(success = true, data = flights))
        }
        
        // Get flight by ID
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing flight ID")
            )
            
            val flight = Database.getFlight(id)
            if (flight != null) {
                call.respond(ApiResponse(success = true, data = flight))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Flight not found")
                )
            }
        }
        
        // Create new flight
        post {
            val request = call.receive<CreateFlightRequest>()
            val flight = Flight(
                id = "flight-${UUID.randomUUID()}",
                flightNumber = request.flightNumber,
                airlineId = request.airlineId,
                origin = request.origin,
                destination = request.destination,
                departureTime = request.departureTime,
                arrivalTime = request.arrivalTime,
                status = FlightStatus.SCHEDULED,
                aircraftType = request.aircraftType,
                capacity = request.capacity,
                terminal = request.terminal
            )
            
            val created = Database.createFlight(flight)
            call.respond(HttpStatusCode.Created, ApiResponse(success = true, data = created))
        }
        
        // Update flight
        put("/{id}") {
            val id = call.parameters["id"] ?: return@put call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing flight ID")
            )
            
            val existing = Database.getFlight(id) ?: return@put call.respond(
                HttpStatusCode.NotFound,
                ApiResponse<Nothing>(success = false, error = "Flight not found")
            )
            
            val request = call.receive<UpdateFlightRequest>()
            val updated = existing.copy(
                status = request.status ?: existing.status,
                gateId = request.gateId ?: existing.gateId,
                delayMinutes = request.delayMinutes ?: existing.delayMinutes,
                departureTime = request.departureTime ?: existing.departureTime,
                arrivalTime = request.arrivalTime ?: existing.arrivalTime
            )
            
            Database.updateFlight(id, updated)
            call.respond(ApiResponse(success = true, data = updated))
        }
        
        // Delete flight
        delete("/{id}") {
            val id = call.parameters["id"] ?: return@delete call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing flight ID")
            )
            
            val deleted = Database.deleteFlight(id)
            if (deleted) {
                call.respond(ApiResponse(success = true, message = "Flight deleted"))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Flight not found")
                )
            }
        }
    }
}

fun Route.airlineRoutes() {
    route("/airlines") {
        get {
            val airlines = Database.getAllAirlines()
            call.respond(ApiResponse(success = true, data = airlines))
        }
        
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing airline ID")
            )
            
            val airline = Database.getAirline(id)
            if (airline != null) {
                call.respond(ApiResponse(success = true, data = airline))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Airline not found")
                )
            }
        }
        
        post {
            val airline = call.receive<Airline>()
            val created = Database.createAirline(airline.copy(id = "airline-${UUID.randomUUID()}"))
            call.respond(HttpStatusCode.Created, ApiResponse(success = true, data = created))
        }
        
        put("/{id}") {
            val id = call.parameters["id"] ?: return@put call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing airline ID")
            )
            
            val airline = call.receive<Airline>()
            val updated = Database.updateAirline(id, airline.copy(id = id))
            if (updated != null) {
                call.respond(ApiResponse(success = true, data = updated))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Airline not found")
                )
            }
        }
        
        delete("/{id}") {
            val id = call.parameters["id"] ?: return@delete call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing airline ID")
            )
            
            val deleted = Database.deleteAirline(id)
            if (deleted) {
                call.respond(ApiResponse(success = true, message = "Airline deleted"))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Airline not found")
                )
            }
        }
    }
}

fun Route.passengerRoutes() {
    route("/passengers") {
        get {
            val flightId = call.request.queryParameters["flightId"]
            val passengers = if (flightId != null) {
                Database.getPassengersByFlight(flightId)
            } else {
                Database.getAllPassengers()
            }
            call.respond(ApiResponse(success = true, data = passengers))
        }
        
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing passenger ID")
            )
            
            val passenger = Database.getPassenger(id)
            if (passenger != null) {
                call.respond(ApiResponse(success = true, data = passenger))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Passenger not found")
                )
            }
        }
        
        post {
            val passenger = call.receive<Passenger>()
            val created = Database.createPassenger(passenger.copy(id = "pass-${UUID.randomUUID()}"))
            call.respond(HttpStatusCode.Created, ApiResponse(success = true, data = created))
        }
        
        put("/{id}") {
            val id = call.parameters["id"] ?: return@put call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing passenger ID")
            )
            
            val passenger = call.receive<Passenger>()
            val updated = Database.updatePassenger(id, passenger.copy(id = id))
            if (updated != null) {
                call.respond(ApiResponse(success = true, data = updated))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Passenger not found")
                )
            }
        }
    }
}

fun Route.gateRoutes() {
    route("/gates") {
        get {
            val gates = Database.getAllGates()
            call.respond(ApiResponse(success = true, data = gates))
        }
        
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing gate ID")
            )
            
            val gate = Database.getGate(id)
            if (gate != null) {
                call.respond(ApiResponse(success = true, data = gate))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Gate not found")
                )
            }
        }
        
        post {
            val gate = call.receive<Gate>()
            val created = Database.createGate(gate.copy(id = "gate-${UUID.randomUUID()}"))
            call.respond(HttpStatusCode.Created, ApiResponse(success = true, data = created))
        }
        
        put("/{id}") {
            val id = call.parameters["id"] ?: return@put call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing gate ID")
            )
            
            val gate = call.receive<Gate>()
            val updated = Database.updateGate(id, gate.copy(id = id))
            if (updated != null) {
                call.respond(ApiResponse(success = true, data = updated))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Gate not found")
                )
            }
        }
    }
}

fun Route.staffRoutes() {
    route("/staff") {
        get {
            val staff = Database.getAllStaff()
            call.respond(ApiResponse(success = true, data = staff))
        }
        
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing staff ID")
            )
            
            val staffMember = Database.getStaff(id)
            if (staffMember != null) {
                call.respond(ApiResponse(success = true, data = staffMember))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Staff member not found")
                )
            }
        }
        
        post {
            val staffMember = call.receive<Staff>()
            val created = Database.createStaff(staffMember.copy(id = "staff-${UUID.randomUUID()}"))
            call.respond(HttpStatusCode.Created, ApiResponse(success = true, data = created))
        }
        
        put("/{id}") {
            val id = call.parameters["id"] ?: return@put call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing staff ID")
            )
            
            val staffMember = call.receive<Staff>()
            val updated = Database.updateStaff(id, staffMember.copy(id = id))
            if (updated != null) {
                call.respond(ApiResponse(success = true, data = updated))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Staff member not found")
                )
            }
        }
    }
}

fun Route.weatherRoutes() {
    route("/weather") {
        get("/current") {
            val weather = Database.getLatestWeather()
            if (weather != null) {
                call.respond(ApiResponse(success = true, data = weather))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "No weather data available")
                )
            }
        }
    }
}

fun Route.runwayRoutes() {
    route("/runways") {
        get {
            val runways = Database.getAllRunways()
            call.respond(ApiResponse(success = true, data = runways))
        }
        
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing runway ID")
            )
            
            val runway = Database.getRunway(id)
            if (runway != null) {
                call.respond(ApiResponse(success = true, data = runway))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Runway not found")
                )
            }
        }
        
        put("/{id}") {
            val id = call.parameters["id"] ?: return@put call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing runway ID")
            )
            
            val runway = call.receive<Runway>()
            val updated = Database.updateRunway(id, runway.copy(id = id))
            if (updated != null) {
                call.respond(ApiResponse(success = true, data = updated))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Runway not found")
                )
            }
        }
    }
}

fun Route.baggageRoutes() {
    route("/baggage") {
        get {
            val flightId = call.request.queryParameters["flightId"]
            val baggage = if (flightId != null) {
                Database.getBaggageByFlight(flightId)
            } else {
                Database.getAllBaggage()
            }
            call.respond(ApiResponse(success = true, data = baggage))
        }
        
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing baggage ID")
            )
            
            val bag = Database.getBaggage(id)
            if (bag != null) {
                call.respond(ApiResponse(success = true, data = bag))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Baggage not found")
                )
            }
        }
        
        post {
            val bag = call.receive<Baggage>()
            val created = Database.createBaggage(bag.copy(id = "bag-${UUID.randomUUID()}"))
            call.respond(HttpStatusCode.Created, ApiResponse(success = true, data = created))
        }
        
        put("/{id}") {
            val id = call.parameters["id"] ?: return@put call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing baggage ID")
            )
            
            val bag = call.receive<Baggage>()
            val updated = Database.updateBaggage(id, bag.copy(id = id))
            if (updated != null) {
                call.respond(ApiResponse(success = true, data = updated))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Baggage not found")
                )
            }
        }
    }
}

fun Route.maintenanceRoutes() {
    route("/maintenance") {
        get {
            val maintenance = Database.getAllMaintenance()
            call.respond(ApiResponse(success = true, data = maintenance))
        }
        
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing maintenance ID")
            )
            
            val maint = Database.getMaintenance(id)
            if (maint != null) {
                call.respond(ApiResponse(success = true, data = maint))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Maintenance record not found")
                )
            }
        }
        
        post {
            val maint = call.receive<Maintenance>()
            val created = Database.createMaintenance(maint.copy(id = "maint-${UUID.randomUUID()}"))
            call.respond(HttpStatusCode.Created, ApiResponse(success = true, data = created))
        }
        
        put("/{id}") {
            val id = call.parameters["id"] ?: return@put call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing maintenance ID")
            )
            
            val maint = call.receive<Maintenance>()
            val updated = Database.updateMaintenance(id, maint.copy(id = id))
            if (updated != null) {
                call.respond(ApiResponse(success = true, data = updated))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Maintenance record not found")
                )
            }
        }
    }
}

fun Route.securityRoutes() {
    route("/security/alerts") {
        get {
            val alerts = Database.getAllSecurityAlerts()
            call.respond(ApiResponse(success = true, data = alerts))
        }
        
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing alert ID")
            )
            
            val alert = Database.getSecurityAlert(id)
            if (alert != null) {
                call.respond(ApiResponse(success = true, data = alert))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Security alert not found")
                )
            }
        }
        
        post {
            val alert = call.receive<SecurityAlert>()
            val created = Database.createSecurityAlert(alert.copy(id = "alert-${UUID.randomUUID()}"))
            call.respond(HttpStatusCode.Created, ApiResponse(success = true, data = created))
        }
        
        put("/{id}") {
            val id = call.parameters["id"] ?: return@put call.respond(
                HttpStatusCode.BadRequest,
                ApiResponse<Nothing>(success = false, error = "Missing alert ID")
            )
            
            val alert = call.receive<SecurityAlert>()
            val updated = Database.updateSecurityAlert(id, alert.copy(id = id))
            if (updated != null) {
                call.respond(ApiResponse(success = true, data = updated))
            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ApiResponse<Nothing>(success = false, error = "Security alert not found")
                )
            }
        }
    }
}

fun Route.dashboardRoutes() {
    route("/dashboard") {
        get("/stats") {
            val stats = Database.getDashboardStats()
            call.respond(ApiResponse(success = true, data = stats))
        }
    }
}
