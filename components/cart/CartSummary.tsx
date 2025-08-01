'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useAppSelector } from '../../store/hooks';
import { formatPrice } from '../../lib/api';

const CartSummary = () => {
  const { items, total, itemCount } = useAppSelector((state) => state.cart);

  const subtotal = total;
  const shipping = total > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items Count */}
        <div className="flex justify-between text-sm">
          <span>Items ({itemCount})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'text-green-600' : ''}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>

        {/* Free Shipping Notice */}
        {total < 50 && (
          <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
            Add {formatPrice(50 - total)} more for free shipping!
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">{formatPrice(finalTotal)}</span>
        </div>

        {/* Checkout Button */}
        <Link href="/checkout" className="block">
          <Button className="w-full touch-target" size="lg">
            Proceed to Checkout
          </Button>
        </Link>

        {/* Continue Shopping */}
        <Link href="/" className="block">
          <Button variant="outline" className="w-full touch-target">
            Continue Shopping
          </Button>
        </Link>

        {/* Security Notice */}
        <div className="text-xs text-muted-foreground text-center pt-2">
          🔒 Secure checkout with SSL encryption
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;