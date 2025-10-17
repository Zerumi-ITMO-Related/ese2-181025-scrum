import axios from 'axios';
import type {
  ApiResponse,
  Flight,
  Airline,
  Passenger,
  Gate,
  Staff,
  Weather,
  Runway,
  Baggage,
  Maintenance,
  SecurityAlert,
  DashboardStats,
} from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flights
export const flightApi = {
  getAll: () => api.get<ApiResponse<Flight[]>>('/flights'),
  getById: (id: string) => api.get<ApiResponse<Flight>>(`/flights/${id}`),
  create: (data: Partial<Flight>) => api.post<ApiResponse<Flight>>('/flights', data),
  update: (id: string, data: Partial<Flight>) => api.put<ApiResponse<Flight>>(`/flights/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/flights/${id}`),
};

// Airlines
export const airlineApi = {
  getAll: () => api.get<ApiResponse<Airline[]>>('/airlines'),
  getById: (id: string) => api.get<ApiResponse<Airline>>(`/airlines/${id}`),
  create: (data: Partial<Airline>) => api.post<ApiResponse<Airline>>('/airlines', data),
  update: (id: string, data: Partial<Airline>) => api.put<ApiResponse<Airline>>(`/airlines/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/airlines/${id}`),
};

// Passengers
export const passengerApi = {
  getAll: (flightId?: string) => 
    api.get<ApiResponse<Passenger[]>>('/passengers', { params: { flightId } }),
  getById: (id: string) => api.get<ApiResponse<Passenger>>(`/passengers/${id}`),
  create: (data: Partial<Passenger>) => api.post<ApiResponse<Passenger>>('/passengers', data),
  update: (id: string, data: Partial<Passenger>) => 
    api.put<ApiResponse<Passenger>>(`/passengers/${id}`, data),
};

// Gates
export const gateApi = {
  getAll: () => api.get<ApiResponse<Gate[]>>('/gates'),
  getById: (id: string) => api.get<ApiResponse<Gate>>(`/gates/${id}`),
  create: (data: Partial<Gate>) => api.post<ApiResponse<Gate>>('/gates', data),
  update: (id: string, data: Partial<Gate>) => api.put<ApiResponse<Gate>>(`/gates/${id}`, data),
};

// Staff
export const staffApi = {
  getAll: () => api.get<ApiResponse<Staff[]>>('/staff'),
  getById: (id: string) => api.get<ApiResponse<Staff>>(`/staff/${id}`),
  create: (data: Partial<Staff>) => api.post<ApiResponse<Staff>>('/staff', data),
  update: (id: string, data: Partial<Staff>) => api.put<ApiResponse<Staff>>(`/staff/${id}`, data),
};

// Weather
export const weatherApi = {
  getCurrent: () => api.get<ApiResponse<Weather>>('/weather/current'),
};

// Runways
export const runwayApi = {
  getAll: () => api.get<ApiResponse<Runway[]>>('/runways'),
  getById: (id: string) => api.get<ApiResponse<Runway>>(`/runways/${id}`),
  update: (id: string, data: Partial<Runway>) => api.put<ApiResponse<Runway>>(`/runways/${id}`, data),
};

// Baggage
export const baggageApi = {
  getAll: (flightId?: string) => 
    api.get<ApiResponse<Baggage[]>>('/baggage', { params: { flightId } }),
  getById: (id: string) => api.get<ApiResponse<Baggage>>(`/baggage/${id}`),
  create: (data: Partial<Baggage>) => api.post<ApiResponse<Baggage>>('/baggage', data),
  update: (id: string, data: Partial<Baggage>) => 
    api.put<ApiResponse<Baggage>>(`/baggage/${id}`, data),
};

// Maintenance
export const maintenanceApi = {
  getAll: () => api.get<ApiResponse<Maintenance[]>>('/maintenance'),
  getById: (id: string) => api.get<ApiResponse<Maintenance>>(`/maintenance/${id}`),
  create: (data: Partial<Maintenance>) => api.post<ApiResponse<Maintenance>>('/maintenance', data),
  update: (id: string, data: Partial<Maintenance>) => 
    api.put<ApiResponse<Maintenance>>(`/maintenance/${id}`, data),
};

// Security
export const securityApi = {
  getAll: () => api.get<ApiResponse<SecurityAlert[]>>('/security/alerts'),
  getById: (id: string) => api.get<ApiResponse<SecurityAlert>>(`/security/alerts/${id}`),
  create: (data: Partial<SecurityAlert>) => 
    api.post<ApiResponse<SecurityAlert>>('/security/alerts', data),
  update: (id: string, data: Partial<SecurityAlert>) => 
    api.put<ApiResponse<SecurityAlert>>(`/security/alerts/${id}`, data),
};

// Dashboard
export const dashboardApi = {
  getStats: () => api.get<ApiResponse<DashboardStats>>('/dashboard/stats'),
};

export default api;
