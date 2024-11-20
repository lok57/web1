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
}

export interface ProductMedia {
  url: string;
  type: 'image' | 'video';
}

export interface CartItem extends Omit<Product, 'media'> {
  quantity: number;
  size?: string;
  image: string; // Make image mandatory
  media?: ProductMedia[]; // Keep media optional for backward compatibility
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

export interface AuthContextType {
  currentUser: any;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  loading: boolean;
  isOffline: boolean;
}
