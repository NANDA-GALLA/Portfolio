import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete, onBlast }) => {
    const [progress, setProgress] = useState(0);
    const [isBlasted, setIsBlasted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

    const progressRef = useRef(0);
    const requestRef = useRef();

    // Track mouse cursor coordinates for sleek cursor glow overlay
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Smooth automatic loading progress algorithm
    useEffect(() => {
        const updateProgress = () => {
            if (progressRef.current < 100) {
                // Increment loading progress smoothly up to 100%
                progressRef.current = Math.min(progressRef.current + 1.2, 100);
                setProgress(Math.round(progressRef.current));
                requestRef.current = requestAnimationFrame(updateProgress);
            } else if (!isBlasted) {
                setIsBlasted(true);
                if (onBlast) onBlast('menu');
                setTimeout(() => {
                    if (onComplete) onComplete('menu');
                }, 1800);
            }
        };

        requestRef.current = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(requestRef.current);
    }, [isBlasted, onBlast, onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                className={`fixed inset-0 z-[9999] overflow-hidden select-none touch-none bg-black flex flex-col items-center justify-center ${isBlasted ? 'pointer-events-none' : ''}`}
                exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
            >
                {/* 1. Elegant Interactive Cursor Glow */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-40 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.04) 0%, transparent 80%)`
                    }}
                />

                {/* 2. Typographic Core Container */}
                <motion.div
                    className="z-20 text-center space-y-4 px-6 relative"
                    animate={{
                        scale: isBlasted ? 1.08 : 1.0,
                        opacity: isBlasted ? 0 : 1
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Small Typographic Central Name Header */}
                    <div 
                        className="text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-white/50 select-none transition-all duration-300"
                    >
                        NANDA SIVA SRINIVAS GALLA
                    </div>

                    {/* Elegant Digital Loading percentage counter */}
                    <div className="text-5xl sm:text-6xl md:text-7xl font-mono tracking-[0.05em] text-white font-black select-none mt-2">
                        {progress.toString().padStart(3, '0')}%
                    </div>
                </motion.div>

                {/* 3. Symmetrical Blast Shutter Doors */}
                <div
                    className={`absolute w-full h-[50%] bg-[#000000] z-10 top-0 left-0 transition-transform duration-[1.8s] ${isBlasted ? '-translate-y-full' : 'translate-y-0'}`}
                    style={{ transitionTimingFunction: 'cubic-bezier(.76,0,.24,1)', transitionDelay: '0.1s' }}
                />
                <div
                    className={`absolute w-full h-[50%] bg-[#000000] z-10 bottom-0 left-0 transition-transform duration-[1.8s] ${isBlasted ? 'translate-y-full' : 'translate-y-0'}`}
                    style={{ transitionTimingFunction: 'cubic-bezier(.76,0,.24,1)', transitionDelay: '0.1s' }}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default LoadingScreen;
