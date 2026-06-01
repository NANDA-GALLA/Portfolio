import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu as CoreCpu, Radio, Cloud, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import {
    SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiTailwindcss, SiMongodb, SiMysql,
    SiSpringboot, SiFigma, SiDocker, SiPython, SiC, SiPostman, SiGit,
    SiCplusplus, SiCss3, SiGithub, SiHtml5, SiJenkins, SiPostgresql
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// Skills Data with rich telemetry metadata - Sorted alphabetically
const skills = [
    {
        name: "C",
        icon: SiC,
        color: "#659ad2",
        level: 70,
        category: "Low-Level Native Architecture",
        tech: ["Pointers", "Memory Alloc", "Structures", "Algorithms"],
        desc: "System internal architecture understanding, manual heap/stack allocations, pointers, and memory manipulation algorithms."
    },
    {
        name: "C++",
        icon: SiCplusplus,
        color: "#00599c",
        level: 75,
        category: "Object-Oriented Native Core",
        tech: ["Templates", "Pointers", "STL", "Memory Management"],
        desc: "Constructing high-performance native engines, custom systems, and algorithms using modern standard specifications."
    },
    {
        name: "CSS",
        icon: SiCss3,
        color: "#1572b6",
        level: 85,
        category: "Global Layout Stylist",
        tech: ["Flexbox", "CSS Grid", "Animations", "Variables", "Transitions"],
        desc: "Crafting fluid visual styling systems, custom UI frameworks, and absolute responsive device symmetry."
    },
    {
        name: "DOCKER",
        icon: SiDocker,
        color: "#2496ed",
        level: 65,
        category: "Containerization Subsystem",
        tech: ["Dockerfiles", "Docker Compose", "Multi-stage Builds", "Networks"],
        desc: "Isolating microservices into clean, repeatable container structures to guarantee absolute deployment consistency."
    },
    {
        name: "FIGMA",
        icon: SiFigma,
        color: "#f24e1e",
        level: 75,
        category: "UI/UX Design Engine",
        tech: ["Auto Layout", "Component Libraries", "Prototyping", "Vectors"],
        desc: "Transforming design theory blueprints into wireframe specs and high-fidelity fluid interface mockups."
    },
    {
        name: "GIT",
        icon: SiGit,
        color: "#f05032",
        level: 90,
        category: "Distributed Version Control",
        tech: ["Branching Systems", "Interactive Rebase", "Hooks", "CI/CD Actions"],
        desc: "Managing collaborative engineering workflows, resolving branch structural conflicts, and deploying Actions workflows."
    },
    {
        name: "GITHUB",
        icon: SiGithub,
        color: "#ffffff",
        level: 90,
        category: "Collaborative Code Repository",
        tech: ["Pull Requests", "Actions", "Issues", "Pages", "Projects"],
        desc: "Orchestrating complex social code review cycles, project management pipelines, and shared code architectures."
    },
    {
        name: "HTML",
        icon: SiHtml5,
        color: "#e34f26",
        level: 90,
        category: "Hypertext Schema Architect",
        tech: ["Semantic Tags", "Accessibility", "SEO", "DOM Structure"],
        desc: "Formulating deep, semantic layouts, absolute web accessibility standards, and SEO structural indexing foundations."
    },
    {
        name: "JAVA",
        icon: FaJava,
        color: "#5382a1",
        level: 85,
        category: "Object-Oriented Compilation Core",
        tech: ["OOP Patterns", "Multithreading", "Streams API", "JVM Tuning"],
        desc: "Advanced concurrent programming, object-oriented design implementation, streams workflow, and JVM efficiency."
    },
    {
        name: "JAVASCRIPT",
        icon: SiJavascript,
        color: "#f7df1e",
        level: 95,
        category: "Primary Scripting Engine",
        tech: ["ESNext", "Async/Await", "Web Workers", "Event Loop"],
        desc: "Deep programmatic grasp of prototype inheritance models, event cycles, closures, and low-level DOM rendering."
    },
    {
        name: "JENKINS",
        icon: SiJenkins,
        color: "#d24939",
        level: 70,
        category: "Continuous Delivery Pipeline",
        tech: ["CI/CD", "Declarative Pipelines", "Builds", "Plugins"],
        desc: "Automating software compilation threads, rigorous validation checks, and multi-stage deployment loops."
    },
    {
        name: "MONGODB",
        icon: SiMongodb,
        color: "#47a248",
        level: 80,
        category: "NoSQL Database Node",
        tech: ["Mongoose", "Aggregations", "Indexing", "Atlas Clusters"],
        desc: "Designing highly flexible document-based schemas, indexing queries for rapid indexing, and complex data pipeline models."
    },
    {
        name: "MYSQL",
        icon: SiMysql,
        color: "#4479a1",
        level: 85,
        category: "Relational DB Engine",
        tech: ["Queries", "Triggers", "Normalization", "Indexing Optimization"],
        desc: "Structuring highly normalized schema constraints, custom SQL queries, transactions, and indexing structures."
    },
    {
        name: "NODE.JS",
        icon: SiNodedotjs,
        color: "#339933",
        level: 85,
        category: "Server Runtime Environment",
        tech: ["Express", "Fastify", "REST", "WebSockets", "CommonJS"],
        desc: "Engineering scalable backend environments, high-throughput microservices, and asynchronous event-driven system threads."
    },
    {
        name: "POSTGRESQL",
        icon: SiPostgresql,
        color: "#4169e1",
        level: 80,
        category: "Enterprise Relational Database",
        tech: ["ACID Transactions", "JSONB", "PL/pgSQL", "Triggers", "Views"],
        desc: "Engineering sophisticated transactional database structures, JSON document indexes, and procedural triggers."
    },
    {
        name: "POSTMAN",
        icon: SiPostman,
        color: "#ff6c37",
        level: 85,
        category: "API Lifecycle Client",
        tech: ["Mock Servers", "API Testing Suites", "Environments", "Scripting"],
        desc: "Designing comprehensive evaluation workflows, testing endpoints, building mock servers, and managing API development life cycles."
    },
    {
        name: "PYTHON",
        icon: SiPython,
        color: "#ffe873",
        level: 75,
        category: "Automation & Scripting Engine",
        tech: ["Flask", "FastAPI", "Pandas", "Scikit-Learn"],
        desc: "Automating background routine pipelines, scraping data sets, and building custom analytics utility microservices."
    },
    {
        name: "REACT.JS",
        icon: SiReact,
        color: "#61dafb",
        level: 90,
        category: "Frontend Core Engine",
        tech: ["Vite", "Next.js", "Hooks", "Redux", "Framer Motion"],
        desc: "Constructing high-performance component architectures, custom hook mechanisms, and complex physics-based layout motion layers."
    },
    {
        name: "SPRING BOOT",
        icon: SiSpringboot,
        color: "#6db33f",
        level: 80,
        category: "Enterprise Java Framework",
        tech: ["Spring Security", "JPA / Hibernate", "Spring MVC", "Maven"],
        desc: "Building secure, modular, enterprise-grade backends with clean MVC controllers, dependency injection, and data mappings."
    },
    {
        name: "TAILWIND CSS",
        icon: SiTailwindcss,
        color: "#38bdf8",
        level: 90,
        category: "Declarative Style Sheet",
        tech: ["Utility-First", "JIT Engine", "Custom Themes", "Glassmorphism"],
        desc: "Design system crafting, custom design tokens, fluid responsiveness, and high-fidelity layouts across devices."
    },
    {
        name: "TYPESCRIPT",
        icon: SiTypescript,
        color: "#3178c6",
        level: 80,
        category: "Strict Compilation System",
        tech: ["Generics", "Strict Typing", "Utility Types", "Decorators"],
        desc: "Securing modern codebase integrity with advanced type systems, strict interfaces, and strong abstract paradigms."
    }
];

// Languages Data
const languages = [
    {
        name: "Telugu",
        greeting: "నమస్కారం",
        type: "TELUGU • TRADITIONAL GREETING",
        proficiency: "Native Proficiency",
        color: "#f97316",
        currentPursuit: false
    },
    {
        name: "English",
        greeting: "Hello",
        type: "ENGLISH • UNIVERSAL GREETING",
        proficiency: "Fluent Proficiency",
        color: "#3b82f6",
        currentPursuit: false
    },
    {
        name: "Hindi",
        greeting: "नमस्ते",
        type: "HINDI • RESPECTFUL GREETING",
        proficiency: "Professional Proficiency",
        color: "#22c55e",
        currentPursuit: false
    },
    {
        name: "Japanese",
        greeting: "こんにちは",
        type: "JAPANESE • POLITE GREETING",
        proficiency: "Conversational Proficiency",
        color: "#ef4444",
        currentPursuit: true
    }
];

// Premium visual square card SkillNode component with brand-colored glowing hover effects & custom tech popup tooltips
const SkillNode = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
        >
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: index * 0.01 }}
                animate={{
                    scale: isHovered ? 1.06 : 1.0,
                    borderColor: isHovered ? `${skill.color}88` : "rgba(255, 255, 255, 0.06)",
                    boxShadow: isHovered
                        ? `0 0 30px ${skill.color}25, 0 10px 30px rgba(0,0,0,0.8)`
                        : "0 8px 30px rgba(0,0,0,0.6)",
                    backgroundColor: isHovered ? "rgba(10, 10, 10, 0.75)" : "rgba(0, 0, 0, 0.45)"
                }}
                className="relative flex flex-col items-center justify-center w-[6.8rem] h-[6.8rem] sm:w-36 sm:h-36 rounded-[2rem] border backdrop-blur-md transition-colors duration-300 select-none cursor-default p-4 sm:p-5 gap-3 group"
            >
                {/* Corner Tech Accents */}
                <div className="absolute top-3.5 left-4 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-white/30 transition-colors duration-300" />
                <div className="absolute bottom-3.5 right-4 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-white/30 transition-colors duration-300" />

                {/* Brand Icon */}
                <motion.div
                    className="flex items-center justify-center flex-shrink-0"
                    animate={{
                        y: isHovered ? -4 : 0,
                        scale: isHovered ? 1.08 : 1.0
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 15 }}
                >
                    <skill.icon 
                        size={36} 
                        style={{ color: skill.color }} 
                        className="sm:size-[42px] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]" 
                    />
                </motion.div>

                {/* Skill Name */}
                <motion.span
                    className="text-[10px] sm:text-xs font-black font-sans uppercase text-center tracking-[0.05em] mt-1"
                    animate={{
                        color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                        letterSpacing: isHovered ? "0.08em" : "0.05em"
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {skill.name}
                </motion.span>
            </motion.div>
        </div>
    );
};

