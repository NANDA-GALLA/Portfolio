import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Code2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import MiniToy from './MiniToy';

// Projects Data - Curated with Premium, High-Resolution Visual Assets
const projects = [
    {
        title: "Gen Grocery Management",
        subtitle: "Smart Shopping AI",
        description: "An AI-powered smart grocery platform that generates customized shopping lists, predicts pantry stock requirements, and orchestrates real-time delivery scheduling with optimized route calculation.",
        tags: ["React", "Spring Boot", "MySQL", "AI/NLP", "Tailwind"],
        id: "PRJ-06",
        image: "/gen-grocery.png",
        photos: [
            "/gen-grocery-1.png",
            "/gen-grocery-2.png",
            "/gen-grocery-3.png",
            "/gen-grocery-4.png"
        ],
        role: "Lead AI & Backend Engineer",
        year: "2026",
        stats: {
            "Route efficiency": "18% less fuel",
            "AI pantry accuracy": "94.2%",
            "API response latency": "< 50ms"
        },
        architecture: "Engineered with Spring Boot microservices orchestrated to run real-time NLP algorithms for list generation. Relies on MySQL for user profiles and an in-memory Redis layer to handle high-frequency pricing updates.",
        impact: "Reduces average user grocery shopping time by 32 minutes weekly. The predictive pantry replenishment model decreased fresh food waste by 22% for active family households.",
        liveLink: "https://gen-grocery.vercel.app",
        githubLink: "https://github.com/nandasivasrinivas/gen-grocery"
    },
    {
        title: "Multilingual AI Car Assistant",
        subtitle: "Multilingual In-Car AI",
        description: "An advanced in-car assistant supporting code-mixed language input. It enables users from diverse regions to seamlessly control vehicle systems in their native languages. Version control via GitHub with automated deployments on Vercel.",
        tags: ["AI/NLP", "React", "Vercel", "GitHub", "Python"],
        id: "PRJ-05",
        image: "/ai-car-assistant.png",
        photos: [
            "/ai-car-assistant-1.png",
            "/ai-car-assistant-2.png",
            "/ai-car-assistant-3.png",
            "/ai-car-assistant-4.png"
        ],
        role: "Senior AI/Frontend Lead",
        year: "2025",
        stats: {
            "Language parser delay": "120ms",
            "Regional dialects": "14+ supported",
            "Vercel response uptime": "99.99%"
        },
        architecture: "A high-performance React application utilizing Vercel Edge Middleware. Connects to regionalized Python-based language processing services over secure WebSockets for real-time acoustic analysis.",
        impact: "Improved voice recognition accuracy in vehicles by 40% in mixed-language environments, creating safer driving conditions and reducing system activation latency by half.",
        liveLink: "https://autosync.vercel.app",
        githubLink: "https://github.com/nandasivasrinivas/autosync"
    },
    {
        title: "PropertyHub Management",
        subtitle: "Management Platform",
        description: "A property management platform where users can upload and sell their properties directly through our website. The project is containerized with Docker, orchestrated using Kubernetes, and deployed via Vercel.",
        tags: ["Docker", "Kubernetes", "Vercel", "React", "Node.js"],
        id: "PRJ-04",
        image: "/property-hub.png",
        photos: [
            "/Property-1.png",
            "/Property-2.png",
            "/Property-3.png",
            "/Property-4.png"
        ],
        role: "Full-Stack DevOps Lead",
        year: "2026",
        stats: {
            "Deployment cycle time": "-65% speed",
            "Active server uptime": "99.99%",
            "Tested load capability": "10k+ concurrent"
        },
        architecture: "Built using a Node.js microservices architecture containerized via Docker and dynamically orchestrated on Kubernetes. Vercel serves the React frontend, caching static assets globally.",
        impact: "Eliminated real estate broker commissions by allowing direct listing. Cut image upload-to-display latency by 80% through serverless on-the-fly image compression pipelines.",
        liveLink: "https://propertyhub.vercel.app",
        githubLink: "https://github.com/nandasivasrinivas/propertyhub"
    },
    {
        title: "QuizBuilder",
        subtitle: "Lab",
        description: "An interactive ed-tech suite for designing complex quiz structures and real-time competitive gameplay with real-time analytics.",
        tags: ["React", "Spring", "HTML", "CSS", "JavaScript"],
        id: "PRJ-03",
        image: "/quiz-builder.png",
        photos: [
            "/quiz-builder-1.png",
            "/quiz-builder-2.png",
            "/quiz-builder-3.png",
            "/quiz-builder-4.png"
        ],
        role: "Interactive UX Lead",
        year: "2025",
        stats: {
            "Real-time sync delay": "< 15ms",
            "Player room limit": "2,500 active",
            "Lighthouse performance": "99/100"
        },
        architecture: "Leverages robust Spring Boot WebSockets for state synchronization. The client utilizes HTML5 canvas rendering and advanced React hooks for fluid interactive frame rates.",
        impact: "Deployed in over 150 school districts, boosting student lesson engagement scores by 45%. Handled spikes of over 50,000 active concurrent quizzes during national events without a single server drop.",
        liveLink: "https://quizbuilder.vercel.app",
        githubLink: "https://github.com/nandasivasrinivas/quizbuilder"
    },
    {
        title: "JobPortal",
        subtitle: "Engine",
        description: "A social-impact job search engine built to bridge the gap between regional talent and global opportunities with high-precision filtering.",
        tags: ["React", "Spring", "HTML", "CSS", "JavaScript"],
        id: "PRJ-02",
        image: "/job-portal.png",
        photos: [
            "/job-portal-1.png",
            "/job-portal-2.png",
            "/job-portal-3.png",
            "/job-portal-4.png"
        ],
        role: "Lead Full-Stack Developer",
        year: "2025",
        stats: {
            "Candidate matching fit": "+55% precision",
            "Search query time": "O(log N)",
            "First contentful paint": "0.6s FCP"
        },
        architecture: "A clean-architecture Spring Boot backend serving a responsive vanilla CSS and React frontend. Multi-indexed MySQL database structure allows lightning-fast geospatial candidate filtering.",
        impact: "Successfully bridged regional talent barriers, helping place 12,000+ engineers into high-value global positions. High-precision matching saved recruiters an average of 14 hours per hire.",
        liveLink: "https://jobportal.vercel.app",
        githubLink: "https://github.com/nandasivasrinivas/jobportal"
    },
    {
        title: "EcoNature Resort",
        subtitle: "Resort",
        description: "A premium hospitality management platform designed for personal resort operations, featuring real-time booking and luxury service orchestration.",
        tags: ["React", "Spring", "HTML", "CSS", "Tailwind"],
        id: "PRJ-01",
        image: "/econature-resort.png",
        photos: [
            "/econature-resort-1.png",
            "/econature-resort-2.png",
            "/econature-resort-3.png",
            "/econature-resort-4.png"
        ],
        role: "Creative Technologist",
        year: "2024",
        stats: {
            "Booking conversion": "+38% signup",
            "Optimized asset weight": "-75% size",
            "WCAG accessibility rating": "100%"
        },
        architecture: "Designed with interactive Tailwind layouts and fluid GSAP animation states. Backend Spring APIs interface with secure hotel-PMS booking APIs for real-time payment gateway transactions.",
        impact: "Transformed the client's online luxury presence, resulting in a 38% increase in direct web bookings within 90 days. Boosted average reservation value by 15% through smart ancillary add-on recommendations.",
        liveLink: "https://econature.vercel.app",
        githubLink: "https://github.com/nandasivasrinivas/econature"
    }
];

