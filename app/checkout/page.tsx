"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CheckoutForm from "../../components/forms/CheckoutForm";
import EmptyState from "../../components/common/EmptyState";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { createOrder } from "../../store/slices/ordersSlice";
import { clearCart } from "../../store/slices/cartSlice";
import { CustomerInfo } from "../../types/order";
import { formatPrice, truncateText } from "../../lib/api";
import { toast } from "sonner";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, total, itemCount } = useAppSelector((state) => state.cart);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  const handleOrderSubmit = async (customerInfo: CustomerInfo) => {
    try {
      // Calculate totals
      const subtotal = total;
      const shipping = total > 50 ? 0 : 5.99;
      const tax = subtotal * 0.08;
      const finalTotal = subtotal + shipping + tax;

      // Create order first
      dispatch(
        createOrder({
          customerInfo,
          items,
          total: Math.round(finalTotal * 100) / 100,
        })
      );

      // Show success message
      toast.success("Order placed successfully!", {
        description: "You will receive a confirmation email shortly.",
      });

      // Redirect to thank you page immediately
      router.push("/thank-you");
      
      // Clear cart after a short delay to prevent redirect issues
      setTimeout(() => {
        dispatch(clearCart());
      }, 1000);
      
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Failed to place order", {
        description: "Please try again.",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-8">
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Add some products to your cart before proceeding to checkout."
            action={{
              label: "Start Shopping",
              onClick: () => router.push("/"),
            }}
            className="py-20"
          />
        </div>
      </div>
    );
  }

  const subtotal = total;
  const shipping = total > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Link href="/cart">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
              Secure Checkout
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete your premium shopping experience with our secure,
              streamlined checkout
            </p>
          </div>
        </div>

        {/* Checkout Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-3">
              <CheckoutForm onSubmit={handleOrderSubmit} />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                            <Image
                              src={item.product.image}
                              alt={item.product.title}
                              fill
                              className="object-contain p-2"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 leading-tight mb-1">
                              {truncateText(item.product.title, 35)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      {/* Pricing Breakdown */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Subtotal ({itemCount} items)</span>
                          <span className="font-medium text-gray-900">
                            {formatPrice(subtotal)}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Shipping</span>
                          <span
                            className={`font-medium ${
                              shipping === 0
                                ? "text-green-600"
                                : "text-gray-900"
                            }`}
                          >
                            {shipping === 0 ? "FREE" : formatPrice(shipping)}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Tax</span>
                          <span className="font-medium text-gray-900">
                            {formatPrice(tax)}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4 mt-4">
                        {/* Total */}
                        <div className="flex justify-between font-bold text-xl">
                          <span className="text-gray-900">Total</span>
                          <span className="text-black">
                            {formatPrice(finalTotal)}
                          </span>
                        </div>
                      </div>

                      {/* Security Notice */}
                      <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
                        <div className="flex items-center justify-center text-sm text-green-800">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">
                            Secure SSL encrypted checkout
                          </span>
                        </div>
                        <p className="text-xs text-green-700 text-center mt-1">
                          Your payment information is protected with bank-level
                          security
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
