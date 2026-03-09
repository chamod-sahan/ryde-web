'use client';

import { motion } from 'framer-motion';
import { Car, Fuel, Users, Shield, Star, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import vehicleService, { Vehicle } from '@/services/vehicleService';

interface CategoryGroup {
  name: string;
  description: string;
  cars: Vehicle[];
  price: string;
  image: string;
  features: string[];
  rating: number;
  popularity: string;
}

const CATEGORY_META: { [key: string]: any } = {
  'Economy': {
    description: 'Budget-friendly and fuel-efficient',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop&auto=format',
    features: ['5 Seats', 'Manual', 'AC', 'Bluetooth'],
    popularity: 'Best Value'
  },
  'Compact': {
    description: 'Perfect for city driving',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c6f88f?w=400&h=250&fit=crop&auto=format',
    features: ['5 Seats', 'Manual/Auto', 'AC', 'Cruise Control'],
    popularity: 'Most Popular'
  },
  'Midsize': {
    description: 'Comfort and space combined',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba95d42b9?w=400&h=250&fit=crop&auto=format',
    features: ['5 Seats', 'Auto', 'Leather', 'Sunroof'],
    popularity: 'Comfort Choice'
  },
  'Luxury': {
    description: 'Travel in style and comfort',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop&auto=format',
    features: ['5 Seats', 'Auto', 'Premium Audio', 'Navigation'],
    popularity: 'Premium'
  },
  'SUV': {
    description: 'Space for family and adventures',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop&auto=format',
    features: ['7 Seats', 'Auto', 'AWD', 'Cargo Space'],
    popularity: 'Family Favorite'
  },
  'Premium': {
    description: 'Experience the extraordinary',
    image: 'https://images.unsplash.com/photo-1549398516-129e56d04d48?w=400&h=250&fit=crop&auto=format',
    features: ['4-5 Seats', 'Auto', 'Premium', 'Performance'],
    popularity: 'Exclusive'
  }
};

export default function FleetSection() {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFleet = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        const response = await vehicleService.getAvailableVehicles({
          startDate: today.toISOString().split('T')[0],
          endDate: nextWeek.toISOString().split('T')[0],
          page: 0,
          pageSize: 50
        });

        // Group by bodyTypeName
        const groups: { [key: string]: Vehicle[] } = {};
        response.data.forEach(v => {
          const type = v.bodyTypeName || 'Other';
          if (!groups[type]) groups[type] = [];
          groups[type].push(v);
        });

        const mappedCategories: CategoryGroup[] = Object.entries(groups).map(([name, cars]) => {
          const meta = CATEGORY_META[name] || {
            description: 'High quality vehicles for any trip',
            image: cars[0].colorImages?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop&auto=format',
            features: ['Premium Quality', 'Well Maintained'],
            popularity: 'New Arrival'
          };

          const minPrice = Math.min(...cars.map(c => c.dailyRentalPrice));
          const avgRating = cars.reduce((acc, c) => acc + (c.averageRating || 0), 0) / cars.length;

          return {
            name,
            description: meta.description,
            cars: cars,
            price: `$${minPrice}`,
            image: meta.image,
            features: meta.features,
            rating: parseFloat(avgRating.toFixed(1)) || 5.0,
            popularity: meta.popularity
          };
        });

        // Sort categories to match the previous hardcoded order if possible
        const order = ['Economy', 'Compact', 'Midsize', 'Luxury', 'SUV', 'Premium'];
        mappedCategories.sort((a, b) => {
          const idxA = order.indexOf(a.name);
          const idxB = order.indexOf(b.name);
          if (idxA === -1) return 1;
          if (idxB === -1) return -1;
          return idxA - idxB;
        });

        setCategories(mappedCategories);
      } catch (err: any) {
        console.error("Failed to load fleet categories", err);
        setError("Failed to load our fleet. Please check back later.");
      } finally {
        setLoading(false);
      }
    };

    loadFleet();
  }, []);

  return (
    <section id="fleet" className="py-24 bg-surface relative overflow-hidden">
      {/* Refined Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 tracking-tight">
            Our Premium <span className="text-primary relative inline-block">
              Fleet
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
            Choose from our wide selection of modern, well-maintained vehicles to suit your needs and budget
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-text-secondary font-medium">Loading our amazing fleet...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="glass-premium rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/50 h-full flex flex-col hover:-translate-y-2">
                  {/* Image container with refined overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                    {/* Floating badge */}
                    <motion.div
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-text-primary px-4 py-1.5 rounded-full text-xs font-bold shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      {category.popularity}
                    </motion.div>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center bg-black/40 backdrop-blur-md rounded-full px-3 py-1 text-white border border-white/10">
                      <Star className="w-3.5 h-3.5 text-yellow-400 mr-1.5 fill-yellow-400" />
                      <span className="text-xs font-bold">{category.rating}</span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-text-primary">{category.name}</h3>
                      <div className="flex flex-col items-end">
                        <span className="text-primary font-bold text-xl">{category.price}</span>
                        <span className="text-xs text-text-muted font-medium">per day</span>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-6 text-sm font-medium leading-relaxed">{category.description}</p>

                    <div className="mb-6 flex-grow">
                      <h4 className="font-bold text-text-primary mb-3 text-xs uppercase tracking-wider opacity-70">Top Models</h4>
                      <div className="space-y-2">
                        {category.cars.slice(0, 3).map((car, carIndex) => (
                          <div key={car.id} className="text-sm text-text-secondary flex items-center font-medium">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2.5"></div>
                            {car.vehicleMakeName} {car.vehicleModel}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {category.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="px-3 py-1 bg-surface border border-border text-text-secondary rounded-lg text-xs font-semibold">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link href={`/fleet?category=${category.name}`} className="mt-auto">
                      <button className="btn-modern w-full bg-text-primary text-white px-6 py-4 rounded-xl hover:bg-gray-900 transition-all duration-300 font-bold flex items-center justify-center group shadow-lg">
                        View {category.name} Cars
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-white/70" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-text-secondary font-medium mb-6">Looking for something specific?</p>
          <Link href="/fleet" className="inline-block btn-modern bg-white text-text-primary border-2 border-border px-10 py-4 rounded-xl hover:border-text-primary transition-all font-bold text-lg">
            Browse Full Catalog
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
