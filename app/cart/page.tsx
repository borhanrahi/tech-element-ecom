'use client';

import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import EmptyState from '../../components/common/EmptyState';
import { useAppSelector } from '../../store/hooks';

export default function CartPage() {
  const { items } = useAppSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="touch-target">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>

          {/* Empty State */}
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Add some products to your cart to get started with your order."
            action={{
              label: "Start Shopping",
              onClick: () => window.location.href = '/',
            }}
            className="py-20"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" className="touch-target">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground mt-2">
            Review your items and proceed to checkout
          </p>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                On orders over $50
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                30-day return policy
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">
                SSL encrypted checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}