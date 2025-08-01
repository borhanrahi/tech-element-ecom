import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProduct, fetchProducts } from '../../../lib/api';
import ProductDetails from '@/components/product/ProductDetails';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await fetchProduct(parseInt(id));

    return {
      title: `${product.title} - Tech Element`,
      description: product.description.length > 160 
        ? product.description.substring(0, 157) + '...' 
        : product.description,
      keywords: `${product.category}, ${product.title}, ecommerce, online shopping`,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 800,
            height: 800,
            alt: product.title,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch {
    return {
      title: 'Product Not Found - Tech Element',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { id } = await params;
    const product = await fetchProduct(parseInt(id));

    if (!product) {
      notFound();
    }

    // Generate JSON-LD structured data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.image,
      category: product.category,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.rate,
        reviewCount: product.rating.count,
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProductDetails product={product} />
      </>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}