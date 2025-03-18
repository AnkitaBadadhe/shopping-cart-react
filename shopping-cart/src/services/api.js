// Mock data
const mockProducts = [
  // Electronics
  {
    id: 1,
    name: 'Samsung Galaxy S21',
    brand: 'Samsung',
    price: 69999,
    originalPrice: 79999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 10,
    rating: 4.5,
    reviewCount: 1250,
    fastDelivery: true,
    features: [
      '6.2-inch Dynamic AMOLED Display',
      '5G Enabled',
      '128GB Storage',
      'Triple Rear Camera Setup'
    ]
  },
  {
    id: 2,
    name: 'MacBook Air M1',
    brand: 'Apple',
    price: 99999,
    originalPrice: 119999,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 5,
    rating: 4.8,
    reviewCount: 892,
    fastDelivery: true,
    features: [
      'Apple M1 Chip',
      '13.3-inch Retina Display',
      '8GB RAM',
      '256GB SSD'
    ]
  },
  {
    id: 3,
    name: 'Sony WH-1000XM4',
    brand: 'Sony',
    price: 14999,
    originalPrice: 19999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 15,
    rating: 4.7,
    reviewCount: 645,
    fastDelivery: true,
    features: [
      'Industry-leading Noise Cancellation',
      '30-hour Battery Life',
      'Touch Controls',
      'Multipoint Connection'
    ]
  },
  // Clothing
  {
    id: 4,
    name: 'Premium Cotton T-Shirt',
    brand: 'H&M',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 20,
    rating: 4.2,
    reviewCount: 328,
    fastDelivery: true,
    features: [
      '100% Organic Cotton',
      'Regular Fit',
      'Crew Neck',
      'Machine Washable'
    ]
  },
  {
    id: 5,
    name: 'Slim Fit Denim Jeans',
    brand: 'Levi\'s',
    price: 4999,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 12,
    rating: 4.4,
    reviewCount: 567,
    fastDelivery: true,
    features: [
      'Stretch Denim',
      'Slim Fit',
      'Mid Rise',
      '5-Pocket Style'
    ]
  },
  // Beauty
  {
    id: 6,
    name: 'Vitamin C Face Serum',
    brand: 'The Ordinary',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 25,
    rating: 4.6,
    reviewCount: 789,
    fastDelivery: true,
    features: [
      '20% Vitamin C',
      'Brightening Formula',
      'Anti-aging Properties',
      'Suitable for All Skin Types'
    ]
  },
  {
    id: 7,
    name: 'Moisturizer',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 30,
  },
  // Home
  {
    id: 8,
    name: 'Coffee Maker',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=500&q=80',
    category: 'Home',
    quantityAvailable: 8,
  },
  {
    id: 9,
    name: 'Bed Sheet Set',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1629949009765-40fc74c9ec21?w=500&q=80',
    category: 'Home',
    quantityAvailable: 25,
  },
  // Books
  {
    id: 10,
    name: 'Self-Help Book',
    price: 799,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    category: 'Books',
    quantityAvailable: 25,
  },
  {
    id: 11,
    name: 'Children\'s Book',
    price: 399,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80',
    category: 'Books',
    quantityAvailable: 35,
  },
  // Additional Electronics
  {
    id: 12,
    name: 'Smart TV',
    price: 89999,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 8,
  },
  {
    id: 13,
    name: 'Wireless Keyboard',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 25,
  },
  {
    id: 14,
    name: 'Fitness Tracker',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 30,
  },
  {
    id: 15,
    name: 'Portable SSD',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1563642421748-5047b6585a4a?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 20,
  },
  {
    id: 16,
    name: 'Webcam',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 15,
  },
  // Additional Clothing
  {
    id: 17,
    name: 'Winter Coat',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 12,
  },
  {
    id: 18,
    name: 'Formal Shirt',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 25,
  },
  {
    id: 19,
    name: 'Sports Shorts',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 30,
  },
  {
    id: 21,
    name: 'Summer Dress',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 15,
  },
  // Additional Beauty Products
  {
    id: 22,
    name: 'Night Cream',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 25,
  },
  {
    id: 23,
    name: 'Hair Serum',
    price: 899,
    image: 'https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 40,
  },
  {
    id: 24,
    name: 'Body Lotion',
    price: 599,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 35,
  },
  {
    id: 25,
    name: 'Face Mask Set',
    price: 999,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 30,
  },
  {
    id: 26,
    name: 'Makeup Brush Set',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 20,
  },
  // Additional Home Products
  {
    id: 27,
    name: 'Floor Lamp',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    category: 'Home',
    quantityAvailable: 15,
  },
  {
    id: 29,
    name: 'Dinner Set',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=500&q=80',
    category: 'Home',
    quantityAvailable: 10,
  },
  {
    id: 30,
    name: 'Kitchen Organizer',
    price: 799,
    image: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=500&q=80',
    category: 'Home',
    quantityAvailable: 30,
  },
  // Additional Books
  {
    id: 32,
    name: 'Fiction Novel',
    price: 599,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    category: 'Books',
    quantityAvailable: 30,
  },
  {
    id: 33,
    name: 'Business Book',
    price: 899,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
    category: 'Books',
    quantityAvailable: 25,
  },
  {
    id: 34,
    name: 'Science Book',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80',
    category: 'Books',
    quantityAvailable: 20,
  },
  {
    id: 35,
    name: 'History Book',
    price: 799,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
    category: 'Books',
    quantityAvailable: 15,
  },
  {
    id: 36,
    name: 'Art Book Collection',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    category: 'Books',
    quantityAvailable: 10,
  },
  // More Electronics
  {
    id: 37,
    name: 'Gaming Mouse',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 20,
  },
  {
    id: 39,
    name: 'Tablet Stand',
    price: 999,
    image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 40,
  },
  // More Clothing
  {
    id: 40,
    name: 'Designer Scarf',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 25,
  },
  {
    id: 41,
    name: 'Leather Boots',
    price: 6999,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 15,
  },
  // More Beauty
  {
    id: 42,
    name: 'Hair Dryer',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 20,
  },
  {
    id: 43,
    name: 'Nail Care Kit',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 25,
  },
  // More Home
  {
    id: 44,
    name: 'Wall Mirror',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?w=500&q=80',
    category: 'Home',
    quantityAvailable: 10,
  },
  {
    id: 45,
    name: 'Spice Rack',
    price: 899,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80',
    category: 'Home',
    quantityAvailable: 30,
  },
  // More Books
  {
    id: 46,
    name: 'Poetry Collection',
    price: 699,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    category: 'Books',
    quantityAvailable: 20,
  },
  {
    id: 47,
    name: 'Cookbook Collection',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
    category: 'Books',
    quantityAvailable: 15,
  },
  // Final Electronics Items
  {
    id: 50,
    name: 'Phone Stand',
    price: 499,
    image: 'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 50,
  },
  // Additional Electronics
  {
    id: 52,
    name: 'Apple iPad Pro 12.9"',
    brand: 'Apple',
    price: 89999,
    originalPrice: 99999,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 8,
    rating: 4.9,
    reviewCount: 756,
    fastDelivery: true,
    features: [
      'M1 Chip',
      'Liquid Retina XDR Display',
      '12.9-inch Screen',
      'Face ID Enabled'
    ]
  },
  {
    id: 53,
    name: 'Dell XPS 15 Laptop',
    brand: 'Dell',
    price: 149999,
    originalPrice: 169999,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80',
    category: 'Electronics',
    quantityAvailable: 5,
    rating: 4.7,
    reviewCount: 432,
    fastDelivery: true,
    features: [
      'Intel i9 Processor',
      '32GB RAM',
      '1TB SSD',
      '4K OLED Display'
    ]
  },
  // Additional Clothing
  {
    id: 54,
    name: 'Premium Wool Blazer',
    brand: 'Zara',
    price: 7999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 15,
    rating: 4.5,
    reviewCount: 238,
    fastDelivery: true,
    features: [
      'Italian Wool Blend',
      'Slim Fit Design',
      'Fully Lined',
      'Double-Breasted'
    ]
  },
  {
    id: 55,
    name: 'Running Shoes',
    brand: 'Nike',
    price: 8999,
    originalPrice: 11999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    category: 'Clothing',
    quantityAvailable: 20,
    rating: 4.8,
    reviewCount: 892,
    fastDelivery: true,
    features: [
      'Responsive Cushioning',
      'Breathable Mesh',
      'Durable Outsole',
      'Lightweight Design'
    ]
  },
  // Additional Beauty Products
  {
    id: 56,
    name: 'Luxury Skincare Set',
    brand: 'La Mer',
    price: 12999,
    originalPrice: 15999,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 10,
    rating: 4.9,
    reviewCount: 156,
    fastDelivery: true,
    features: [
      'Moisturizing Cream',
      'Serum Concentrate',
      'Eye Treatment',
      'Renewal Oil'
    ]
  },
  {
    id: 57,
    name: 'Professional Hair Styling Kit',
    brand: 'Dyson',
    price: 34999,
    originalPrice: 39999,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80',
    category: 'Beauty',
    quantityAvailable: 7,
    rating: 4.8,
    reviewCount: 342,
    fastDelivery: true,
    features: [
      'Digital Motor',
      'Magnetic Attachments',
      'Heat Control',
      'Multiple Styling Options'
    ]
  },
  // Additional Home Products
  {
    id: 58,
    name: 'Smart Home Security System',
    brand: 'Ring',
    price: 24999,
    originalPrice: 29999,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80',
    category: 'Home',
    quantityAvailable: 12,
    rating: 4.6,
    reviewCount: 567,
    fastDelivery: true,
    features: [
      'HD Camera',
      'Motion Detection',
      'Two-way Audio',
      'Night Vision'
    ]
  },
  {
    id: 59,
    name: 'Ergonomic Office Chair',
    brand: 'Herman Miller',
    price: 89999,
    originalPrice: 99999,
    image: 'https://images.unsplash.com/photo-1589384267710-7a25bc24ab28?w=500&q=80',
    category: 'Home',
    quantityAvailable: 6,
    rating: 4.9,
    reviewCount: 234,
    fastDelivery: true,
    features: [
      'PostureFit Support',
      'Adjustable Arms',
      'Breathable Mesh',
      '12-Year Warranty'
    ]
  },
  // Additional Books
  {
    id: 60,
    name: 'Limited Edition Book Collection',
    brand: 'Penguin Classics',
    price: 9999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80',
    category: 'Books',
    quantityAvailable: 5,
    rating: 4.8,
    reviewCount: 89,
    fastDelivery: true,
    features: [
      'Leather-bound',
      'Gold-edged Pages',
      'Collector\'s Edition',
      'Illustrated'
    ]
  },
  {
    id: 61,
    name: 'Programming Book Bundle',
    brand: 'O\'Reilly',
    price: 5999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80',
    category: 'Books',
    quantityAvailable: 15,
    rating: 4.7,
    reviewCount: 342,
    fastDelivery: true,
    features: [
      '5 Best-selling Titles',
      'Digital Access Included',
      'Practice Examples',
      'Online Support'
    ]
  }
];

export const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500); // Simulate network delay
  });
};

export const fetchProductsByCategory = async (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = mockProducts.filter(
        (product) => product.category === category
      );
      resolve(filteredProducts);
    }, 500);
  });
};

export const fetchProductsByPriceRange = async (minPrice, maxPrice) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = mockProducts.filter(
        (product) => 
          product.price >= minPrice && 
          (maxPrice ? product.price <= maxPrice : true)
      );
      resolve(filteredProducts);
    }, 500);
  });
}; 