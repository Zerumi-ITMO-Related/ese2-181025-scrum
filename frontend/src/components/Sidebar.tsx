import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Plane,
  Users,
  DoorOpen,
  UserCheck,
  Cloud,
  PackageCheck,
  Wrench,
  ShieldAlert,
  LayoutDashboard,
  Building2,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/flights', label: 'Flights', icon: <Plane size={20} /> },
  { path: '/airlines', label: 'Airlines', icon: <Building2 size={20} /> },
  { path: '/passengers', label: 'Passengers', icon: <Users size={20} /> },
  { path: '/gates', label: 'Gates', icon: <DoorOpen size={20} /> },
  { path: '/staff', label: 'Staff', icon: <UserCheck size={20} /> },
  { path: '/weather', label: 'Weather', icon: <Cloud size={20} /> },
  { path: '/baggage', label: 'Baggage', icon: <PackageCheck size={20} /> },
  { path: '/maintenance', label: 'Maintenance', icon: <Wrench size={20} /> },
  { path: '/security', label: 'Security', icon: <ShieldAlert size={20} /> },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Plane className="text-blue-400" />
          <span>Airport Admin</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Management Portal</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <div className="text-xs text-gray-500">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2025 Airport Admin</p>
        </div>
      </div>
    </div>
  );
};
