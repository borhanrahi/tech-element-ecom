'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminStats from '@/components/admin/AdminStats';
import UserManagement from '@/components/admin/UserManagement';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { users } = useAppSelector((state) => state.users);
  
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className="flex-shrink-0">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Inactive Users Warning */}
        {inactiveUsers > 5 && (
          <div className="bg-yellow-50 border-b border-yellow-200 p-4 z-30 flex-shrink-0">
            <div className="flex items-center space-x-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">
                Warning: Too many inactive users ({inactiveUsers} inactive users found)
              </span>
            </div>
          </div>
        )}

        {/* Top Navigation */}
        <div className="flex-shrink-0">
          <AdminHeader setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <AdminStats />

            {/* User Management Section */}
            <UserManagement />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;