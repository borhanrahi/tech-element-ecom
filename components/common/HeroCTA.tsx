"use client";

import { ArrowRight, ShoppingBag, Star, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const HeroCTA = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge variant="secondary" className="w-fit">
              ✨ New Collection Available
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Modern Shopping
                <span className="text-primary block">Experience</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover quality products with our clean, mobile-first design.
                Fast, secure, and user-friendly online shopping experience.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold">10K+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Customers
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold">4.8/5</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="touch-target group"
                onClick={() => {
                  document
                    .getElementById("products-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="touch-target"
                onClick={() => {
                  document
                    .getElementById("products-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Products
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-sm text-muted-foreground">
                🔒 Secure Checkout
              </div>
              <div className="text-sm text-muted-foreground">
                🚚 Free Shipping
              </div>
              <div className="text-sm text-muted-foreground">
                ↩️ Easy Returns
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden">
              {/* Floating Cards */}
              <div className="absolute top-4 right-4 bg-background p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium">Order Confirmed</div>
                    <div className="text-xs text-muted-foreground">
                      Just now
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-background p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">New Products</div>
                    <div className="text-xs text-muted-foreground">
                      20+ items added
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCTA;
