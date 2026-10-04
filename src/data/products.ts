import type { Product } from '../types/product';

const categories = [
  'Electronics',
  'Office',
  'Home',
  'Fitness',
  'Fashion',
  'Books',
  'Beauty',
  'Grocery',
  'Accessories',
  'Gaming',
];

const adjectivePool = [
  'Smart',
  'Classic',
  'Premium',
  'Compact',
  'Urban',
  'Pro',
  'Elite',
  'Essential',
  'Studio',
  'Travel',
  'Flexible',
  'Cloud',
  'Luxe',
];

const productPool = [
  'Monitor',
  'Keyboard',
  'Chair',
  'Lamp',
  'Speaker',
  'Bottle',
  'Backpack',
  'Headphones',
  'Laptop Sleeve',
  'Desk Mat',
  'Yoga Mat',
  'Smart Watch',
  'Running Shoe',
  'Scented Candle',
  'Coffee Grinder',
  'Desk Organizer',
  'Camera Stand',
  'Novel',
  'Planner',
  'Face Serum',
  'Gaming Mouse',
];

const productImage = (index: number): string => {
  const imageBase = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    'https://images.unsplash.com/photo-1511497584788-876760111969',
  ];

  return `${imageBase[index % imageBase.length]}?auto=format&fit=crop&w=900&q=80&sig=${index}`;
};

export const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, index) => {
    const category = categories[index % categories.length];
    const adjective = adjectivePool[(index * 3) % adjectivePool.length];
    const productName = productPool[(index * 5) % productPool.length];
    const name = `${adjective} ${category} ${productName} ${index + 1}`;
    const price = Number(((index * 17 % 980) + 39.99).toFixed(2));
    const stock = (index * 11) % 75;
    const rating = Number((Math.min(5, 2.8 + ((index * 7) % 22) / 10)).toFixed(1));

    return {
      id: `prod-${index + 1}`,
      name,
      category,
      price,
      stock,
      rating,
      image: productImage(index),
      description: `High-quality ${name.toLowerCase()} designed for modern everyday use with excellent value and durable construction.`,
    };
  });
};

export const products: Product[] = generateProducts(10000);

export const categoriesList = [...new Set(products.map((product) => product.category))];
