'use client';

import { useState } from 'react';
import { Shield, Truck, RefreshCw, Headphones, Award, Zap, CheckCircle, Star, Users, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Military-grade encryption protects every transaction with 256-bit SSL security.',
      highlight: '100% Secure',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      stats: '99.9% Uptime'
    },
    {
      icon: Truck,
      title: 'Lightning Fast Delivery',
      description: 'Same-day delivery in major cities. Free express shipping on orders over $50.',
      highlight: 'Free Shipping',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      stats: '24hr Delivery'
    },
    {
      icon: RefreshCw,
      title: 'Hassle-Free Returns',
      description: 'Changed your mind? No problem! 30-day money-back guarantee with free returns.',
      highlight: '30-Day Returns',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      stats: '100% Refund'
    },
    {
      icon: Headphones,
      title: 'Expert Support Team',
      description: 'Get instant help from our award-winning support team via chat, email, or phone.',
      highlight: '24/7 Available',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      stats: '<2min Response'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Every product is carefully curated and tested to meet our high-quality standards.',
      highlight: 'Certified Quality',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      stats: '5-Star Rated'
    },
    {
      icon: Zap,
      title: 'One-Click Checkout',
      description: 'Revolutionary checkout experience. Complete your purchase in under 10 seconds.',
      highlight: 'Super Fast',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      stats: '10sec Checkout'
    },
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Star, value: '4.9/5', label: 'Customer Rating' },
    { icon: Globe, value: '100+', label: 'Countries Served' },
    { icon: CheckCircle, value: '99.9%', label: 'Success Rate' },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      
      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            ✨ Why 50,000+ customers choose us
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            Experience the
            <span className="block text-black">
              Future of Shopping
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us for premium products, 
            exceptional service, and an unmatched shopping experience.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-800 transition-colors duration-200">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeFeature === index;
            
            return (
              <Card 
                key={index} 
                className={`group cursor-pointer border transition-all duration-200 hover:shadow-lg ${
                  isActive 
                    ? 'border-gray-300 shadow-md bg-white' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardContent className="p-8 text-center relative">
                  {/* Icon */}
                  <div className={`relative w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors duration-200`}>
                    <Icon className={`w-10 h-10 ${feature.iconColor}`} />
                    
                    {/* Highlight Badge */}
                    <Badge 
                      className="absolute -top-2 -right-2 text-xs px-2 py-1 bg-black text-white border-0"
                    >
                      {feature.highlight}
                    </Badge>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Stats */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${feature.bgColor} ${feature.iconColor}`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Trusted by 50,000+ customers worldwide</span>
          </div>
          <p className="text-gray-500 text-sm">
            Join our community of satisfied customers and experience the difference today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;