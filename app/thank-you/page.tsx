"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Package,
  ArrowRight,
  Home,
  Mail,
  Truck,
  RotateCcw,
  Headphones,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useAppSelector } from "../../store/hooks";
import { formatPrice, truncateText } from "../../lib/api";
import Image from "next/image";

export default function ThankYouPage() {
  const router = useRouter();
  const orders = useAppSelector((state) => state.orders.items);
  const [latestOrder, setLatestOrder] = useState(orders[0] || null);

  useEffect(() => {
    // If no orders exist, redirect to home after a delay to allow for order creation
    const checkOrders = () => {
      if (orders.length === 0) {
        router.push("/");
        return;
      }
      // Get the most recent order
      setLatestOrder(orders[0]);
    };

    // Check immediately
    checkOrders();

    // Also check after a short delay in case order is still being created
    const timeout = setTimeout(checkOrders, 500);

    return () => clearTimeout(timeout);
  }, [orders, router]);

  if (!latestOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        {/* Success Header */}
        <div className="text-center mb-16">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Thank you for choosing Tech Element. Your order has been
            successfully placed and will be processed with care.
          </p>
          <div className="mt-8 inline-flex items-center px-6 py-3 bg-green-50 border border-green-200 rounded-full">
            <span className="text-green-800 font-medium">
              Order #{latestOrder.id}
            </span>
          </div>
        </div>

        {/* Order Details */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Order Summary Card */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                <Package className="w-6 h-6 mr-3" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(latestOrder.orderDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-gray-900">
                    {latestOrder.customerInfo.fullName}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Items</p>
                  <p className="font-semibold text-gray-900">
                    {latestOrder.items.length} Products
                  </p>
                </div>
                <div className="text-center p-4 bg-black rounded-lg">
                  <p className="text-sm text-gray-300 mb-1">Total Amount</p>
                  <p className="font-bold text-xl text-white">
                    {formatPrice(latestOrder.total)}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Shipping Address
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900">
                    {latestOrder.customerInfo.fullName}
                  </p>
                  <p className="text-gray-600 mt-1">
                    {latestOrder.customerInfo.shippingAddress}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Phone: {latestOrder.customerInfo.phoneNumber}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Items Ordered ({latestOrder.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {latestOrder.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-contain p-3"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-2">
                        {truncateText(item.product.title, 50)}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize mb-1">
                        Category: {item.product.category}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Confirmation Email
                    </h3>
                    <p className="text-sm text-gray-600">
                      You&apos;ll receive an order confirmation email with
                      tracking details within 5 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Fast Shipping
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your order will be processed and shipped within 1-2
                      business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Package Tracking
                    </h3>
                    <p className="text-sm text-gray-600">
                      Track your package in real-time using the tracking number
                      in your email.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Easy Returns
                    </h3>
                    <p className="text-sm text-gray-600">
                      Not satisfied? Return within 30 days for a full refund, no
                      questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/orders" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-14 text-base border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Package className="w-5 h-5 mr-3" />
                View All Orders
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full h-14 text-base bg-black text-white hover:bg-gray-900 transition-colors">
                <Home className="w-5 h-5 mr-3" />
                Continue Shopping
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </div>

          {/* Support Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-900 to-black text-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Our premium support team is available 24/7 to assist you with
                any questions about your order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors"
                >
                  support@techelement.com
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors"
                >
                  1-800-TECH-HELP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
