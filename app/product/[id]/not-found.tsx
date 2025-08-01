import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container-custom py-16">
        <Card className="max-w-md mx-auto border-0 shadow-lg bg-white text-center">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Sorry, we couldn&apos;t find the product you&apos;re looking for. It may have been removed or the link might be incorrect.
            </p>
            
            <div className="space-y-3">
              <Link href="/" className="block">
                <Button className="w-full bg-black text-white hover:bg-gray-900 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              
              <p className="text-sm text-gray-500">
                Or browse our full collection of products
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}