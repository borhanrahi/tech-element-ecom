'use client';

import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';

const AdminStats = () => {
  const { users } = useAppSelector((state) => state.users);
  const orders = useAppSelector((state) => state.orders.items);

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
          <p className="text-xs text-gray-500 mt-1">
            {activeUsers} active, {inactiveUsers} inactive
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
          <p className="text-xs text-green-600 mt-1">
            +12% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-green-600 mt-1">
            +8% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Growth</CardTitle>
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">+15%</div>
          <p className="text-xs text-green-600 mt-1">
            User growth this month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;