import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CyberBackground from './components/CyberBackground';
import AboutPage from './components/AboutPage';
import WorkPage from './components/WorkPage';
import ExperiencePage from './components/ExperiencePage';
import MiniToy from './components/MiniToy';
import CubeToy from './components/CubeToy';
import ExperienceBackground from './components/ExperienceBackground';
import ContactPage from './components/ContactPage';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [isBlasted, setIsBlasted] = useState(false);
  const [viewMode, setViewMode] = useState('menu'); // 'menu' | 'about' | 'work' | 'experience'

  // Lock scrolling on the loading preloader and main menu selector page
  useEffect(() => {
    let handleResize = null;

    if (!isBlasted || viewMode === 'menu') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else if (viewMode === 'contact') {
      handleResize = () => {
        if (window.innerWidth >= 1024) {
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
          document.documentElement.style.overflow = 'unset';
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    
    return () => {
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isLoaded, viewMode, isBlasted]);

  return (
    <>
      {/* 1. Global WebGL 3D Background */}
      <CyberBackground viewMode={viewMode} isBlasted={isBlasted} />

      {/* 1b. Dedicated Canvas Background for Experience Section */}
      {viewMode === 'experience' && isBlasted && <ExperienceBackground />}

      {/* 2. Preloader Hold-to-Blast Loading Screen */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <LoadingScreen 
            key="loader" 
            skipIntro={hasLoadedOnce} 
            onBlast={(mode) => {
              setIsBlasted(true);
              if (mode) setViewMode(mode);
            }} 
            onComplete={(mode) => { 
              setIsLoaded(true); 
              setHasLoadedOnce(true); 
              if (mode) setViewMode(mode);
            }} 
          />
        )}
      </AnimatePresence>

      {/* 3. Global Persistent SPA Header Navigation */}
      {isBlasted && (
        <header className="fixed top-0 left-0 w-full z-[100001] px-6 py-6 flex justify-between items-center pointer-events-auto select-none">
          {/* Logo / MiniToy reset or return to selection */}
          <div 
            className="flex items-center cursor-pointer mix-blend-difference text-white"
            onClick={() => {
              if (viewMode === 'menu') {
                setIsLoaded(false);
                setIsBlasted(false);
                setViewMode('menu');
              } else {
                setViewMode('menu');
              }
            }}
          >
            <CubeToy viewMode={viewMode} />
          </div>

          {/* Cyber Contact Button on the Top Right Outermost Edge */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(viewMode === 'contact' ? 'menu' : 'contact')}
            className={`font-mono text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${
              viewMode === 'contact'
                ? 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                : 'bg-black/40 text-white/80 border-white/10 hover:border-white/40 hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]'
            }`}
          >
            {viewMode === 'contact' ? 'Close // Menu' : 'Contact'}
          </motion.button>
        </header>
      )}

      {/* 4. SPA Main Content Container */}
      <div className={`min-h-screen relative bg-transparent selection:bg-white/20 selection:text-white transition-opacity duration-700 ${isBlasted ? "opacity-100" : "opacity-0"}`}>
        <div className="relative z-10 w-full min-h-screen">
          <main className="w-full h-full">
            <AnimatePresence mode="wait">
              {/* Main Selection Menu Page (Loaded directly after hold-to-blast) */}
              {viewMode === 'menu' && (
                <motion.div 
                  key="menu-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full min-h-screen flex items-center justify-center pt-20"
                >
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 lg:gap-20 w-full max-w-[95vw] px-4 pointer-events-auto">
                    {[
                      { label: 'About', value: 'about' },
                      { label: 'Work', value: 'work' },
                      { label: 'Stack', value: 'experience' },
                    ].map((link, index) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            opacity: { delay: 0.15, duration: 0.8 },
                            scale: { delay: 0.15, duration: 0.8 }
                        }}
                        className="relative group cursor-pointer select-none flex justify-center hover:scale-[1.04] transition-all duration-500 whitespace-nowrap"
                        onClick={() => setViewMode(link.value)}
                      >
                        <span 
                          className="text-5xl sm:text-7xl md:text-[5vw] lg:text-[5.5vw] xl:text-[6vw] 2xl:text-[96px] font-black uppercase text-transparent tracking-[0.12em] [-webkit-text-stroke:2.1px_rgba(255,255,255,0.16)] group-hover:text-white group-hover:[-webkit-text-stroke:2.1px_transparent] transition-all duration-500 group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.65)] whitespace-nowrap"
                          style={{ fontFamily: "'Syncopate', 'Syne', sans-serif" }}
                        >
                          {link.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Dedicated Subpages */}
              {viewMode === 'about' && (
                <motion.div 
                  key="about-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <AboutPage />
                </motion.div>
              )}
              {viewMode === 'work' && (
                <motion.div 
                  key="work-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <WorkPage />
                </motion.div>
              )}
              {viewMode === 'experience' && (
                <motion.div 
                  key="experience-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <ExperiencePage />
                </motion.div>
              )}
              {viewMode === 'contact' && (
                <motion.div 
                  key="contact-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <ContactPage />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Permanent cinematic footer */}
            <footer className={`${viewMode === 'menu' ? 'fixed bottom-8' : (viewMode === 'contact' ? 'relative py-16 lg:fixed lg:bottom-8 lg:py-0' : 'py-16 relative')} w-full text-center text-white/25 text-xs font-mono uppercase tracking-[0.3em] select-none pointer-events-none`}>
              <p>Nanda Siva Srinivas Galla</p>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
