export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  specifications: Record<string, string>;
  isAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  orderId: string;
  userId: string;
  userEmail: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalPrice: number;
  timestamp: number;
  status: "Pending" | "Dispatched" | "Delivered" | "Cancelled";
  deliveryPhone: string;
  deliveryAddress: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  isAdmin: boolean;
}

export interface BannerSlide {
  image: string;
  title: string;
  subtitle: string;
  tagline: string;
}

