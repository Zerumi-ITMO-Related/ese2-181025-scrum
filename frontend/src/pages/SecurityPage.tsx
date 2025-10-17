import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, LoadingSpinner } from '../components/UIComponents';
import { securityApi } from '../services/api';
import type { SecurityAlert, SecurityLevel, AlertStatus } from '../types';
import { ShieldAlert, Plus, RefreshCw } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const response = await securityApi.getAll();
      if (response.data.success && response.data.data) {
        setAlerts(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load security alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelBadge = (level: SecurityLevel) => {
    const levelMap: Record<SecurityLevel, 'success' | 'warning' | 'danger' | 'info'> = {
      LOW: 'info',
      MEDIUM: 'warning',
      HIGH: 'warning',
      CRITICAL: 'danger',
    };
    return <Badge variant={levelMap[level]}>{level}</Badge>;
  };

  const getStatusBadge = (status: AlertStatus) => {
    const statusMap: Record<AlertStatus, 'success' | 'warning' | 'danger' | 'info'> = {
      ACTIVE: 'danger',
      INVESTIGATING: 'warning',
      RESOLVED: 'success',
      FALSE_ALARM: 'info',
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

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');
  const investigatingAlerts = alerts.filter(a => a.status === 'INVESTIGATING');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldAlert className="text-blue-600" />
            Security Monitoring
          </h1>
          <p className="text-gray-600 mt-2">Monitor and manage security alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadAlerts}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button variant="danger">
            <Plus size={16} className="mr-2" />
            Report Alert
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-red-50 border border-red-200">
          <div className="text-center">
            <p className="text-sm text-red-600 font-medium">ACTIVE ALERTS</p>
            <p className="text-4xl font-bold text-red-700 mt-2">{activeAlerts.length}</p>
          </div>
        </Card>
        <Card className="bg-yellow-50 border border-yellow-200">
          <div className="text-center">
            <p className="text-sm text-yellow-600 font-medium">INVESTIGATING</p>
            <p className="text-4xl font-bold text-yellow-700 mt-2">{investigatingAlerts.length}</p>
          </div>
        </Card>
        <Card className="bg-green-50 border border-green-200">
          <div className="text-center">
            <p className="text-sm text-green-600 font-medium">RESOLVED TODAY</p>
            <p className="text-4xl font-bold text-green-700 mt-2">
              {alerts.filter(a => a.status === 'RESOLVED').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Alerts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Reported By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr key={alert.id} className={`hover:bg-gray-50 ${
                  alert.status === 'ACTIVE' ? 'bg-red-50' : ''
                }`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(alert.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getLevelBadge(alert.level)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {alert.location}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md">
                      {alert.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(alert.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alert.reportedBy}
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
