import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, LoadingSpinner, Table } from '../components/UIComponents';
import { flightApi } from '../services/api';
import type { Flight, FlightStatus } from '../types';
import { Plane, Plus, RefreshCw } from 'lucide-react';

export const FlightsPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FlightStatus | 'ALL'>('ALL');

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    setLoading(true);
    try {
      const response = await flightApi.getAll();
      if (response.data.success && response.data.data) {
        setFlights(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: FlightStatus) => {
    const statusMap: Record<FlightStatus, 'success' | 'warning' | 'danger' | 'info'> = {
      SCHEDULED: 'info',
      BOARDING: 'warning',
      DEPARTED: 'success',
      IN_FLIGHT: 'success',
      LANDED: 'info',
      ARRIVED: 'success',
      DELAYED: 'danger',
      CANCELLED: 'danger',
    };
    return <Badge variant={statusMap[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const filteredFlights = filter === 'ALL' 
    ? flights 
    : flights.filter(f => f.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Plane className="text-blue-600" />
            Flight Management
          </h1>
          <p className="text-gray-600 mt-2">Manage and monitor all flights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadFlights}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Flight
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['ALL', 'SCHEDULED', 'BOARDING', 'IN_FLIGHT', 'DELAYED', 'CANCELLED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as FlightStatus | 'ALL')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Flights Table */}
      <Card>
        <Table headers={[
          'Flight Number',
          'Route',
          'Departure',
          'Arrival',
          'Status',
          'Gate',
          'Aircraft',
          'Capacity',
          'Delay',
        ]}>
          {filteredFlights.map((flight) => (
            <tr key={flight.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-semibold text-gray-900">{flight.flightNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{flight.origin}</div>
                  <div className="text-gray-500">→ {flight.destination}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(flight.departureTime).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(flight.arrivalTime).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(flight.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {flight.gateId ? (
                  <Badge variant="info">{flight.gateId}</Badge>
                ) : (
                  <span className="text-gray-400">Not Assigned</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {flight.aircraftType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm text-gray-900">
                    {flight.bookedSeats}/{flight.capacity}
                  </div>
                  <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(flight.bookedSeats / flight.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {flight.delayMinutes > 0 ? (
                  <span className="text-red-600 font-medium">+{flight.delayMinutes} min</span>
                ) : (
                  <span className="text-green-600">On Time</span>
                )}
              </td>
            </tr>
          ))}
        </Table>
        {filteredFlights.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No flights found matching the filter
          </div>
        )}
      </Card>
    </div>
  );
};
