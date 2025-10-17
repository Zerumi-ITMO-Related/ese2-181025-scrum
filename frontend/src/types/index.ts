// Types matching the backend models

export enum FlightStatus {
  SCHEDULED = 'SCHEDULED',
  BOARDING = 'BOARDING',
  DEPARTED = 'DEPARTED',
  IN_FLIGHT = 'IN_FLIGHT',
  LANDED = 'LANDED',
  ARRIVED = 'ARRIVED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED',
}

export interface Flight {
  id: string;
  flightNumber: string;
  airlineId: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: FlightStatus;
  gateId?: string;
  aircraftType: string;
  capacity: number;
  bookedSeats: number;
  delayMinutes: number;
  terminal?: string;
}

export interface Airline {
  id: string;
  name: string;
  code: string;
  country: string;
  logo?: string;
  contactEmail: string;
  contactPhone: string;
  activeFlights: number;
  rating: number;
}

export enum CheckInStatus {
  NOT_CHECKED_IN = 'NOT_CHECKED_IN',
  CHECKED_IN = 'CHECKED_IN',
  BOARDED = 'BOARDED',
  NO_SHOW = 'NO_SHOW',
}

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  flightId: string;
  seatNumber?: string;
  checkInStatus: CheckInStatus;
  boardingPass?: string;
  baggageCount: number;
  specialRequirements?: string;
}

export enum GateStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE',
  CLOSED = 'CLOSED',
}

export interface Gate {
  id: string;
  number: string;
  terminal: string;
  status: GateStatus;
  currentFlightId?: string;
  capacity: number;
  facilities: string[];
  lastMaintenance?: string;
}

export enum StaffRole {
  GATE_AGENT = 'GATE_AGENT',
  SECURITY = 'SECURITY',
  CUSTOMS = 'CUSTOMS',
  GROUND_CREW = 'GROUND_CREW',
  AIR_TRAFFIC_CONTROLLER = 'AIR_TRAFFIC_CONTROLLER',
  MAINTENANCE = 'MAINTENANCE',
  MANAGER = 'MANAGER',
  CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
}

export enum StaffStatus {
  ON_DUTY = 'ON_DUTY',
  OFF_DUTY = 'OFF_DUTY',
  ON_BREAK = 'ON_BREAK',
  SICK_LEAVE = 'SICK_LEAVE',
  VACATION = 'VACATION',
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  role: StaffRole;
  email: string;
  phone: string;
  employeeId: string;
  shift: string;
  assignedGate?: string;
  status: StaffStatus;
  hireDate: string;
  certifications: string[];
}

export enum WeatherCondition {
  CLEAR = 'CLEAR',
  PARTLY_CLOUDY = 'PARTLY_CLOUDY',
  CLOUDY = 'CLOUDY',
  RAINY = 'RAINY',
  STORMY = 'STORMY',
  SNOWY = 'SNOWY',
  FOGGY = 'FOGGY',
  WINDY = 'WINDY',
}

export interface Weather {
  id: string;
  timestamp: string;
  temperature: number;
  condition: WeatherCondition;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  humidity: number;
  precipitation: number;
  cloudCoverage: number;
}

export enum RunwayStatus {
  OPERATIONAL = 'OPERATIONAL',
  CLOSED = 'CLOSED',
  MAINTENANCE = 'MAINTENANCE',
  PARTIALLY_OPERATIONAL = 'PARTIALLY_OPERATIONAL',
}

export interface Runway {
  id: string;
  name: string;
  length: number;
  width: number;
  surface: string;
  status: RunwayStatus;
  currentOperation?: string;
  maintenanceSchedule?: string;
  lightingSystem: boolean;
  ils: boolean;
}

export enum BaggageStatus {
  CHECKED_IN = 'CHECKED_IN',
  IN_TRANSIT = 'IN_TRANSIT',
  LOADED = 'LOADED',
  DELIVERED = 'DELIVERED',
  LOST = 'LOST',
  DELAYED = 'DELAYED',
}

export enum BaggageType {
  CARRY_ON = 'CARRY_ON',
  CHECKED = 'CHECKED',
  OVERSIZED = 'OVERSIZED',
  FRAGILE = 'FRAGILE',
  SPECIAL = 'SPECIAL',
}

export interface Baggage {
  id: string;
  tagNumber: string;
  passengerId: string;
  flightId: string;
  weight: number;
  status: BaggageStatus;
  location: string;
  type: BaggageType;
  specialHandling: boolean;
  notes?: string;
}

export enum MaintenanceTarget {
  GATE = 'GATE',
  RUNWAY = 'RUNWAY',
  AIRCRAFT = 'AIRCRAFT',
  FACILITY = 'FACILITY',
  EQUIPMENT = 'EQUIPMENT',
}

export enum MaintenanceStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  OVERDUE = 'OVERDUE',
}

export enum MaintenancePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface Maintenance {
  id: string;
  targetType: MaintenanceTarget;
  targetId: string;
  scheduledDate: string;
  completedDate?: string;
  status: MaintenanceStatus;
  description: string;
  technician: string;
  priority: MaintenancePriority;
  estimatedDuration: number;
  actualDuration?: number;
  cost?: number;
}

export enum SecurityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum AlertStatus {
  ACTIVE = 'ACTIVE',
  INVESTIGATING = 'INVESTIGATING',
  RESOLVED = 'RESOLVED',
  FALSE_ALARM = 'FALSE_ALARM',
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  level: SecurityLevel;
  location: string;
  description: string;
  status: AlertStatus;
  reportedBy: string;
  resolvedBy?: string;
  resolution?: string;
}

export interface DashboardStats {
  totalFlights: number;
  activeFlights: number;
  delayedFlights: number;
  totalPassengers: number;
  availableGates: number;
  staffOnDuty: number;
  weatherCondition: string;
  securityAlerts: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
