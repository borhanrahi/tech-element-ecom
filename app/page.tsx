import type { Metadata } from 'next';
import ProductGrid from '../components/product/ProductGrid';
import HeroCTA from '../components/common/HeroCTA';
import FeaturesSection from '../components/common/FeaturesSection';
import TestimonialsSection from '@/components/common/TestimonialsSection';

export const metadata: Metadata = {
  title: 'Tech Element - Modern E-commerce Store',
  description: 'Discover quality products with our modern, mobile-first shopping experience. Browse electronics, jewelry, clothing and more.',
  keywords: 'ecommerce, online store, shopping, electronics, jewelry, clothing, fashion',
  openGraph: {
    title: 'Tech Element - Modern E-commerce Store',
    description: 'Discover quality products with our modern, mobile-first shopping experience.',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Element - Modern E-commerce Store',
    description: 'Discover quality products with our modern, mobile-first shopping experience.',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero CTA Section */}
      <HeroCTA />

      {/* Products Section */}
      <section id="products-section" aria-label="Featured products" role="main">
        <ProductGrid />
      </section>

      {/* Features Section */}
      <FeaturesSection />

      <TestimonialsSection />
    </main>
  );
}
