import React from 'react';
import { CLOTHING_ITEMS } from './types.ts';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <header className="text-center mb-12 pt-10">
        <h1 className="text-5xl font-serif text-luxury mb-4">Ma Bhagwati Rentals</h1>
        <p className="text-xl text-gray-400">Premium and budget-friendly wedding outfits in Amgaon</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {CLOTHING_ITEMS.map((item) => (
          <div key={item.id} className="glass-card rounded-xl overflow-hidden shadow-lg p-4">
            <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-serif mb-2">{item.name}</h2>
            <p className="text-gray-300 mb-4">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
