'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { CustomerInfo } from '../../types/order';

// Validation schema
const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  
  shippingAddress: z
    .string()
    .min(10, 'Shipping address must be at least 10 characters')
    .max(200, 'Shipping address must be less than 200 characters'),
  
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
  isLoading?: boolean;
}

const CheckoutForm = ({ onSubmit, isLoading = false }: CheckoutFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      shippingAddress: '',
      phoneNumber: '',
    },
  });

  const handleSubmit = async (data: CheckoutFormData) => {
    if (isSubmitting || isLoading) return;

    setIsSubmitting(true);
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(data);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormLoading = isSubmitting || isLoading;

  return (
    <div className="space-y-8">
      {/* Form Header */}
      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Information</h2>
        <p className="text-gray-600">Please provide your details for secure delivery</p>
      </div>

      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-semibold text-gray-900">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        disabled={isFormLoading}
                        className="h-12 px-4 text-base border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/5 hover:border-gray-300 transition-all duration-200 bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              {/* Shipping Address */}
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-semibold text-gray-900">Shipping Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your complete shipping address"
                        {...field}
                        disabled={isFormLoading}
                        className="h-12 px-4 text-base border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/5 hover:border-gray-300 transition-all duration-200 bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-semibold text-gray-900">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        type="tel"
                        {...field}
                        disabled={isFormLoading}
                        className="h-12 px-4 text-base border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-black/5 hover:border-gray-300 transition-all duration-200 bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-14 text-base font-semibold bg-black text-white hover:bg-gray-900 focus:ring-2 focus:ring-black/20 transition-all duration-200 rounded-lg"
                  disabled={isFormLoading}
                >
                  {isFormLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-3" />
                      Complete Order
                    </>
                  )}
                </Button>
              </div>

              {/* Form Info */}
              <div className="text-center pt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  All fields are required for secure delivery
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z" clipRule="evenodd" />
                  </svg>
                  Your information is encrypted and secure
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutForm;