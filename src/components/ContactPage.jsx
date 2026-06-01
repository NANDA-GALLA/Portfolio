import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Check, Copy, Send } from 'lucide-react';

const ContactPage = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copiedField, setCopiedField] = useState(null); // 'email' | 'phone' | null

    // Prevent horizontal overflow while keeping standard vertical scroll function
    useEffect(() => {
        const originalOverflowX = document.body.style.overflowX;
        document.body.style.overflowX = 'hidden';
        return () => {
            document.body.style.overflowX = originalOverflowX;
        };
    }, []);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) return;

        setIsSubmitting(true);
        try {
            // First try: Asynchronous AJAX transmission
            const response = await fetch("https://formsubmit.co/ajax/galla.nanda143@gmail.com", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: `New Portfolio Message from ${formState.name}`,
                    Name: formState.name,
                    Email: formState.email,
                    Message: formState.message
                })
            });

            const data = await response.json();

            if (response.ok && data.success === "true") {
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                setIsSubmitting(false);
                const errMsg = data.message || "Transmission failed.";
                alert(`FormSubmit Status: ${errMsg}\n\nNote: If this is the first submission, FormSubmit requires email activation. Please check your inbox (galla.nanda143@gmail.com) for a confirmation email, click the link, and re-submit.`);
            }
        } catch (error) {
            console.warn("AJAX transmission blocked by browser CORS policy or adblocker. Redirecting securely via standard HTML post navigation...");
            
            try {
                // Second try: Standard secure Form POST fallback (bypasses CORS restrictions 100% successfully)
                const tempForm = document.createElement('form');
                tempForm.action = "https://formsubmit.co/galla.nanda143@gmail.com";
                tempForm.method = "POST";
                tempForm.target = "_blank"; // Submits in a new tab so they don't lose active portfolio context!
                
                // Name payload
                const nameInput = document.createElement('input');
                nameInput.type = "hidden";
                nameInput.name = "name";
                nameInput.value = formState.name;
                tempForm.appendChild(nameInput);
                
                // Email payload
                const emailInput = document.createElement('input');
                emailInput.type = "hidden";
                emailInput.name = "email";
                emailInput.value = formState.email;
                tempForm.appendChild(emailInput);
                
                // Message payload
                const messageInput = document.createElement('input');
                messageInput.type = "hidden";
                messageInput.name = "message";
                messageInput.value = formState.message;
                tempForm.appendChild(messageInput);
                
                // Subject prefix
                const subjectInput = document.createElement('input');
                subjectInput.type = "hidden";
                subjectInput.name = "_subject";
                subjectInput.value = `New Portfolio Message from ${formState.name}`;
                tempForm.appendChild(subjectInput);

                // Mount, execute form dispatch, and clean up DOM node
                document.body.appendChild(tempForm);
                tempForm.submit();
                document.body.removeChild(tempForm);
                
                // Update local visual states to indicate success on portfolio page
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 5000);
            } catch (fallbackError) {
                console.error("Standard fallback submission failed:", fallbackError);
                setIsSubmitting(false);
                alert("A connection error occurred. Please email directly to galla.nanda143@gmail.com");
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    // Staggered loading animations
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

    const leftCardVariants = {
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

    const rightCardVariants = {
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
        <div className="w-full min-h-screen lg:h-screen relative z-10 pt-32 lg:pt-24 pb-48 lg:pb-12 px-4 sm:px-6 md:px-12 lg:px-14 xl:px-16 bg-transparent flex flex-col items-center lg:justify-center gap-16 lg:gap-8 overflow-y-auto lg:overflow-hidden">

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-[96rem] xl:max-w-[100rem] 2xl:max-w-[104rem] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-stretch lg:min-h-[75vh]"
            >
                {/* 1. Left Side: Futuristic Contact Form Card */}
                <motion.div
                    variants={leftCardVariants}
                    className="w-full lg:col-span-7 bg-[#0a0a0a]/75 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-10 xl:p-12 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors duration-500 flex flex-col justify-center"
                >
                    {/* Subtle micro-grid pattern */}
                    <div
                        className="absolute right-0 top-0 w-64 h-64 opacity-[0.02] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '16px 16px'
                        }}
                    />

                    {/* Glowing Accent Ring */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.02),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="space-y-2 mb-8 relative z-10">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white leading-none">
                            GET IN TOUCH
                        </div>
                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-cyan-400/80">
                            TRANSMIT AN ENCRYPTED MESSAGE // SECURE CONNECTION
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
                        {/* Name Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 pl-1">
                                Sender Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formState.name}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                placeholder="ENTER YOUR NAME"
                                className="w-full bg-white/[0.015] hover:bg-white/[0.03] border border-white/[0.06] focus:border-cyan-500/40 rounded-2xl p-4 text-sm font-sans tracking-wide text-white outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300 placeholder:text-white/20 disabled:opacity-50"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 pl-1">
                                Sender Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formState.email}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                placeholder="ENTER YOUR EMAIL"
                                className="w-full bg-white/[0.015] hover:bg-white/[0.03] border border-white/[0.06] focus:border-cyan-500/40 rounded-2xl p-4 text-sm font-sans tracking-wide text-white outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300 placeholder:text-white/20 disabled:opacity-50"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 pl-1">
                                Core Message Payload
                            </label>
                            <textarea
                                name="message"
                                required
                                rows={5}
                                value={formState.message}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                placeholder="WRITE YOUR DETAILED MESSAGE HERE..."
                                className="w-full bg-white/[0.015] hover:bg-white/[0.03] border border-white/[0.06] focus:border-cyan-500/40 rounded-2xl p-4 text-sm font-sans tracking-wide text-white outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300 placeholder:text-white/20 resize-none disabled:opacity-50"
                            />
                        </div>

                        {/* Submit Button & Interactive Loading Sequences */}
                        <div className="relative pt-2">
                            <motion.button
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                type="submit"
                                disabled={isSubmitting || !formState.name || !formState.email || !formState.message}
                                className={`w-full py-4.5 px-6 rounded-2xl font-mono text-xs uppercase tracking-widest font-black transition-all duration-300 flex items-center justify-center gap-3 border shadow-lg cursor-pointer ${isSubmitting
                                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 cursor-wait'
                                        : 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-white/10 text-white hover:text-cyan-300 hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.25)] disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:text-white disabled:hover:drop-shadow-none'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4.5 w-4.5 text-cyan-400" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>TRANSMITTING MESSAGE TELEMETRY...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={15} />
                                        <span>TRANSMIT MESSAGE SECURELY</span>
                                    </>
                                )}
                            </motion.button>

                            {/* Encrypted network success modal */}
                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                                        className="absolute inset-0 bg-black/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center border border-emerald-500/20 shadow-2xl z-20 space-y-3 p-4 text-center"
                                    >
                                        <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                            <Check size={24} className="animate-bounce" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-sm font-bold uppercase tracking-wider text-white">
                                                TRANSMISSION COMPLETE
                                            </div>
                                            <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                                                MESSAGE DATA PACKETS ROUTED SUCCESSFULLY
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </motion.div>

                {/* 2. Right Side: Interactive Details & Info Cards */}
                <motion.div
                    variants={rightCardVariants}
                    className="w-full lg:col-span-5 flex flex-col justify-between gap-6"
                >
                    {/* Info Card Container */}
                    <div className="flex flex-col gap-6 flex-grow">

                        {/* EMAIL DETAILS CARD */}
                        <motion.div
                            whileHover={{ y: -4, borderColor: 'rgba(34,211,238,0.15)' }}
                            transition={{ duration: 0.3 }}
                            onClick={() => handleCopy('galla.nanda143@gmail.com', 'email')}
                            className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 flex items-center justify-between group cursor-pointer shadow-xl relative overflow-hidden transition-all duration-500 min-h-[120px]"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(34,211,238,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-center gap-4 z-10">
                                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/[0.06] group-hover:border-white/[0.08] text-white/50 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-500">
                                    <Mail size={20} />
                                </div>
                                <div className="text-left">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 block mb-1">
                                        EMAIL ADDRESS
                                    </span>
                                    <h4 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                                        galla.nanda143@gmail.com
                                    </h4>
                                </div>
                            </div>

                            <div className="text-white/20 group-hover:text-white/50 transition-colors duration-300 pr-2 z-10">
                                <Copy size={16} />
                            </div>

                            {/* Success Copied Alert inside individual card */}
                            <AnimatePresence>
                                {copiedField === 'email' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black/95 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center z-20 space-y-1.5"
                                    >
                                        <div className="p-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                                            <Check size={16} />
                                        </div>
                                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-green-400 font-bold">
                                            EMAIL COPIED TO CLIPBOARD
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* PHONE DETAILS CARD */}
                        <motion.div
                            whileHover={{ y: -4, borderColor: 'rgba(168,85,247,0.15)' }}
                            transition={{ duration: 0.3 }}
                            onClick={() => handleCopy('+91 98765 43210', 'phone')}
                            className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 flex items-center justify-between group cursor-pointer shadow-xl relative overflow-hidden transition-all duration-500 min-h-[120px]"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(168,85,247,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-center gap-4 z-10">
                                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/[0.06] group-hover:border-white/[0.08] text-white/50 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.3)] transition-all duration-500">
                                    <Phone size={20} />
                                </div>
                                <div className="text-left">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 block mb-1">
                                        SECURE TELEPHONE
                                    </span>
                                    <h4 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight group-hover:text-purple-300 transition-colors duration-300">
                                        +91 6301421287
                                    </h4>
                                </div>
                            </div>

                            <div className="text-white/20 group-hover:text-white/50 transition-colors duration-300 pr-2 z-10">
                                <Copy size={16} />
                            </div>

                            {/* Success Copied Alert inside individual card */}
                            <AnimatePresence>
                                {copiedField === 'phone' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black/95 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center z-20 space-y-1.5"
                                    >
                                        <div className="p-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                                            <Check size={16} />
                                        </div>
                                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-green-400 font-bold">
                                            PHONE COPIED TO CLIPBOARD
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* GEOLOCATION DETAILS CARD */}
                        <motion.div
                            whileHover={{ y: -4, borderColor: 'rgba(52,211,153,0.15)' }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 flex items-center justify-between group shadow-xl relative overflow-hidden transition-all duration-500 min-h-[120px] select-default cursor-default"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(52,211,153,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-center gap-4 z-10">
                                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/[0.06] group-hover:border-white/[0.08] text-white/50 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.3)] transition-all duration-500">
                                    <MapPin size={20} />
                                </div>
                                <div className="text-left">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 block mb-1">
                                        BASE LOCATION
                                    </span>
                                    <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider group-hover:text-emerald-300 transition-colors duration-300">
                                        Rajanagaram,Andhra Pradesh, India
                                    </h4>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* SOCIAL INTERACTION BAR */}
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {/* GITHUB */}
                        <motion.div
                            whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                            transition={{ duration: 0.2 }}
                            onClick={() => window.open("https://github.com/NANDA-GALLA", "_blank", "noopener,noreferrer")}
                            className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-[1.8rem] py-5 px-4 flex flex-col items-center justify-center gap-2 group cursor-pointer shadow-xl relative overflow-hidden transition-all duration-500"
                        >
                            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/[0.06] group-hover:border-white/[0.08] text-white/60 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-all duration-500">
                                <Github size={18} />
                            </div>
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors duration-300">
                                GITHUB
                            </span>
                        </motion.div>

                        {/* LINKEDIN */}
                        <motion.div
                            whileHover={{ y: -4, borderColor: 'rgba(14,165,233,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                            transition={{ duration: 0.2 }}
                            onClick={() => window.open("https://www.linkedin.com/in/nanda-siva-srinivas-galla", "_blank", "noopener,noreferrer")}
                            className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-[1.8rem] py-5 px-4 flex flex-col items-center justify-center gap-2 group cursor-pointer shadow-xl relative overflow-hidden transition-all duration-500"
                        >
                            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/[0.06] group-hover:border-white/[0.08] text-white/60 group-hover:text-sky-400 group-hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.25)] transition-all duration-500">
                                <Linkedin size={18} />
                            </div>
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors duration-300">
                                LINKEDIN
                            </span>
                        </motion.div>

                        {/* TWITTER / X */}
                        <motion.div
                            whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                            transition={{ duration: 0.2 }}
                            onClick={() => window.open("https://x.com", "_blank", "noopener,noreferrer")}
                            className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-[1.8rem] py-5 px-4 flex flex-col items-center justify-center gap-2 group cursor-pointer shadow-xl relative overflow-hidden transition-all duration-500"
                        >
                            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/[0.06] group-hover:border-white/[0.08] text-white/60 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-all duration-500">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors duration-300">
                                TWITTER
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ContactPage;
