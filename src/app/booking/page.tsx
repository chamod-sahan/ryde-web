'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Calendar, MapPin, Shield, CreditCard, User, Mail, Phone, Check } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import vehicleService, { Insurance } from '@/services/vehicleService';

function BookingPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [insurances, setInsurances] = useState<Insurance[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);

    const ownerId = searchParams.get('ownerId');

    useEffect(() => {
        if (ownerId) {
            setLoading(true);
            vehicleService.getInsurancesByOwner(parseInt(ownerId))
                .then(data => {
                    setInsurances(data);
                    const included = data.find(i => i.isIncluded);
                    if (included) setSelectedInsurance(included);
                })
                .catch(err => console.error("Failed to fetch insurances", err))
                .finally(() => setLoading(false));
        }
    }, [ownerId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/booking/confirmation');
    };

    return (
        <div className="relative min-h-screen bg-background text-text-primary pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Complete Your Booking
                </motion.h1>

                {/* Progress Steps */}
                <div className="flex justify-between mb-12">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-primary text-text-primary' : 'bg-gray-800 text-gray-500'
                                }`}>
                                {step > s ? <Check size={20} /> : s}
                            </div>
                            {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-gray-800'}`} />}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="glass-premium p-8 rounded-3xl">
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Calendar className="text-primary" />
                                Rental Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Pickup Date</label>
                                    <input type="date" className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Return Date</label>
                                    <input type="date" className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary" required />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-200 mb-2">Pickup Location</label>
                                <select className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary">
                                    <option>Downtown HQ</option>
                                    <option>International Airport</option>
                                    <option>Westside Luxury Hub</option>
                                </select>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <User className="text-primary" />
                                Your Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                                    <input type="text" className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                                    <input type="email" className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Phone</label>
                                    <input type="tel" className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">License Number</label>
                                    <input type="text" className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary" required />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <CreditCard className="text-primary" />
                                Payment & Add-ons
                            </h2>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Shield className="text-primary" size={20} />
                                    Insurance Options
                                </h3>
                                {loading ? (
                                    <div className="animate-pulse space-y-3">
                                        {[1, 2].map(i => <div key={i} className="h-20 bg-gray-100/5 rounded-xl" />)}
                                    </div>
                                ) : insurances.length > 0 ? (
                                    <div className="space-y-3">
                                        {insurances.map((ins) => (
                                            <label
                                                key={ins.id}
                                                className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${selectedInsurance?.id === ins.id
                                                    ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                                                    : 'bg-gray-100/5 border-gray-700 hover:bg-gray-100/10'
                                                    }`}
                                                onClick={() => setSelectedInsurance(ins)}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            checked={selectedInsurance?.id === ins.id}
                                                            readOnly
                                                            className="rounded-full bg-gray-100/10 border-white/20 text-primary"
                                                        />
                                                        <span className="font-bold">{ins.insuranceName}</span>
                                                    </div>
                                                    <span className="text-primary font-bold">
                                                        {ins.dailyPrice === 0 ? 'Included' : `+$${ins.dailyPrice}/day`}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-400 ml-8">{ins.insuranceDescription}</p>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 bg-gray-100/5 rounded-xl text-gray-400 text-sm italic">
                                        No specific insurance options available for this vehicle.
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold mb-4">Additional Extras</h3>
                                <div className="space-y-3">
                                    {['GPS Navigation (+$15/day)', 'Child Seat (+$10/day)'].map((addon, i) => (
                                        <label key={i} className="flex items-center gap-3 p-4 bg-gray-100/5 rounded-xl cursor-pointer hover:bg-gray-100/10 transition-colors">
                                            <input type="checkbox" className="rounded bg-gray-100/10 border-white/20 text-primary" />
                                            <span>{addon}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                                <div className="flex justify-between mb-2">
                                    <span>Rental (3 days)</span>
                                    <span className="font-bold">$3,600</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm mb-4">
                                    <span>Add-ons</span>
                                    <span>$0</span>
                                </div>
                                <div className="border-t border-primary/30 pt-4 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span className="text-blue-400">$3,600</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div className="flex gap-4 mt-8">
                        {step > 1 && (
                            <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-3 bg-gray-100/10 rounded-xl hover:bg-gray-100/20 transition-colors">
                                Back
                            </button>
                        )}
                        {step < 3 ? (
                            <button type="button" onClick={() => setStep(step + 1)} className="flex-1 btn-modern bg-gradient-to-r from-primary-dark to-primary text-text-primary py-3 rounded-xl font-bold">
                                Continue
                            </button>
                        ) : (
                            <button type="submit" className="flex-1 btn-modern bg-gradient-to-r from-primary-dark to-red-500 text-text-primary py-3 rounded-xl font-bold">
                                Confirm Booking
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
            <BookingPageContent />
        </Suspense>
    );
}
