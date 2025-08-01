'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useAppDispatch } from '../../store/hooks';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { CartItem as CartItemType } from '../../types/cart';
import { formatPrice, truncateText } from '../../lib/api';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove();
      return;
    }
    
    dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
    toast.success('Item removed from cart');
  };

  const itemTotal = product.price * quantity;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Link href={`/product/${product.id}`}>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform"
                  sizes="(max-width: 640px) 80px, 96px"
                />
              </div>
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="flex-1">
                <Link 
                  href={`/product/${product.id}`}
                  className="hover:text-primary transition-colors"
                >
                  <h3 className="font-semibold text-sm sm:text-base leading-tight">
                    {truncateText(product.title, 80)}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground capitalize mt-1">
                  {product.category}
                </p>
                <p className="text-sm font-medium mt-1">
                  {formatPrice(product.price)} each
                </p>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-lg font-bold text-primary">
                  {formatPrice(itemTotal)}
                </p>
              </div>
            </div>

            {/* Quantity Controls and Remove */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="h-8 w-8 p-0 touch-target"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-8 w-8 p-0 touch-target"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 touch-target"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;