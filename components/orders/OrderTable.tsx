'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, Package, Calendar, User, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Order } from '../../types/order';
import { formatPrice, truncateText } from '../../lib/api';

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Order Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Package className="w-4 h-4 mr-1" />
                    Order ID
                  </div>
                  <p className="font-mono text-sm font-medium">
                    {order.id}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-1" />
                    Customer
                  </div>
                  <p className="font-medium">
                    {order.customerInfo.fullName}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    Order Date
                  </div>
                  <p className="font-medium">
                    {formatDate(order.orderDate)}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Total
                  </div>
                  <p className="font-bold text-primary">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="flex items-center justify-between lg:justify-end gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Items</p>
                  <p className="font-bold">{order.items.length}</p>
                </div>

                <Badge variant="secondary" className="capitalize">
                  {order.status}
                </Badge>

                {/* View Details Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                      className="touch-target"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Order Details - {order.id}</DialogTitle>
                    </DialogHeader>
                    
                    {selectedOrder && (
                      <div className="space-y-6">
                        {/* Order Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Order Date</p>
                            <p className="font-medium">{formatDate(selectedOrder.orderDate)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <Badge variant="secondary" className="capitalize">
                              {selectedOrder.status}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Customer</p>
                            <p className="font-medium">{selectedOrder.customerInfo.fullName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Amount</p>
                            <p className="font-bold text-lg text-primary">
                              {formatPrice(selectedOrder.total)}
                            </p>
                          </div>
                        </div>

                        <Separator />

                        {/* Shipping Address */}
                        <div>
                          <h3 className="font-semibold mb-2">Shipping Address</h3>
                          <p className="text-sm">{selectedOrder.customerInfo.shippingAddress}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Phone: {selectedOrder.customerInfo.phoneNumber}
                          </p>
                        </div>

                        <Separator />

                        {/* Order Items */}
                        <div>
                          <h3 className="font-semibold mb-4">
                            Items Ordered ({selectedOrder.items.length})
                          </h3>
                          <div className="space-y-4">
                            {selectedOrder.items.map((item) => (
                              <div key={item.product.id} className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                                <div className="relative w-16 h-16 bg-background rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.product.image}
                                    alt={item.product.title}
                                    fill
                                    className="object-contain p-2"
                                    sizes="64px"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium leading-tight">
                                    {truncateText(item.product.title, 50)}
                                  </h4>
                                  <p className="text-sm text-muted-foreground capitalize">
                                    {item.product.category}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatPrice(item.product.price)} × {item.quantity}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">
                                    {formatPrice(item.product.price * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderTable;