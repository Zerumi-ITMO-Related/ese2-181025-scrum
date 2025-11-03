import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, LoadingSpinner } from '../components/UIComponents';
import { baggageApi } from '../services/api';
import type { Baggage, BaggageStatus } from '../types';
import { PackageCheck, Plus, RefreshCw } from 'lucide-react';

export const BaggagePage: React.FC = () => {
  const [baggage, setBaggage] = useState<Baggage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBaggage();
  }, []);

  const loadBaggage = async () => {
    setLoading(true);
    try {
      const response = await baggageApi.getAll();
      if (response.data.success && response.data.data) {
        setBaggage(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load baggage:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: BaggageStatus) => {
    const statusMap: Record<BaggageStatus, 'success' | 'warning' | 'danger' | 'info'> = {
      CHECKED_IN: 'info',
      IN_TRANSIT: 'warning',
      LOADED: 'success',
      DELIVERED: 'success',
      LOST: 'danger',
      DELAYED: 'warning',
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
            <PackageCheck className="text-blue-600" />
            Baggage Tracking
          </h1>
          <p className="text-gray-600 mt-2">Track and manage passenger baggage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadBaggage}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Baggage
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tag Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Passenger
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Flight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {baggage.map((bag) => (
                <tr key={bag.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono font-medium text-gray-900">{bag.tagNumber}</div>
                    {bag.specialHandling && (
                      <Badge variant="warning" size="sm">Special Handling</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Badge variant="info" size="sm">{bag.passengerId}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Badge variant="info" size="sm">{bag.flightId}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bag.type.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bag.weight.toFixed(1)} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(bag.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bag.location}
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
