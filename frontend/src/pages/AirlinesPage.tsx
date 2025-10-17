import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, LoadingSpinner, Table } from '../components/UIComponents';
import { airlineApi } from '../services/api';
import type { Airline } from '../types';
import { Building2, Plus, RefreshCw, Star } from 'lucide-react';

export const AirlinesPage: React.FC = () => {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAirlines();
  }, []);

  const loadAirlines = async () => {
    setLoading(true);
    try {
      const response = await airlineApi.getAll();
      if (response.data.success && response.data.data) {
        setAirlines(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load airlines:', error);
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="text-blue-600" />
            Airline Management
          </h1>
          <p className="text-gray-600 mt-2">Manage partner airlines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadAirlines}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Airline
          </Button>
        </div>
      </div>

      {/* Airlines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {airlines.map((airline) => (
          <Card key={airline.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{airline.name}</h3>
                  <Badge variant="info" size="sm">{airline.code}</Badge>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="font-medium">{airline.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium text-gray-900">{airline.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Flights:</span>
                  <Badge variant="success">{airline.activeFlights}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-blue-600 text-xs">{airline.contactEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-900">{airline.contactPhone}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-2">
                <Button size="sm" className="flex-1">Edit</Button>
                <Button size="sm" variant="secondary" className="flex-1">View Flights</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
