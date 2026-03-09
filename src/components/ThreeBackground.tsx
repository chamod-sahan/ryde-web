'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-white transition-colors duration-300">
            {/* Background Image with Animation */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1 }}
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -20, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Car Background"
                    className="w-full h-full object-cover"
                />
                {/* Stronger white overlay to ensure dark text visibility */}
                <div className="absolute inset-0 bg-white/60"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/80"></div>
            </motion.div>

            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

                <ambientLight intensity={0.7} />

                <Suspense fallback={null}>
                    <Environment preset="sunset" />
                    <Stars
                        radius={100}
                        depth={50}
                        count={1000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={1}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
