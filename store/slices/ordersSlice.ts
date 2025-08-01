import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, CustomerInfo } from '../../types/order';
import { CartItem } from '../../types/cart';

interface OrdersState {
  items: Order[];
  loading: boolean;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<{ customerInfo: CustomerInfo; items: CartItem[]; total: number }>) => {
      const { customerInfo, items, total } = action.payload;
      
      const newOrder: Order = {
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        customerInfo,
        items,
        total,
        orderDate: new Date().toISOString(),
        status: 'completed',
      };
      
      state.items.unshift(newOrder); // Add to beginning of array
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { createOrder, setLoading } = ordersSlice.actions;
export default ordersSlice.reducer;