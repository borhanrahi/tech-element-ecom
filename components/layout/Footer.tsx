import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container-custom">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">TE</span>
                </div>
                <span className="font-bold text-xl">Tech Element</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your trusted destination for quality products with modern shopping experience.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shopping Cart
                </Link>
                <Link href="/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Order History
                </Link>
              </nav>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold">Categories</h3>
              <nav className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Electronics</span>
                <span className="text-sm text-muted-foreground">Jewelry</span>
                <span className="text-sm text-muted-foreground">Men&apos;s Clothing</span>
                <span className="text-sm text-muted-foreground">Women&apos;s Clothing</span>
              </nav>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <nav className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Help Center</span>
                <span className="text-sm text-muted-foreground">Contact Us</span>
                <span className="text-sm text-muted-foreground">Shipping Info</span>
                <span className="text-sm text-muted-foreground">Returns</span>
              </nav>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2025 Tech Element. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Privacy Policy
                </span>
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;