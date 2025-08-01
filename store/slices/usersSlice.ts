import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
  createdAt: string;
  avatar?: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  searchTerm: string;
  roleFilter: string;
  currentPage: number;
  usersPerPage: number;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Viewer',
    status: 'Inactive',
    createdAt: '2024-01-25',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-02-01',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'Viewer',
    status: 'Inactive',
    createdAt: '2024-02-05',
  },
  {
    id: '6',
    name: 'Lisa Davis',
    email: 'lisa.davis@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-02-10',
  },
  {
    id: '7',
    name: 'Tom Anderson',
    email: 'tom.anderson@example.com',
    role: 'Viewer',
    status: 'Inactive',
    createdAt: '2024-02-15',
  },
  {
    id: '8',
    name: 'Emily Taylor',
    email: 'emily.taylor@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-02-20',
  },
];

const initialState: UsersState = {
  users: mockUsers,
  loading: false,
  searchTerm: '',
  roleFilter: 'All',
  currentPage: 1,
  usersPerPage: 5,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    addUser: (state, action: PayloadAction<Omit<User, 'id' | 'createdAt'>>) => {
      const newUser: User = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
      };
      state.users.unshift(newUser);
    },
    
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    
    toggleUserStatus: (state, action: PayloadAction<string>) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.status = user.status === 'Active' ? 'Inactive' : 'Active';
      }
    },
    
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.roleFilter = action.payload;
      state.currentPage = 1; // Reset to first page when filtering
    },
    
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setLoading,
  addUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  setSearchTerm,
  setRoleFilter,
  setCurrentPage,
} = usersSlice.actions;

export default usersSlice.reducer;