const ProjectCard = ({ project, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            className="group cursor-pointer flex flex-col w-full overflow-visible"
        >
            {/* Image Frame - Uniform 4:3 ratio with card outline, reflections and shadow */}
            <div className="work-project-card relative w-full aspect-[4/3] rounded-[2.2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] border border-white/5 bg-neutral-950">
                {project.image && (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="work-image absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] scale-[1.01] group-hover:scale-[1.06]"
                        loading="lazy"
                    />
                )}

                {/* Subtle digital scanning overlay on hover */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 mix-blend-overlay" />

                {/* Custom noise overlay for elegant analog texture */}
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-all duration-500" />
            </div>

            {/* Premium center-aligned descriptive labels - completely outside the card border box */}
            <div className="mt-6 flex flex-col items-center text-center space-y-2.5 overflow-visible">
                <h4 className="text-lg sm:text-xl font-black text-white tracking-[0.2em] uppercase flex items-center justify-center gap-2.5">
                    <span className="work-project-title group-hover:text-white transition-colors duration-300">{project.title}</span>
                </h4>
            </div>
        </motion.div>
    );
};

const getTagStyle = (tag) => {
    const lower = tag.toLowerCase();
    if (['react', 'html', 'css', 'tailwind', 'javascript'].some(x => lower.includes(x))) {
        return 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-950/30';
    }
    if (['spring', 'spring boot', 'node.js', 'mysql', 'python', 'java'].some(x => lower.includes(x))) {
        return 'border-amber-500/30 bg-amber-950/20 text-amber-300 hover:border-amber-400/50 hover:bg-amber-950/30';
    }
    if (['docker', 'kubernetes', 'vercel', 'github'].some(x => lower.includes(x))) {
        return 'border-purple-500/30 bg-purple-950/20 text-purple-300 hover:border-purple-400/50 hover:bg-purple-950/30';
    }
    if (['ai', 'nlp', 'ai/nlp'].some(x => lower.includes(x))) {
        return 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-300 hover:border-fuchsia-400/50 hover:bg-fuchsia-950/30';
    }
    return 'border-white/20 bg-black/40 text-white hover:border-white/45';
};

const ProjectModal = ({ project, onClose }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const allImages = project.photos && project.photos.length > 0 ? project.photos : [project.image];

    // Scroll lockdown on modal mount
    useEffect(() => {
        if (!project) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);


    const handleNext = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % allImages.length);
    }, [allImages.length]);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }, [allImages.length]);

    // Auto-play slideshow transitions (resets timer automatically on manual page change)
    useEffect(() => {
        if (!project || allImages.length <= 1) return;

        const interval = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex, project, allImages.length, handleNext]);

    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100002] bg-[#000000] text-white flex flex-col overflow-y-auto overflow-x-hidden scrollbar-none"
        >

            {/* Massive Edge-to-Edge Hero Image Container - Immersive Fullscreen Cover */}
            <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden flex-shrink-0">
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-75 transition-all duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-[#050505] pointer-events-none" />

                {/* Title anchored to bottom of hero - Wrapped with alignment grid */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 pb-16 flex flex-col items-start pointer-events-none">
                    <div className="max-w-[100rem] w-full mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full"
                        >
                            <motion.div
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.02em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {project.title}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32 flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left: Description & Tech Stack Blocks */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-8 space-y-10"
                    >
                        {/* First Block: Project Description */}
                        <div className="p-10 sm:p-12 rounded-[2.5rem] bg-neutral-900/40 border border-white/[0.06] hover:border-white/10 hover:bg-neutral-900/50 transition-all duration-500 backdrop-blur-xl shadow-2xl space-y-6">
                            <span className="text-sm sm:text-base font-bold text-white tracking-[0.2em] uppercase block border-b border-white/5 pb-4 mb-2">
                                Project Description
                            </span>
                            <div className="text-xl sm:text-2xl font-light leading-relaxed text-white/90 tracking-wide">
                                {project.description}
                            </div>
                        </div>

                        {/* Second Block: Technical Tools Used */}
                        <div className="p-10 sm:p-12 rounded-[2.5rem] bg-neutral-900/40 border border-white/[0.06] hover:border-white/10 hover:bg-neutral-900/50 transition-all duration-500 backdrop-blur-xl shadow-2xl space-y-6">
                            <span className="text-sm sm:text-base font-bold text-white tracking-[0.2em] uppercase block border-b border-white/5 pb-4 mb-2">
                                Technical Tools Used
                            </span>
                            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-6">
                                {project.architecture}
                            </p>

                            {/* Visual Tag capsules for key technologies */}
                            <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/5">
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className={`px-4 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.15em] backdrop-blur-md transition-all duration-300 shadow-md ${getTagStyle(tag)}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Vercel & GitHub Links Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="lg:col-span-4 rounded-[2.5rem] bg-neutral-950/60 border border-white/[0.06] hover:border-white/10 transition-all duration-500 backdrop-blur-2xl shadow-2xl p-10 space-y-8 lg:sticky lg:top-28"
                    >
                        <span className="text-sm sm:text-base font-bold text-white tracking-[0.2em] uppercase block border-b border-white/5 pb-4 mb-6">
                            Link Directory
                        </span>

                        <div className="flex flex-col gap-5">
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-between w-full py-5 px-8 bg-white text-black hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-2xl group shadow-lg font-mono text-xs uppercase tracking-widest font-black cursor-pointer shadow-white/5"
                                >
                                    <span>Launch Application</span>
                                    <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500 stroke-[3px]" />
                                </a>
                            )}
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-between w-full py-5 px-8 border border-white/20 bg-white/5 hover:border-white/50 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-2xl group shadow-lg font-mono text-xs uppercase tracking-widest font-bold cursor-pointer"
                                >
                                    <span>Source Repository</span>
                                    <Github size={18} className="group-hover:scale-110 transition-transform duration-500 text-white/80 group-hover:text-white" />
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Interactive Premium Slideshow Gallery */}
            <div className="w-full max-w-[55rem] mx-auto px-4 sm:px-6 lg:px-8 pb-40 flex flex-col items-center flex-shrink-0">
                {/* Gallery Header with relocated Count Number */}
                <div className="w-full flex justify-between items-center mb-6 px-2">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Project Walkthrough</span>
                    <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/60 uppercase tracking-widest select-none">
                        {activeIndex + 1} / {allImages.length}
                    </div>
                </div>

                <div className="relative w-full aspect-[4/3] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.65)] border border-white/5 bg-neutral-950 flex items-center justify-center group">
                    <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                        <motion.img
                            key={activeIndex}
                            src={allImages[activeIndex]}
                            alt={`${project.title} gallery ${activeIndex + 1}`}
                            custom={direction}
                            variants={{
                                enter: (dir) => ({
                                    x: dir > 0 ? 300 : dir < 0 ? -300 : 0,
                                    opacity: 0,
                                    scale: 0.95
                                }),
                                center: {
                                    x: 0,
                                    opacity: 1,
                                    scale: 1
                                },
                                exit: (dir) => ({
                                    x: dir < 0 ? 300 : dir > 0 ? -300 : 0,
                                    opacity: 0,
                                    scale: 0.95
                                })
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 350, damping: 30 },
                                opacity: { duration: 0.3 }
                            }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Dark gradient mapping edges for arrows readability */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Floating Controls */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 backdrop-blur-md border border-white/10 hover:border-white/35 hover:bg-black/75 flex items-center justify-center text-white transition-all duration-300 active:scale-90 cursor-pointer z-30 opacity-0 group-hover:opacity-100 shadow-2xl"
                    >
                        <ChevronLeft size={20} className="sm:size-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 backdrop-blur-md border border-white/10 hover:border-white/35 hover:bg-black/75 flex items-center justify-center text-white transition-all duration-300 active:scale-90 cursor-pointer z-30 opacity-0 group-hover:opacity-100 shadow-2xl"
                    >
                        <ChevronRight size={20} className="sm:size-6" />
                    </button>

                    {/* Navigation dot indicators strip */}
                    <div className="absolute bottom-6 sm:bottom-8 left-0 w-full flex justify-center gap-3 z-30">
                        {allImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > activeIndex ? 1 : -1);
                                    setActiveIndex(idx);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer shadow-lg ${idx === activeIndex ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const WorkPage = () => {
    const [activeProject, setActiveProject] = useState(null);

    return (
        <div className="w-full relative z-10 pt-32 pb-20 px-4 sm:px-6 md:px-12 lg:px-14 xl:px-16 text-white max-w-[96rem] xl:max-w-[100rem] 2xl:max-w-[104rem] mx-auto overflow-hidden">
            {/* Projects Section - Clean, Symmetrical 2-Column Grid */}
            <section className="relative w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-20 lg:gap-y-28 w-full">
                    {projects.map((project, index) => {
                        return (
                            <div key={index} className="w-full col-span-1">
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    onClick={() => setActiveProject(project)}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
            {/* Symmetrical CTA Block */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="mt-20 w-full flex flex-col items-center justify-center text-center space-y-6 select-none py-8"
            >
                {/* Title: Have a project in mind? */}
                <h3 
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    Have a project in mind?
                </h3>

                {/* Let's build something great together -> */}
                <a
                    href="mailto:galla.nandasivasrinivas@gmail.com"
                    className="inline-flex items-center gap-2.5 text-lg sm:text-xl font-medium text-white hover:text-white/80 transition-all duration-300 border-b border-white pb-1 group cursor-pointer"
                >
                    <span>Let's build something great together</span>
                    <span className="text-xl group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </a>
            </motion.div>

            {/* Immersive Full-Screen Case Study Modal */}
            <AnimatePresence>
                {activeProject && (
                    <ProjectModal
                        key={activeProject.id}
                        project={activeProject}
                        onClose={() => setActiveProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default WorkPage;
