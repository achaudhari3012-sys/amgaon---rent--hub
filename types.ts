export interface ClothingItem {
  id: string;
  name: string;
  category: 'Bridal' | 'Sarees' | 'Suits' | 'Jewellery' | 'Pre-Wedding';
  priceRange: 'Budget' | 'Premium';
  image: string;
  description: string;
}

export const CLOTHING_ITEMS: ClothingItem[] = [
  {
    id: '1',
    name: 'Heavy Bridal Lehenga',
    category: 'Bridal',
    priceRange: 'Premium',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
    description: 'Exquisite heavy embroidery bridal lehenga for your special day.'
  },
  {
    id: '2',
    name: 'Designer Anarkali Suit',
    category: 'Suits',
    priceRange: 'Premium',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant designer suit perfect for receptions and parties.'
  },
  {
    id: '3',
    name: 'Elegant Silk Saree',
    category: 'Sarees',
    priceRange: 'Budget',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    description: 'Classic silk saree available in multiple vibrant colors.'
  },
  {
    id: '4',
    name: 'Wedding Jewellery Set',
    category: 'Jewellery',
    priceRange: 'Premium',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
    description: 'Complete matching jewellery set to complement your wedding attire.'
  },
  {
    id: '5',
    name: 'Pre-Wedding Gown',
    category: 'Pre-Wedding',
    priceRange: 'Budget',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=800',
    description: 'Flowy and stylish gown for pre-wedding photo shoots.'
  },
  {
    id: '6',
    name: 'Modern Party Wear Lehenga',
    category: 'Bridal',
    priceRange: 'Budget',
    image: 'https://images.unsplash.com/photo-1611612422500-34473e63ac82?auto=format&fit=crop&q=80&w=800',
    description: 'Lightweight yet stunning lehenga for sangeet or reception.'
  }
];
