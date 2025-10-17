import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, LoadingSpinner, Table } from '../components/UIComponents';
import { staffApi } from '../services/api';
import type { Staff, StaffStatus, StaffRole } from '../types';
import { UserCheck, Plus, RefreshCw } from 'lucide-react';

export const StaffPage: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StaffStatus | 'ALL'>('ALL');

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    setLoading(true);
    try {
      const response = await staffApi.getAll();
      if (response.data.success && response.data.data) {
        setStaff(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: StaffStatus) => {
    const statusMap: Record<StaffStatus, 'success' | 'warning' | 'danger' | 'info'> = {
      ON_DUTY: 'success',
      OFF_DUTY: 'default' as any,
      ON_BREAK: 'warning',
      SICK_LEAVE: 'danger',
      VACATION: 'info',
    };
    return <Badge variant={statusMap[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const getRoleBadge = (role: StaffRole) => {
    const colors: Record<StaffRole, 'info' | 'success' | 'warning'> = {
      GATE_AGENT: 'info',
      SECURITY: 'warning',
      CUSTOMS: 'info',
      GROUND_CREW: 'success',
      AIR_TRAFFIC_CONTROLLER: 'warning',
      MAINTENANCE: 'info',
      MANAGER: 'success',
      CUSTOMER_SERVICE: 'info',
    };
    return <Badge variant={colors[role]} size="sm">{role.replace('_', ' ')}</Badge>;
  };

  const filteredStaff = statusFilter === 'ALL' 
    ? staff 
    : staff.filter(s => s.status === statusFilter);

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
            <UserCheck className="text-blue-600" />
            Staff Management
          </h1>
          <p className="text-gray-600 mt-2">Manage airport personnel</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadStaff}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {['ALL', 'ON_DUTY', 'OFF_DUTY', 'ON_BREAK', 'SICK_LEAVE', 'VACATION'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status as StaffStatus | 'ALL')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Staff Table */}
      <Card>
        <Table headers={[
          'Employee',
          'Role',
          'Employee ID',
          'Contact',
          'Shift',
          'Status',
          'Assigned Gate',
          'Certifications',
        ]}>
          {filteredStaff.map((staffMember) => (
            <tr key={staffMember.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="font-medium text-gray-900">
                    {staffMember.firstName} {staffMember.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{staffMember.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getRoleBadge(staffMember.role)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                {staffMember.employeeId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {staffMember.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {staffMember.shift}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(staffMember.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {staffMember.assignedGate ? (
                  <Badge variant="info">{staffMember.assignedGate}</Badge>
                ) : (
                  <span className="text-gray-400">None</span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {staffMember.certifications.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      {cert}
                    </span>
                  ))}
                  {staffMember.certifications.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{staffMember.certifications.length - 2} more
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
        {filteredStaff.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No staff members found matching the filter
          </div>
        )}
      </Card>
    </div>
  );
};
