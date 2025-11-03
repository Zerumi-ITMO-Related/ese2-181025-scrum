import React, { useEffect, useState } from 'react';
import { StatCard, Card, Badge, LoadingSpinner } from '../components/UIComponents';
import { dashboardApi, flightApi } from '../services/api';
import type { DashboardStats, Flight } from '../types';
import { Plane, Users, DoorOpen, UserCheck, AlertTriangle, Cloud } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentFlights, setRecentFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsResponse, flightsResponse] = await Promise.all([
        dashboardApi.getStats(),
        flightApi.getAll(),
      ]);
      
      if (statsResponse.data.success && statsResponse.data.data) {
        setStats(statsResponse.data.data);
      }
      
      if (flightsResponse.data.success && flightsResponse.data.data) {
        setRecentFlights(flightsResponse.data.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!stats) {
    return <div>Failed to load dashboard</div>;
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
      SCHEDULED: 'info',
      BOARDING: 'warning',
      DEPARTED: 'success',
      IN_FLIGHT: 'success',
      DELAYED: 'danger',
      CANCELLED: 'danger',
    };
    return <Badge variant={statusMap[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Airport Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Flights"
          value={stats.totalFlights}
          icon={<Plane size={24} />}
          color="blue"
        />
        <StatCard
          title="Active Flights"
          value={stats.activeFlights}
          icon={<Plane size={24} />}
          color="green"
        />
        <StatCard
          title="Delayed Flights"
          value={stats.delayedFlights}
          icon={<AlertTriangle size={24} />}
          color="red"
        />
        <StatCard
          title="Total Passengers"
          value={stats.totalPassengers}
          icon={<Users size={24} />}
          color="purple"
        />
        <StatCard
          title="Available Gates"
          value={stats.availableGates}
          icon={<DoorOpen size={24} />}
          color="indigo"
        />
        <StatCard
          title="Staff On Duty"
          value={stats.staffOnDuty}
          icon={<UserCheck size={24} />}
          color="green"
        />
        <StatCard
          title="Weather"
          value={stats.weatherCondition}
          icon={<Cloud size={24} />}
          color="blue"
        />
        <StatCard
          title="Security Alerts"
          value={stats.securityAlerts}
          icon={<AlertTriangle size={24} />}
          color={stats.securityAlerts > 0 ? 'red' : 'green'}
        />
      </div>

      {/* Recent Flights */}
      <Card title="Recent Flights">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Flight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Departure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Gate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Capacity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentFlights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{flight.flightNumber}</div>
                    <div className="text-sm text-gray-500">{flight.aircraftType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {flight.origin} → {flight.destination}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(flight.departureTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(flight.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {flight.gateId || 'Not Assigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {flight.bookedSeats}/{flight.capacity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
