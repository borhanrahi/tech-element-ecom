"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShoppingBag,
  BarChart3,
  LogOut,
  X,
  Home,
  Settings,
  Bell,
  MessageSquare,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { toast } from "sonner";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.users);
  const orders = useAppSelector((state) => state.orders.items);

  const [activeItem, setActiveItem] = useState("dashboard");

  const inactiveUsers = users.filter((u) => u.status === "Inactive").length;
  const totalOrders = orders.length;

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "#",
      active: true,
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      href: "#",
      badge: users.length.toString(),
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingBag,
      href: "#",
      badge: totalOrders > 0 ? totalOrders.toString() : undefined,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "#",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      href: "#",
      badge: "12",
      badgeColor: "bg-blue-50 text-blue-600",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      href: "#",
      badge: inactiveUsers > 5 ? inactiveUsers.toString() : undefined,
      badgeColor: "bg-red-50 text-red-600",
    },
  ];

  const settingsItems = [
    {
      id: "profile",
      label: "Profile",
      icon: UserCheck,
      href: "#",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "#",
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:h-full ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TE</span>
          </div>
          <span className="font-semibold text-gray-800">Admin Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Navigation */}
      <div className="overflow-y-auto overflow-x-hidden flex-grow flex flex-col">
        <ul className="flex flex-col py-4 space-y-1">
          {/* Main Menu Section */}
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500 uppercase">
                Menu
              </div>
            </div>
          </li>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 w-full transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 border-indigo-500"
                      : ""
                  }`}
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge
                      className={`ml-auto text-xs font-medium tracking-wide rounded-full ${
                        item.badgeColor || "bg-indigo-50 text-indigo-600"
                      }`}
                      variant="secondary"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              </li>
            );
          })}

          {/* Settings Section */}
          <li className="px-5 pt-4">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500 uppercase">
                Settings
              </div>
            </div>
          </li>

          {settingsItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 w-full transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 border-indigo-500"
                      : ""
                  }`}
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}

          {/* Back to Store */}
          <li className="px-5 pt-4">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500 uppercase">
                Navigation
              </div>
            </div>
          </li>

          <li>
            <Link
              href="/"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 transition-all duration-200"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <Home className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Back to Store
              </span>
            </Link>
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-red-50 text-gray-600 hover:text-red-600 border-l-4 border-transparent hover:border-red-500 pr-6 w-full transition-all duration-200"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <LogOut className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>

      {/* User Info at Bottom */}
      <div className="mt-auto p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {user?.username}
            </div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
