import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Clock, 
  ShieldCheck, 
  Truck,
  Instagram,
  Facebook,
  Twitter,
  Search,
  MapPin,
  Phone,
  MessageSquare,
  Send,
  Sparkles
} from 'lucide-react';
import { CLOTHING_ITEMS, ClothingItem } from './types';
import { GoogleGenAI } from "@google/genai";

// AI Assistant Component
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Namaste! I am your personal stylist from Ma Bhagwati Rentals. How can I help you find the perfect outfit today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: `
            You are a friendly and professional stylist for "Ma Bhagwati Rentals" (Amgaon Rental Hub).
            Location: Renuka-Nagar Amgaon, District-Gondia, Maharashtra.
            Contact: +91 9545852355.
            
            Role:
            1. Help customers find suitable outfits for weddings, pre-wedding shoots, receptions, and parties.
            2. Suggest dresses, lehengas, sarees, or suits based on the event.
            3. Inform customers that many colors, sizes, and styles are available in-store.
            4. Highlight both premium and budget-friendly options.
            5. Encourage visiting the shop to see the full collection.
            
            Style: Friendly, professional, short, and clear.
            
            If asked about booking, prices, or availability, guide them to contact +91 9545852355 or visit the shop.
            
            User message: ${userMessage}
          ` }] }
        ],
      });

      const response = await model;
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I'm sorry, I couldn't process that. Please visit us or call +91 9545852355." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a bit of trouble connecting. Please call us at +91 9545852355 for immediate assistance!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#1a1a1a] border border-white/10 w-[350px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            <div className="p-4 bg-white text-black flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold">Stylist Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-white text-black rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white p-3 rounded-2xl rounded-tl-none text-sm animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about outfits..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white/30"
              />
              <button onClick={handleSend} className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center gap-2"
      >
        <MessageSquare className="w-6 h-6" />
        {!isOpen && <span className="font-bold pr-2">Chat with Stylist</span>}
      </button>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Bridal', 'Sarees', 'Suits', 'Jewellery', 'Pre-Wedding'];

  const filteredItems = CLOTHING_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <AIAssistant />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full">
              <span className="text-black font-bold text-xl">M</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-medium tracking-tighter text-luxury">MA BHAGWATI</span>
              <span className="text-[10px] tracking-[0.2em] text-white/40">RENTALS</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Catalog', 'Location', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                {item}
              </a>
            ))}
            <a href="tel:+919545852355" className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-luxury">
              {['Home', 'Catalog', 'Location', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <a href="tel:+919545852355" className="bg-white text-black py-4 rounded-xl text-lg font-semibold text-center">
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=2070" 
            alt="Ma Bhagwati Rentals Hero" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/20 via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-white/60 mb-6 block">Amgaon Rental Hub</span>
            <h1 className="text-6xl md:text-8xl font-luxury mb-8 leading-tight">
              Elegance for <span className="italic">Every Occasion</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light">
              Premium Bridal Lehengas, Designer Suits, and Elegant Sarees. High-quality fashion at affordable rental prices in Amgaon.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#catalog" className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform text-center">
                Explore Collection
              </a>
              <a href="https://maps.app.goo.gl/CUDxfXgcN9hDSTQT9" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto border border-white/20 px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" /> Visit Shop
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { icon: <ShoppingBag className="w-8 h-8" />, title: "Large Variety", desc: "Huge collection for weddings, shoots, and parties." },
            { icon: <Clock className="w-8 h-8" />, title: "Multiple Sizes", desc: "Outfits available in various sizes for a perfect fit." },
            { icon: <Sparkles className="w-8 h-8" />, title: "Latest Designs", desc: "Stay updated with the newest fashion trends." },
            { icon: <ShieldCheck className="w-8 h-8" />, title: "Affordable", desc: "Premium and budget-friendly rental options." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-4 text-black/80">{feature.icon}</div>
              <h3 className="text-xl font-luxury mb-2">{feature.title}</h3>
              <p className="text-sm text-black/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-luxury mb-4">Our Collection</h2>
              <p className="text-white/60 max-w-md">Bridal wear, function wear, and matching jewellery sets.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search outfits..." 
                  className="bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-6 text-sm focus:outline-none focus:border-white/30 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat ? 'bg-white text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/50 backdrop-blur-md text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${
                      item.priceRange === 'Premium' ? 'bg-amber-500/20 border-amber-500/50 text-amber-200' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                    }`}>
                      {item.priceRange}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-luxury mb-1">{item.name}</h3>
                    <p className="text-sm text-white/40 font-light">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-white/40 mb-6 italic">Many more colors, sizes, and styles available in-store!</p>
            <a href="tel:+919545852355" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> Enquire for Availability
            </a>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-luxury mb-8">Visit Our Hub</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Address</h4>
                  <p className="text-white/60 text-sm">Renuka - Nagar Amgaon,<br />District- Gondia Maharashtra, India</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Contact</h4>
                  <p className="text-white/60 text-sm">+91 9545852355</p>
                </div>
              </div>
            </div>
            <a 
              href="https://maps.app.goo.gl/CUDxfXgcN9hDSTQT9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Get Directions <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="h-[400px] rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.432655123456!2d80.37!3d21.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDIyJzQ4LjAiTiA4MMKwMjInMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-full">
                  <span className="text-black font-bold text-lg">M</span>
                </div>
                <span className="text-lg font-medium tracking-tighter text-luxury">MA BHAGWATI RENTALS</span>
              </div>
              <p className="text-white/40 max-w-sm mb-8 font-light">
                Your one-stop destination for wedding and special occasion outfits in Amgaon. Stylish, high-quality, and affordable.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#catalog" className="hover:text-white transition-colors">Catalog</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Location</a></li>
                <li><a href="tel:+919545852355" className="hover:text-white transition-colors">Call Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Visit Us</h4>
              <p className="text-white/40 text-sm leading-relaxed">
                Renuka - Nagar Amgaon,<br />
                District- Gondia<br />
                Maharashtra, India
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/20">
            <p>© 2026 MA BHAGWATI RENTALS (AMGAON RENTAL HUB). ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
