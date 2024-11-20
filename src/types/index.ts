import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types'; // Ensure CartItem type is correctly imported
import { formatPrice } from '../lib/utils'; // Assuming you have a formatPrice utility

// Sample product data
const products = [
  {
    id: '1',
    name: 'Product 1',
    price: 100,
    description: 'Description for product 1',
    image: '/path-to-image-1.jpg',
    media: [],
    createdAt: '2024-11-01',
    updatedAt: '2024-11-01',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 200,
    description: 'Description for product 2',
    image: '/path-to-image-2.jpg',
    media: [],
    createdAt: '2024-11-02',
    updatedAt: '2024-11-02',
  },
  // Add more products here as needed
];

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: CartItem) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image || '/default-image.jpg'} // Fallback image
              alt={product.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">{formatPrice(product.price)}</span>
              <button
                onClick={() => handleAddToCart({ ...product, quantity: 1 })}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Cart</h2>
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                <img
                  src={item.image || '/default-image.jpg'} // Fallback image
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                  <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-500"
                  // Add functionality to remove the item from the cart
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <Link
          to="/checkout"
          className="mt-4 block w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
