import { Product } from '../types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling and retry logic
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }

      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  
  throw new ApiError('Max retries exceeded');
}

// Fetch all products
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/products`);
    const products: Product[] = await response.json();
    
    // Validate the response structure
    if (!Array.isArray(products)) {
      throw new ApiError('Invalid response format: expected array');
    }
    
    return products;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch products');
  }
}

// Fetch single product by ID
export async function fetchProduct(id: number): Promise<Product> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/products/${id}`);
    const product: Product = await response.json();
    
    // Validate the response structure
    if (!product || typeof product.id !== 'number') {
      throw new ApiError('Invalid product data received');
    }
    
    return product;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Failed to fetch product with ID: ${id}`);
  }
}

// Fetch products by category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/products/category/${category}`);
    const products: Product[] = await response.json();
    
    if (!Array.isArray(products)) {
      throw new ApiError('Invalid response format: expected array');
    }
    
    return products;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Failed to fetch products for category: ${category}`);
  }
}

// Fetch all categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/products/categories`);
    const categories: string[] = await response.json();
    
    if (!Array.isArray(categories)) {
      throw new ApiError('Invalid response format: expected array');
    }
    
    return categories;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch categories');
  }
}

// Utility function to format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// Utility function to truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}