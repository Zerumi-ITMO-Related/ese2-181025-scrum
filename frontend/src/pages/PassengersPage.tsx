import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, LoadingSpinner } from '../components/UIComponents';
import { passengerApi } from '../services/api';
import type { Passenger, CheckInStatus } from '../types';
import { Users, Plus, RefreshCw } from 'lucide-react';

export const PassengersPage: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPassengers();
  }, []);

  const loadPassengers = async () => {
    setLoading(true);
    try {
      const response = await passengerApi.getAll();
      if (response.data.success && response.data.data) {
        setPassengers(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load passengers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCheckInBadge = (status: CheckInStatus) => {
    const statusMap: Record<CheckInStatus, 'success' | 'warning' | 'danger' | 'info'> = {
      NOT_CHECKED_IN: 'warning',
      CHECKED_IN: 'success',
      BOARDED: 'info',
      NO_SHOW: 'danger',
    };
    return <Badge variant={statusMap[status]}>{status.replace('_', ' ')}</Badge>;
  };

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
            <Users className="text-blue-600" />
            Passenger Management
          </h1>
          <p className="text-gray-600 mt-2">Track and manage passenger information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadPassengers}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Passenger
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Passenger
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Passport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nationality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Flight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Seat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Check-in Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Baggage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {passengers.map((passenger) => (
                <tr key={passenger.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {passenger.firstName} {passenger.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{passenger.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {passenger.passportNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {passenger.nationality}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info">{passenger.flightId}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {passenger.seatNumber || <span className="text-gray-400">Not assigned</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCheckInBadge(passenger.checkInStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {passenger.baggageCount} {passenger.baggageCount === 1 ? 'piece' : 'pieces'}
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
