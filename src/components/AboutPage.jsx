import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Mail, Github, Check, ArrowUpRight, Linkedin } from 'lucide-react';

const AboutPage = () => {
    const [mailCopied, setMailCopied] = React.useState(false);

    const handleMailClick = () => {
        navigator.clipboard.writeText("galla.nanda143@gmail.com");
        setMailCopied(true);
        setTimeout(() => setMailCopied(false), 2000);
    };
    
    // Set horizontal overflow to hidden to prevent side-scrolling during page animation transitions
    useEffect(() => {
        const originalOverflowX = document.body.style.overflowX;
        document.body.style.overflowX = 'hidden';
        
        return () => {
            document.body.style.overflowX = originalOverflowX;
        };
    }, []);
    
    // Animation variants for staggered screen loading
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.15,
                delayChildren: 0.05
            }
        }
    };
    
    const cardVariants = {
        hidden: { opacity: 0, x: -30, y: 15 },
        visible: { 
            opacity: 1, 
            x: 0, 
            y: 0,
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        }
    };

    const photoVariants = {
        hidden: { opacity: 0, x: 30, y: 15 },
        visible: { 
            opacity: 1, 
            x: 0, 
            y: 0,
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        }
    };

    return (
        <div className="w-full min-h-screen relative z-10 pt-24 pb-24 px-4 sm:px-6 md:px-12 lg:px-14 xl:px-16 bg-transparent flex flex-col items-center gap-16 overflow-y-auto">
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-[96rem] xl:max-w-[100rem] 2xl:max-w-[104rem] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-stretch lg:min-h-[82vh]"
            >
                {/* 1. Left Side: Content Card */}
                <motion.div 
                    variants={cardVariants}
                    className="w-full order-2 lg:order-1 lg:col-span-7 bg-[#0a0a0a]/75 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-10 xl:p-12 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors duration-500 flex flex-col justify-center lg:h-full"
                >
                    {/* Decorative subtle grid pattern in the top-right background */}
                    <div 
                        className="absolute right-0 top-0 w-52 h-52 opacity-[0.02] pointer-events-none" 
                        style={{ 
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
                            backgroundSize: '14px 14px' 
                        }} 
                    />
                    
                    {/* Massive Bold Heading Title */}
                    <div className="space-y-0.5 mb-4">
                        <div className="text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.2rem] font-black leading-none tracking-tight uppercase text-white">
                            I'M NANDA
                        </div>
                        <div className="text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.2rem] font-black leading-none tracking-tight uppercase text-white">
                            SIVA
                        </div>
                        <div className="text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.2rem] font-black leading-none tracking-tight uppercase text-white">
                            SRINIVAS
                        </div>
                        <div className="text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.2rem] font-black leading-none tracking-tight uppercase text-white">
                            GALLA
                        </div>
                    </div>

                    {/* Content Paragraphs */}
                    <div className="space-y-3 text-[11px] sm:text-xs lg:text-[12px] xl:text-[13px] text-white/60 leading-relaxed font-light">
                        <p>
                            A passionate <strong className="font-semibold text-white">Computer Science student</strong> and <strong className="font-semibold text-white">Full Stack Developer</strong> dedicated to creating scalable, efficient, and user-focused digital experiences. I specialize in <strong className="font-semibold text-white">Java, Spring Boot, React.js</strong>, and modern web technologies, with hands-on experience in building responsive web applications, REST APIs, and cloud-based solutions.
                        </p>
                        <p>
                            My journey in technology is driven by curiosity, continuous learning, and solving real-world problems through clean and impactful code. I have worked on full-stack projects involving frontend development, backend engineering, databases, DevOps practices, and deployment technologies.
                        </p>
                        <p>
                            From developing property management platforms to building multilingual applications, I enjoy transforming ideas into functional products that combine performance, innovation, and great user experience. Beyond coding, I enjoy exploring emerging technologies.
                        </p>
                    </div>

                    {/* Premium Education Details Block */}
                    <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
                        <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                            <GraduationCap size={14} className="text-cyan-400 animate-pulse" />
                            Academic Journey
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* KL University */}
                            <motion.div 
                                whileHover={{ scale: 1.015, borderColor: "rgba(34, 211, 238, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                                transition={{ duration: 0.2 }}
                                className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.015] border border-white/[0.04] transition-all duration-300 relative group/edu"
                            >
                                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider transition-colors duration-300 group-hover/edu:text-cyan-400">
                                    KL University
                                </h4>
                                <p className="text-[10px] sm:text-xs text-white/50 mt-1 font-light leading-relaxed">
                                    Bachelor of Technology in Computer Science & Engineering
                                </p>
                            </motion.div>
                            
                            {/* BVC College */}
                            <motion.div 
                                whileHover={{ scale: 1.015, borderColor: "rgba(168, 85, 247, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                                transition={{ duration: 0.2 }}
                                className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.015] border border-white/[0.04] transition-all duration-300 relative group/edu"
                            >
                                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider transition-colors duration-300 group-hover/edu:text-purple-400">
                                    BVC Engineering College
                                </h4>
                                <p className="text-[10px] sm:text-xs text-white/50 mt-1 font-light leading-relaxed">
                                    Diploma in Computer Engineering
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. Right Side: Photo Card */}
                <motion.div 
                    variants={photoVariants}
                    className="w-full order-1 lg:order-2 lg:col-span-5 relative group p-3 flex flex-col min-h-[400px] sm:min-h-[500px] lg:min-h-0 lg:h-full"
                >
                    {/* Image Container with customized border corners */}
                    <div className="relative w-full h-full flex-1 rounded-[2rem] overflow-hidden border border-white/10 bg-[#0e0e0e]/50 backdrop-blur-md">
                        <img 
                            src={`${import.meta.env.BASE_URL}Nanda.jpg`} 
                            alt="Nanda Siva Srinivas Galla"
                            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110 brightness-[0.8] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-[0.95] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{ objectPosition: 'center 20%' }}
                        />
                        {/* Shadow Gradient Mask */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent pointer-events-none" />
                    </div>
                </motion.div>
                
            </motion.div>

            {/* 3. New Futuristic Contact Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[96rem] xl:max-w-[100rem] 2xl:max-w-[104rem] mt-12"
            >
                {/* Contact Asymmetric Cyber Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
                    {/* GMAIL CARD */}
                    <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={handleMailClick}
                        className="bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 hover:border-red-500/30 rounded-[2.2rem] p-8 flex flex-col items-center justify-center gap-5 group cursor-pointer shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[190px]"
                    >
                        {/* Radial Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                             style={{ background: 'radial-gradient(circle at center, rgba(239,68,68,0.06) 0%, transparent 75%)' }} />

                        {/* Brand Icon */}
                        <div className="p-4 rounded-full bg-white/[0.02] border border-white/[0.04] group-hover:bg-red-500/10 group-hover:border-red-500/20 text-white/50 group-hover:text-red-400 group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.45)] transition-all duration-500">
                            <Mail size={28} />
                        </div>

                        {/* Username centered and beautifully styled */}
                        <div className="text-center z-10 w-full overflow-hidden px-2">
                            <h4 className="text-[11px] sm:text-xs font-mono tracking-wider text-white/70 group-hover:text-red-400 transition-colors duration-300 break-all select-all">
                                galla.nanda143@gmail.com
                            </h4>
                        </div>

                        {/* Copy overlay success alert */}
                        <AnimatePresence>
                            {mailCopied && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute inset-0 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center z-20 space-y-2 rounded-[2.2rem]"
                                >
                                    <div className="p-2.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                        <Check size={18} />
                                    </div>
                                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-green-400 font-bold">
                                        SUCCESSFULLY COPIED
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* GITHUB CARD */}
                    <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => window.open("https://github.com/NANDA-GALLA", "_blank", "noopener,noreferrer")}
                        className="bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 hover:border-white/20 rounded-[2.2rem] p-8 flex flex-col items-center justify-center gap-5 group cursor-pointer shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[190px]"
                    >
                        {/* Radial Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                             style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 75%)' }} />

                        {/* Brand Icon */}
                        <div className="p-4 rounded-full bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/10 group-hover:border-white/20 text-white/50 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-all duration-500">
                            <Github size={28} />
                        </div>

                        {/* Username centered and beautifully styled */}
                        <div className="text-center z-10 w-full overflow-hidden px-2">
                            <h4 className="text-base sm:text-lg font-black uppercase tracking-[0.15em] text-white/70 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300">
                                @NANDA-GALLA
                            </h4>
                        </div>
                    </motion.div>

                    {/* TWITTER / X CARD */}
                    <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => window.open("https://x.com", "_blank", "noopener,noreferrer")}
                        className="bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 hover:border-purple-500/30 rounded-[2.2rem] p-8 flex flex-col items-center justify-center gap-5 group cursor-pointer shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[190px]"
                    >
                        {/* Radial Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                             style={{ background: 'radial-gradient(circle at center, rgba(168,85,247,0.05) 0%, transparent 75%)' }} />

                        {/* Brand Icon */}
                        <div className="p-4 rounded-full bg-white/[0.02] border border-white/[0.04] group-hover:bg-purple-500/10 group-hover:border-purple-500/20 text-white/50 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.45)] transition-all duration-500 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </div>

                        {/* Username centered and beautifully styled */}
                        <div className="text-center z-10 w-full overflow-hidden px-2">
                            <h4 className="text-base sm:text-lg font-black uppercase tracking-[0.15em] text-white/70 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300">
                                @NANDA-GALLA
                            </h4>
                        </div>
                    </motion.div>

                    {/* LINKEDIN CARD */}
                    <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => window.open("https://www.linkedin.com/in/nanda-siva-srinivas-galla", "_blank", "noopener,noreferrer")}
                        className="bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 hover:border-sky-500/30 rounded-[2.2rem] p-8 flex flex-col items-center justify-center gap-5 group cursor-pointer shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[190px]"
                    >
                        {/* Radial Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                             style={{ background: 'radial-gradient(circle at center, rgba(14,165,233,0.06) 0%, transparent 75%)' }} />

                        {/* Brand Icon */}
                        <div className="p-4 rounded-full bg-white/[0.02] border border-white/[0.04] group-hover:bg-sky-500/10 group-hover:border-sky-500/20 text-white/50 group-hover:text-sky-400 group-hover:drop-shadow-[0_0_12px_rgba(14,165,233,0.45)] transition-all duration-500">
                            <Linkedin size={28} />
                        </div>

                        {/* Username centered and beautifully styled */}
                        <div className="text-center z-10 w-full overflow-hidden px-2">
                            <h4 className="text-base sm:text-lg font-black uppercase tracking-[0.15em] text-white/70 group-hover:text-sky-400 group-hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all duration-300">
                                @NANDA-GALLA
                            </h4>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutPage;
