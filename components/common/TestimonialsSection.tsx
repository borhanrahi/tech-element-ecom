'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fashion Designer',
      company: 'StyleCo',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Tech Element has completely transformed my shopping experience. The quality is exceptional, delivery is lightning fast, and their customer service is simply outstanding. I\'ve never been happier with an online store!',
      rating: 5,
      verified: true,
      location: 'New York, USA'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Engineer',
      company: 'TechCorp',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'As a tech professional, I appreciate attention to detail. Tech Element delivers on every front - from product quality to user experience. Their one-click checkout is a game-changer!',
      rating: 5,
      verified: true,
      location: 'San Francisco, USA'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Marketing Director',
      company: 'BrandWorks',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'I\'ve been shopping with Tech Element for over a year now. The consistency in quality, the innovative features, and the personal touch in customer service keep me coming back. Highly recommended!',
      rating: 5,
      verified: true,
      location: 'Miami, USA'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Entrepreneur',
      company: 'StartupHub',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'The seamless shopping experience and premium product curation at Tech Element is unmatched. They understand what modern consumers want and deliver it perfectly every time.',
      rating: 5,
      verified: true,
      location: 'Seattle, USA'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      
      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-lg font-semibold text-gray-700 ml-2">4.9/5 from 10,000+ reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what real customers have to say about their experience.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border border-gray-200 shadow-lg bg-white">
            <CardContent className="p-8 md:p-12 text-center relative">
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 mx-1" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                &quot;{current.content}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                  <AvatarImage src={current.image} alt={current.name} />
                  <AvatarFallback className="bg-black text-white font-bold">
                    {current.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-bold text-lg text-gray-900 flex items-center">
                    {current.name}
                    {current.verified && (
                      <div className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-gray-600">{current.role} at {current.company}</div>
                  <div className="text-sm text-gray-500">{current.location}</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {/* Dots */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentTestimonial 
                          ? 'bg-black' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentTestimonial(index)}
              className={`p-4 rounded-xl transition-all duration-200 ${
                index === currentTestimonial
                  ? 'bg-white shadow-md border-2 border-gray-300'
                  : 'bg-gray-50 hover:bg-white hover:shadow-sm'
              }`}
            >
              <Avatar className="w-12 h-12 mx-auto mb-2">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback className="bg-black text-white text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs font-medium text-gray-900 truncate">{testimonial.name}</div>
              <div className="text-xs text-gray-500 truncate">{testimonial.company}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;