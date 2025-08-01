'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { formatPrice, truncateText } from '../../lib/api';
import { toast } from 'sonner';

interface CartSliderProps {
  children: React.ReactNode;
}

const CartSlider = ({ children }: CartSliderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { items, total, itemCount } = useAppSelector((state) => state.cart);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
      toast.success('Item removed from cart');
      return;
    }
    dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed from cart');
  };

  const subtotal = total;
  const shipping = total > 50 ? 0 : 5.99;
  const finalTotal = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0 bg-white">
        <SheetHeader className="px-6 py-5 border-b border-gray-100">
          <SheetTitle className="flex items-center text-lg font-semibold text-gray-900">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shopping Cart
            {itemCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-black text-white text-xs px-2 py-1">
                {itemCount}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-gray-300" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6">
                Add some products to get started
              </p>
              <Button 
                onClick={() => setIsOpen(false)} 
                className="bg-black text-white hover:bg-gray-900 transition-colors px-6 py-2"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex space-x-4 p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors bg-white">
                    {/* Product Image */}
                    <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-contain p-2"
                        sizes="64px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight mb-1 text-gray-900">
                        {truncateText(item.product.title, 40)}
                      </h4>
                      <p className="text-xs text-gray-500 capitalize mb-2">
                        {item.product.category}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="h-8 w-8 p-0 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center text-gray-900">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(item.product.id)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-sm text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100"></div>

            {/* Cart Summary */}
            <div className="px-6 py-5 space-y-4 bg-gray-50">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {total < 50 && (
                  <div className="text-xs text-gray-500 bg-blue-50 border border-blue-100 p-3 rounded-lg">
                    Add {formatPrice(50 - total)} more for free shipping!
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-black">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link href="/checkout" className="block">
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-900 transition-colors py-3 text-base font-medium" 
                    size="lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Checkout
                  </Button>
                </Link>
                <Link href="/cart" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-200 hover:bg-gray-50 transition-colors py-3 text-base"
                    onClick={() => setIsOpen(false)}
                  >
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSlider;