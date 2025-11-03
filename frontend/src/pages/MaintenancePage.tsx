import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, LoadingSpinner } from '../components/UIComponents';
import { maintenanceApi } from '../services/api';
import type { Maintenance, MaintenanceStatus, MaintenancePriority } from '../types';
import { Wrench, Plus, RefreshCw } from 'lucide-react';

export const MaintenancePage: React.FC = () => {
  const [maintenance, setMaintenance] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMaintenance();
  }, []);

  const loadMaintenance = async () => {
    setLoading(true);
    try {
      const response = await maintenanceApi.getAll();
      if (response.data.success && response.data.data) {
        setMaintenance(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load maintenance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: MaintenanceStatus) => {
    const statusMap: Record<MaintenanceStatus, 'success' | 'warning' | 'danger' | 'info'> = {
      SCHEDULED: 'info',
      IN_PROGRESS: 'warning',
      COMPLETED: 'success',
      CANCELLED: 'danger',
      OVERDUE: 'danger',
    };
    return <Badge variant={statusMap[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const getPriorityBadge = (priority: MaintenancePriority) => {
    const priorityMap: Record<MaintenancePriority, 'success' | 'warning' | 'danger' | 'info'> = {
      LOW: 'info',
      MEDIUM: 'warning',
      HIGH: 'warning',
      CRITICAL: 'danger',
    };
    return <Badge variant={priorityMap[priority]} size="sm">{priority}</Badge>;
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
            <Wrench className="text-blue-600" />
            Maintenance Management
          </h1>
          <p className="text-gray-600 mt-2">Track facility and equipment maintenance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadMaintenance}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Scheduled Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Technician
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenance.map((maint) => (
                <tr key={maint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {maint.targetType.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-gray-500">{maint.targetId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {maint.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(maint.scheduledDate).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(maint.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(maint.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {maint.technician}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {maint.actualDuration || maint.estimatedDuration} min
                    {maint.actualDuration && maint.actualDuration !== maint.estimatedDuration && (
                      <span className="text-gray-500 text-xs ml-1">
                        (est. {maint.estimatedDuration})
                      </span>
                    )}
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
