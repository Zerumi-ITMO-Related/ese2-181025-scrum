import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, LoadingSpinner, Table } from '../components/UIComponents';
import { gateApi } from '../services/api';
import type { Gate, GateStatus } from '../types';
import { DoorOpen, Plus, RefreshCw } from 'lucide-react';

export const GatesPage: React.FC = () => {
  const [gates, setGates] = useState<Gate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<GateStatus | 'ALL'>('ALL');

  useEffect(() => {
    loadGates();
  }, []);

  const loadGates = async () => {
    setLoading(true);
    try {
      const response = await gateApi.getAll();
      if (response.data.success && response.data.data) {
        setGates(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load gates:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: GateStatus) => {
    const statusMap: Record<GateStatus, 'success' | 'warning' | 'danger' | 'info'> = {
      AVAILABLE: 'success',
      OCCUPIED: 'info',
      MAINTENANCE: 'warning',
      CLOSED: 'danger',
    };
    return <Badge variant={statusMap[status]}>{status}</Badge>;
  };

  const filteredGates = filter === 'ALL' 
    ? gates 
    : gates.filter(g => g.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const terminalGroups = filteredGates.reduce((acc, gate) => {
    if (!acc[gate.terminal]) {
      acc[gate.terminal] = [];
    }
    acc[gate.terminal].push(gate);
    return acc;
  }, {} as Record<string, Gate[]>);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <DoorOpen className="text-blue-600" />
            Gate Management
          </h1>
          <p className="text-gray-600 mt-2">Monitor and manage airport gates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadGates}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Gate
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {['ALL', 'AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'CLOSED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as GateStatus | 'ALL')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Terminal Groups */}
      <div className="space-y-8">
        {Object.entries(terminalGroups).map(([terminal, terminalGates]) => (
          <Card key={terminal} title={`Terminal ${terminal}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {terminalGates.map((gate) => (
                <div
                  key={gate.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    gate.status === 'AVAILABLE'
                      ? 'border-green-300 bg-green-50'
                      : gate.status === 'OCCUPIED'
                      ? 'border-blue-300 bg-blue-50'
                      : gate.status === 'MAINTENANCE'
                      ? 'border-yellow-300 bg-yellow-50'
                      : 'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{gate.number}</h3>
                      <p className="text-sm text-gray-600">Terminal {gate.terminal}</p>
                    </div>
                    {getStatusBadge(gate.status)}
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{gate.capacity}</span>
                    </div>
                    {gate.currentFlightId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flight:</span>
                        <Badge variant="info" size="sm">{gate.currentFlightId}</Badge>
                      </div>
                    )}
                    {gate.facilities.length > 0 && (
                      <div className="mt-2">
                        <p className="text-gray-600 text-xs mb-1">Facilities:</p>
                        <div className="flex flex-wrap gap-1">
                          {gate.facilities.slice(0, 2).map((facility, idx) => (
                            <span key={idx} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
