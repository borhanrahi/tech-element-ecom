import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Product } from '../../types/product';
import { formatPrice, truncateText } from '../../lib/api';
import AddToCartButton from '../cart/AddToCartButton';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 h-full flex flex-col ${className}`}>
      <CardContent className="p-4 flex-1 flex flex-col">

        {/* Product Image */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image}
              alt={`${product.title} - ${product.category} product image`}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-200 cursor-pointer"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </Link>
          {/* Category Badge */}
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 text-xs capitalize"
          >
            {product.category}
          </Badge>
        </div>

        {/* Product Info - Flex grow to push button to bottom */}
        <div className="space-y-2 flex-1 flex flex-col">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-sm leading-tight min-h-[2.5rem] flex items-start hover:text-primary transition-colors cursor-pointer">
              {truncateText(product.title, 60)}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium ml-1">
                {product.rating.rate}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price - Push to bottom */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="flex gap-2 w-full">
          <Link href={`/product/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full touch-target">
              View Details
            </Button>
          </Link>
          <AddToCartButton 
            product={product} 
            className="flex-1"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </AddToCartButton>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;