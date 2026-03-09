'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import BookingWidget from '@/components/BookingWidget';
import Image from 'next/image';
import ThreeBackground from '@/components/ThreeBackground';
import { Car, MapPin, Users, Star } from 'lucide-react';

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const heroContentX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });
  const heroContentY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-surface to-blue-50 overflow-hidden transition-colors duration-300">
      {/* 3D Background Images */}
      {/* Real-time 3D Background */}
      <ThreeBackground />

      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none"></div>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <motion.div
          className="text-center mb-16"
          style={{ x: heroContentX, y: heroContentY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-6xl md:text-7xl font-bold text-text-primary mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Journey
            <span className="block text-primary">Starts Here</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-text-primary font-semibold drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Premium car rental services with modern fleet, competitive prices, and exceptional customer service
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16 relative z-20"
        >
          <BookingWidget />
        </motion.div>

        {/* Enhanced Stats section with images */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Trusted by Thousands</h3>
            <p className="text-text-secondary text-lg">Join our growing community of satisfied customers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: "500+",
                label: "Vehicles",
                icon: <Car className="w-8 h-8 text-primary" />
              },
              {
                number: "50+",
                label: "Locations",
                icon: <MapPin className="w-8 h-8 text-primary" />
              },
              {
                number: "100K+",
                label: "Customers",
                icon: <Users className="w-8 h-8 text-primary" />
              },
              {
                number: "4.8★",
                label: "Rating",
                icon: <Star className="w-8 h-8 text-primary" />
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-premium rounded-2xl p-6 text-center group cursor-pointer flex flex-col items-center justify-center card-3d border border-border"
                whileHover={{ scale: 1.05, y: -10, rotateX: 5, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="mb-4 relative overflow-hidden rounded-xl bg-primary/10 p-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-text-secondary font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-primary/60 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