// Premium LanguageCard component with elegant hover-triggered tooltips and zero percentages
const LanguageCard = ({ lang, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full"
        >
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                animate={{
                    borderColor: isHovered ? `${lang.color}50` : "rgba(255, 255, 255, 0.05)",
                    backgroundColor: isHovered ? "rgba(255, 255, 255, 0.02)" : "rgba(10, 10, 10, 0.75)",
                    boxShadow: isHovered
                        ? `0 0 35px ${lang.color}20, 0 25px 50px rgba(0,0,0,0.85)`
                        : "0 25px 50px rgba(0,0,0,0.85)"
                }}
                className="backdrop-blur-xl border rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center relative group overflow-hidden min-h-[260px] transition-colors duration-300 gap-4"
            >
                {/* Accent Glow */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at center, ${lang.color}0c, transparent 65%)`
                    }}
                />

                {/* Subtly animated geometric corner details */}
                <div className="absolute top-4 left-5 w-1.5 h-1.5 border-t border-l border-white/5 group-hover:border-white/20 transition-colors duration-300" />
                <div className="absolute bottom-4 right-5 w-1.5 h-1.5 border-b border-r border-white/5 group-hover:border-white/20 transition-colors duration-300" />

                {/* Top Section: Language Moniker */}
                <div className="z-10 flex flex-col items-center gap-1">
                    <p 
                        className="text-[9.5px] font-mono uppercase tracking-[0.3em] transition-colors duration-300"
                        style={{ color: isHovered ? lang.color : "rgba(255, 255, 255, 0.3)" }}
                    >
                        {lang.name}
                    </p>
                    {/* Tiny neon dot divider */}
                    <div 
                        className="w-1 h-1 rounded-full transition-all duration-300 scale-50 group-hover:scale-100" 
                        style={{ backgroundColor: lang.color }}
                    />
                </div>

                {/* Middle Section: Big Native Greeting */}
                <div className="z-10 py-1">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                        {lang.greeting}
                    </h3>
                </div>

                {/* Bottom Section: Futuristic Pill Badge */}
                <div className="z-10 mt-2">
                    {lang.currentPursuit ? (
                        <div 
                            className="px-3 py-1 rounded-full border text-[7.5px] font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,179,8,0.05)]"
                            style={{ 
                                borderColor: "rgba(234, 179, 8, 0.25)", 
                                color: "#eab308", 
                                backgroundColor: "rgba(234, 179, 8, 0.03)"
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                            CURRENT PURSUIT
                        </div>
                    ) : (
                        <div 
                            className="px-3 py-1 rounded-full border text-[7.5px] font-mono uppercase tracking-[0.2em]"
                            style={{ 
                                borderColor: `${lang.color}15`, 
                                color: "rgba(255,255,255,0.25)"
                            }}
                        >
                            ACTIVE LANGUAGE
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const ExperiencePage = () => {
    // Prevent horizontal overflow while keeping standard vertical scroll function
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
        <div className="w-full relative z-10 pt-32 pb-48 px-4 sm:px-6 md:px-12 lg:px-14 xl:px-16 bg-transparent max-w-[96rem] xl:max-w-[100rem] 2xl:max-w-[104rem] mx-auto overflow-hidden">

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-20 w-full"
            >
                {/* 1. TOP SECTION: Technical Skills (Spanning full width) */}
                <div
                    className="w-full text-left p-8 sm:p-12 md:p-16 rounded-[2.5rem] relative overflow-hidden"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.035) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                        backgroundColor: 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid rgba(255, 255, 255, 0.03)'
                    }}
                >
                    {/* Header bar aligned with structural design */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 w-full z-10 relative">
                        <div className="text-3xl md:text-4xl font-black tracking-tight uppercase text-white leading-none">
                            Skills
                        </div>
                    </div>

                    {/* Gorgeous Centered Flex Square Cards Layout for Skills */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-5 max-w-5xl mx-auto py-2 z-10 relative">
                        {skills.map((skill, index) => (
                            <SkillNode
                                key={skill.name}
                                skill={skill}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* 2. SECOND SECTION: Cloud Certifications */}
                <div className="w-full text-left">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-ping" />
                            <span className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white">Cloud Certifications</span>
                        </div>
                    </div>

                    {/* AWS ML Certification Card */}
                    <motion.div
                        variants={rightCardVariants}
                        className="w-full bg-[#0a0a0a]/75 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors duration-500 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
                    >
                        {/* Decorative background grid pattern */}
                        <div
                            className="absolute right-0 top-0 w-52 h-52 opacity-[0.02] pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '14px 14px'
                            }}
                        />

                        {/* Tag Capsule */}
                        <div className="flex flex-col min-w-[120px] flex-shrink-0 z-10">
                            <span className="text-white/20 font-mono text-[9px] uppercase tracking-widest pl-1">
                                Verified // 2025
                            </span>
                        </div>

                        <div className="space-y-2 flex-grow z-10">
                            <h3 className="text-2xl sm:text-3xl font-black leading-none tracking-tight uppercase text-white group-hover:text-purple-400 transition-colors duration-300">
                                AWS ML
                            </h3>
                            <h4 className="text-sm sm:text-base font-bold font-sans text-white/95">
                                Machine Learning Specialty
                            </h4>
                            <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-sans font-light mt-2">
                                Validates specialized capabilities in designing, implementing, and deploying cloud-native machine learning pipelines and artificial intelligence frameworks using AWS infrastructures. Focuses on robust model training, hyperparameter optimization, and scalable production deployment on AWS ecosystem tools.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* 3. THIRD SECTION: Professional Internships */}
                <div className="w-full text-left">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-ping" />
                            <span className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white">Professional Internships</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                        {/* Internship 1: HIGHQLABS */}
                        <motion.div
                            variants={leftCardVariants}
                            className="w-full bg-[#0a0a0a]/75 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors duration-500 flex flex-col gap-4"
                        >
                            {/* Decorative background grid pattern */}
                            <div
                                className="absolute right-0 top-0 w-52 h-52 opacity-[0.02] pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                    backgroundSize: '14px 14px'
                                }}
                            />

                            <div className="flex justify-end w-full mb-1 flex-shrink-0 z-10">
                                <span className="text-white/25 font-mono text-[9px] uppercase tracking-widest">
                                    2024 - 2025
                                </span>
                            </div>

                            <div className="space-y-1.5 z-10">
                                <h3 className="text-2xl sm:text-3xl font-black leading-none tracking-tight uppercase text-white group-hover:text-emerald-400 transition-colors duration-300">
                                    HIGHQLABS
                                </h3>
                                <h4 className="text-sm sm:text-base font-bold font-sans text-white/95">
                                    Java Full Stack Developer (Diploma Framework)
                                </h4>
                            </div>

                            <div className="space-y-3 z-10 text-white/60 text-xs sm:text-sm leading-relaxed font-sans font-light">
                                <p>
                                    Engineered scalable full stack systems under the diploma framework, connecting advanced React frontends with high-throughput Node.js backends.
                                </p>
                                <p>
                                    Focused on optimizing state synchronizations, database normalization, and designing clean RESTful microservice architectures.
                                </p>
                            </div>
                        </motion.div>

                        {/* Internship 2: GOOGLE & EDUSKILLS */}
                        <motion.div
                            variants={leftCardVariants}
                            className="w-full bg-[#0a0a0a]/75 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors duration-500 flex flex-col gap-4"
                        >
                            {/* Decorative background grid pattern */}
                            <div
                                className="absolute right-0 top-0 w-52 h-52 opacity-[0.02] pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                    backgroundSize: '14px 14px'
                                }}
                            />

                            <div className="flex justify-end w-full mb-1 flex-shrink-0 z-10">
                                <span className="text-white/25 font-mono text-[9px] uppercase tracking-widest">
                                    2025 –  2025
                                </span>
                            </div>

                            <div className="space-y-1.5 z-10">
                                <h3 className="text-2xl sm:text-3xl font-black leading-none tracking-tight uppercase text-white group-hover:text-emerald-400 transition-colors duration-300">
                                    Google & EduSkills
                                </h3>
                                <h4 className="text-sm sm:text-base font-bold font-sans text-white/95">
                                    Android Developer Virtual Internship (BTech FrameWork)
                                </h4>
                            </div>

                            <div className="space-y-3 z-10 text-white/60 text-xs sm:text-sm leading-relaxed font-sans font-light">
                                <p>
                                    Successfully completed a 10-week Android Developer Virtual Internship organized by EduSkills in collaboration with AICTE and supported by Google for Developers under the India Edu Program.
                                </p>
                                <p>
                                    Gained practical knowledge and hands-on experience in Android application development, including designing user-friendly interfaces, implementing application logic, and working with modern Android development tools and technologies.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 4. FOURTH SECTION: Languages */}
                <div className="w-full text-left">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-ping" />
                            <span className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white">Languages</span>
                        </div>
                    </div>

                    {/* Symmetrical 4-Column Languages Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-6">
                        {languages.map((lang, index) => (
                            <LanguageCard
                                key={lang.name}
                                lang={lang}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default ExperiencePage;
