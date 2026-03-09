'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Search, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookingWidget() {
  const router = useRouter();

  // Default dates: tomorrow → +3 days
  const defaultPickup = (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })();
  const defaultDropoff = (() => { const d = new Date(); d.setDate(d.getDate() + 4); return d.toISOString().split('T')[0]; })();

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(defaultPickup);
  const [dropoffDate, setDropoffDate] = useState(defaultDropoff);
  const [carType, setCarType] = useState('all');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (pickupDate) params.set('startDate', pickupDate);
    if (dropoffDate) params.set('endDate', dropoffDate);
    if (pickupLocation) params.set('location', pickupLocation);
    if (carType && carType !== 'all') params.set('carType', carType);

    router.push(`/fleet?${params.toString()}`);
  };

  return (
    <div className="glass-premium rounded-[2rem] p-8 max-w-6xl mx-auto shadow-2xl relative z-30 transform hover:-translate-y-1 transition-transform duration-500">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Location Section */}
        <div className="md:col-span-5 space-y-4">
          <div>
            <label className="block text-text-primary text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Pickup Location
            </label>
            <div className="relative group">
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="City, Airport, or Address"
                className="input-premium w-full bg-surface border-transparent rounded-xl px-5 py-4 text-text-primary placeholder-text-muted font-medium focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-text-primary text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-text-muted" />
              Return Location
            </label>
            <input
              type="text"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              placeholder="Same as pickup"
              className="input-premium w-full bg-surface border-transparent rounded-xl px-5 py-4 text-text-primary placeholder-text-muted font-medium focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Date & Type Section */}
        <div className="md:col-span-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Pickup
              </label>
              <input
                type="date"
                value={pickupDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setPickupDate(e.target.value)}
                className="input-premium w-full bg-surface border-transparent rounded-xl px-4 py-4 text-text-primary font-medium focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-text-primary text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-text-muted" />
                Drop-off
              </label>
              <input
                type="date"
                value={dropoffDate}
                min={pickupDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="input-premium w-full bg-surface border-transparent rounded-xl px-4 py-4 text-text-primary font-medium focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-primary text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Vehicle Type
            </label>
            <div className="relative">
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="input-premium w-full bg-surface border-transparent rounded-xl px-5 py-4 text-text-primary font-medium focus:outline-none transition-all appearance-none"
              >
                <option value="all">Show All Vehicles</option>
                <option value="economy">Economy</option>
                <option value="compact">Compact</option>
                <option value="midsize">Midsize</option>
                <option value="luxury">Luxury & Premium</option>
                <option value="suv">SUVs & Vans</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="w-4 h-4 text-text-muted" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="md:col-span-3 flex items-end">
          <button
            onClick={handleSearch}
            className="btn-modern w-full h-[80px] bg-primary text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-primary/40 flex flex-col items-center justify-center gap-1 group"
          >
            <span className="flex items-center gap-2">
              Find Cars <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-sm font-medium opacity-80 font-normal">Best rates guaranteed</span>
          </button>
        </div>
      </div>
    </div>
  );
}
