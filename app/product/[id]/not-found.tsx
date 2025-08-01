import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Product Not Found</CardTitle>
              <CardDescription>
                The product you&apos;re looking for doesn&apos;t exist or may have been removed.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                This could happen if the product ID is invalid or the product is no longer available.
              </p>
              <div className="space-y-2">
                <Link href="/" className="block">
                  <Button className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Products
                  </Button>
                </Link>
                <Link href="/cart" className="block">
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}