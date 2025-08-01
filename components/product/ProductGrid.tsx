'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../store/slices/productsSlice';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import ErrorBoundary from '../common/ErrorBoundary';
import { Package, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

const ProductGrid = () => {
  const dispatch = useAppDispatch();
  const { items: products, loading, error, lastFetched } = useAppSelector((state) => state.products);

  useEffect(() => {
    // Only fetch if we don't have products or they're stale (older than 1 hour)
    const isStale = Date.now() - lastFetched > 60 * 60 * 1000;
    if (products.length === 0 || isStale) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, lastFetched]);

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  if (loading && products.length === 0) {
    return (
      <div className="container-custom py-12">
        <LoadingSpinner size="lg" text="Loading products..." className="py-20" />
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold">Failed to load products</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn&apos;t load the products right now. Please check your connection and try again.
          </p>
          <Button onClick={handleRetry} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container-custom py-12">
        <EmptyState
          icon={Package}
          title="No products found"
          description="We couldn't find any products to display. Please try again later."
          action={{
            label: "Refresh",
            onClick: handleRetry,
          }}
          className="py-20"
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Featured Products
          </h1>
          <p className="text-muted-foreground">
            Discover our curated selection of quality products
          </p>
        </div>

        {/* Loading indicator for refresh */}
        {loading && products.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-center py-2">
              <LoadingSpinner size="sm" text="Updating products..." />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Error message for refresh failures */}
        {error && products.length > 0 && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">
              Failed to update products: {error}
            </p>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ProductGrid;