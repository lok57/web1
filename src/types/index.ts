export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  media: ProductMedia[];
  inStock?: boolean;
  createdAt: string;
  updatedAt: string;
  sizes?: string[];
  image: string;
}

export interface ProductMedia {
  url: string;
  type: 'image' | 'video';
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  size?: string;
  image: string;  // Assuming that each cart item has an image field
  inStock?: boolean;
  createdAt: string;
  updatedAt: string;
  sizes?: string[];
  image: string;
}

export interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export interface MediaFile {
  id: string;
  type: 'image' | 'video';
  file: File;
  preview: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
}

