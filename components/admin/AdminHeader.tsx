'use client';

import { Menu, Bell, Search, Settings, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { toast } from 'sonner';

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const AdminHeader = ({ setSidebarOpen }: AdminHeaderProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.users);
  
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const totalNotifications = inactiveUsers > 5 ? inactiveUsers : 3;

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 w-full">
      <div className="flex items-center space-x-4 min-w-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </Button>
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-gray-900 truncate">Dashboard</h1>
          <p className="text-sm text-gray-500 hidden sm:block truncate">Welcome back, {user?.username}</p>
        </div>
      </div>
      
      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search users, orders, analytics..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3 flex-shrink-0">
        {/* Mobile Search Button */}
        <Button variant="ghost" size="sm" className="md:hidden p-2 hover:bg-gray-100 rounded-md">
          <Search className="w-5 h-5 text-gray-600" />
        </Button>
        
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100 rounded-md">
              <Bell className="w-5 h-5 text-gray-600" />
              {totalNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                  {totalNotifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b">
              <h3 className="font-semibold text-sm">Notifications</h3>
              <p className="text-xs text-gray-500">{totalNotifications} new notifications</p>
            </div>
            {inactiveUsers > 5 && (
              <DropdownMenuItem className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Too many inactive users</p>
                    <p className="text-xs text-gray-500">{inactiveUsers} users are currently inactive</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="p-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-gray-500">John Smith joined the platform</p>
                  <p className="text-xs text-gray-400">5 minutes ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">System update completed</p>
                  <p className="text-xs text-gray-500">All systems are running smoothly</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <div className="p-3 border-t">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-md">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="w-4 h-4 mr-2" />
              Security
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Bell className="w-4 h-4 mr-2" />
              Notification Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 pl-3 border-l border-gray-200 cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{user?.username}</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{user?.username}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="w-4 h-4 mr-2" />
              Security
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;