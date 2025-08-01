"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  Calendar,
  DollarSign,
  Truck,
  Headphones,
  RotateCcw,
  Search,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import OrderTable from "../../components/orders/OrderTable";
import { useAppSelector } from "../../store/hooks";
import { formatPrice } from "../../lib/api";

export default function OrdersPage() {
  const orders = useAppSelector((state) => state.orders.items);

  const totalSpent = orders.reduce((total, order) => total + order.total, 0);
  const totalItems = orders.reduce(
    (total, order) => total + order.items.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/cart">
              <Button className="bg-black text-white hover:bg-gray-900 transition-colors">
                <ShoppingBag className="w-4 h-4 mr-2" />
                View Cart
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
              Order History
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track and manage all your previous orders in one place
            </p>
          </div>
        </div>

        {/* Orders Content */}
        {orders.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg bg-white text-center p-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Orders Yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven&apos;t placed any orders yet. Start shopping to see
                your order history here.
              </p>
              <Link href="/">
                <Button className="bg-black text-white hover:bg-gray-900 transition-colors px-8 py-3">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {orders.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {totalItems}
                  </div>
                  <div className="text-sm text-gray-600">Items Purchased</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {formatPrice(totalSpent)}
                  </div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {orders.length > 0
                      ? new Date(orders[0].orderDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )
                      : "-"}
                  </div>
                  <div className="text-sm text-gray-600">Last Order</div>
                </CardContent>
              </Card>
            </div>

            {/* Orders Table Section */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Recent Orders ({orders.length})
                  </CardTitle>
                  <Button
                    variant="outline"
                    className="border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Orders
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <OrderTable orders={orders} />
              </CardContent>
            </Card>

            {/* Help & Support Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Track Orders
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get real-time updates on your package delivery status
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    Track Package
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Easy Returns
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Hassle-free returns within 30 days of purchase
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-green-200 hover:bg-green-50 transition-colors"
                  >
                    Return Item
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    24/7 Support
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get help from our expert customer support team
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-purple-200 hover:bg-purple-50 transition-colors"
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Premium Support Banner */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-900 to-black text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Premium Customer Experience
                </h3>
                <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
                  As a valued Tech Element customer, you have access to our
                  premium support services, priority shipping, and exclusive
                  member benefits.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors"
                  >
                    Member Benefits
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors"
                  >
                    Priority Support
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors"
                  >
                    Loyalty Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
