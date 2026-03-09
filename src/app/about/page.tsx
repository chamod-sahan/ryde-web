'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { Crown, Star, Shield, Clock, Heart, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-background text-text-primary pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    className="max-w-5xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-5 py-2 mb-6">
                            <Crown className="text-amber-400" size={18} />
                            <span className="text-amber-400 text-sm font-semibold tracking-wide">ESTABLISHED 2024</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                            About Ryde
                        </h1>
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
                            <Star className="text-amber-500 fill-amber-500" size={16} />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 rounded-3xl blur-xl"></div>
                        <div className="relative glass-premium p-10 md:p-14 rounded-3xl border border-amber-500/20">
                            <div className="absolute top-0 left-10 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 right-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl"></div>
                            
                            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 mb-8 font-light">
                                <span className="font-semibold text-amber-600">Founded in 2024,</span> Ryde was created with a singular vision: to redefine the car rental experience. We believe that the journey is just as important as the destination, which is why we offer a fleet that inspires and excites.
                            </p>
                            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light">
                                From <span className="font-semibold text-gray-900">high-performance sports cars</span> to <span className="font-semibold text-gray-900">luxurious sedans</span> and <span className="font-semibold text-gray-900">rugged SUVs</span>, every vehicle in our collection is maintained to the highest standards. Our commitment to technology and service ensures a seamless, paperless, and frictionless experience from booking to return.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16"
                    >
                        {[
                            { icon: Clock, value: "5+", label: "Years of Excellence", color: "amber" },
                            { icon: Heart, value: "10k+", label: "Happy Customers", color: "rose" },
                            { icon: Award, value: "500+", label: "Premium Vehicles", color: "amber" }
                        ].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative glass-premium p-8 rounded-2xl text-center border border-gray-200 group-hover:border-amber-500/30 transition-colors">
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                                        stat.color === 'amber' ? 'bg-amber-500/20' : 'bg-rose-500/20'
                                    }`}>
                                        <stat.icon className={`w-8 h-8 ${
                                            stat.color === 'amber' ? 'text-amber-600' : 'text-rose-500'
                                        }`} />
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-3 mb-8">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Mission</h2>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
                        </div>
                        
                        <div className="relative inline-block">
                            <div className="absolute -inset-6 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 rounded-full blur-xl"></div>
                            <p className="relative text-2xl md:text-3xl italic font-serif text-gray-800 max-w-3xl mx-auto leading-relaxed">
                                <span className="text-amber-600">"</span>To empower journeys with freedom, style, and uncompromising quality.<span className="text-amber-600">"</span>
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-8 mt-10">
                            {[
                                { icon: Shield, label: "Premium Quality" },
                                { icon: Star, label: "5-Star Service" },
                                { icon: Crown, label: "Luxury Fleet" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-500">
                                    <item.icon size={18} className="text-amber-500" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span>Premium Luxury Car Rental Experience</span>
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
