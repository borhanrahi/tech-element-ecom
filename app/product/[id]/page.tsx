import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import AddToCartButton from "../../../components/cart/AddToCartButton";
import { formatPrice } from "../../../lib/api";
import { Product } from "../../../types/product";

// Fetch single product
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Fetch all products for static generation
async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Generate static params (equivalent to getStaticPaths)
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Generate metadata (dynamic meta tags)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found - Tech Element",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} - Tech Element`,
    description: product.description.substring(0, 160),
    keywords: `${product.category}, ${product.title}, ecommerce, online shopping`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      type: "website",
      siteName: "Tech Element",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

// Product Details Page Component
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  // Generate star rating
  const fullStars = Math.floor(product.rating.rate);
  const hasHalfStar = product.rating.rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.image,
            category: product.category,
            brand: "Tech Element",
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "Tech Element",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating.rate,
              reviewCount: product.rating.count,
            },
          }),
        }}
      />

      <div className="container-custom py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="border-0 shadow-lg bg-white p-8">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Shield className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-xs text-gray-600 text-center">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Truck className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-xs text-gray-600 text-center">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <RotateCcw className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-xs text-gray-600 text-center">
                  30-Day Returns
                </span>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category Badge */}
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 capitalize"
            >
              {product.category}
            </Badge>

            {/* Product Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {/* Full Stars */}
                {[...Array(fullStars)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                {/* Half Star */}
                {hasHalfStar && (
                  <Star
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                )}
                {/* Empty Stars */}
                {[...Array(emptyStars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-300" />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </div>
              <p className="text-sm text-gray-600">
                Free shipping on orders over $50
              </p>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <AddToCartButton
                product={product}
                className="w-full h-14 text-lg font-semibold bg-black text-white hover:bg-gray-900 transition-colors"
              />
              <p className="text-sm text-gray-500 text-center">
                ✓ In stock and ready to ship
              </p>
            </div>

            {/* Product Description */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Product Features */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Why Choose This Product?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Premium quality materials and construction
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Carefully tested for durability and performance
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Backed by our satisfaction guarantee
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Fast and secure shipping worldwide
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Shipping & Returns */}
            <Card className="border-0 shadow-sm bg-gray-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Shipping & Returns
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Standard Shipping:</span>
                    <span className="font-medium">5-7 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Shipping:</span>
                    <span className="font-medium">2-3 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Return Policy:</span>
                    <span className="font-medium">30 days</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Free returns on all orders. No questions asked.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
