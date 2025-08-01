'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { Product } from '../../types/product';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

const AddToCartButton = ({ 
  product, 
  variant = 'default', 
  size = 'default',
  className,
  children
}: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    if (isAdding || justAdded) return;

    setIsAdding(true);
    
    try {
      // Add to cart
      dispatch(addToCart(product));
      
      // Show success toast
      toast.success(`${product.title} added to cart!`, {
        description: 'You can view your cart by clicking the cart icon.',
        duration: 3000,
      });
      
      // Show success state
      setJustAdded(true);
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart', {
        description: 'Please try again.',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const getButtonContent = () => {
    if (isAdding) {
      return (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Adding...
        </>
      );
    }
    
    if (justAdded) {
      return (
        <>
          <Check className="w-4 h-4 mr-2" />
          Added!
        </>
      );
    }
    
    return children || (
      <>
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
      </>
    );
  };

  const getButtonVariant = () => {
    if (justAdded) return 'secondary';
    return variant;
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      variant={getButtonVariant()}
      size={size}
      className={`touch-target transition-all duration-200 ${className}`}
    >
      {getButtonContent()}
    </Button>
  );
};

export default AddToCartButton;