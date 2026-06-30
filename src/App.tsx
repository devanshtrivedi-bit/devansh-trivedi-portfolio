import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Shield, Volume2, VolumeX, Home, Mail, FileCode, Layers, Menu, ChevronRight, GraduationCap, Settings, User, Camera, Move } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplineScene } from './components/ui/splite';
import SkillsHud from './components/SkillsHud';
import ProjectsDatabase from './components/ProjectsDatabase';
import CredentialsHud from './components/CredentialsHud';
import ContactLink from './components/ContactLink';
import SettingsPanel from './components/SettingsPanel';
import IntroSequence from './components/IntroSequence';

// Glassmorphic background floating bubbles for the main dashboard screen
const mainBgBubbles = [
  { size: 280, left: '2%', top: '10%', delay: 0, duration: 32 },
  { size: 160, left: '85%', top: '5%', delay: 3, duration: 25 },
  { size: 320, left: '65%', top: '50%', delay: 1.5, duration: 40 },
  { size: 200, left: '12%', top: '70%', delay: 5, duration: 28 },
  { size: 130, left: '45%', top: '35%', delay: 2, duration: 35 },
  { size: 100, left: '78%', top: '75%', delay: 4, duration: 22 },
];

// Glassmorphic horizontal wind currents/wave lines
const windCurrents = [
  { top: '18%', height: '2px', width: '320px', duration: 16, delay: 0 },
  { top: '32%', height: '1px', width: '450px', duration: 22, delay: 3 },
  { top: '48%', height: '3px', width: '220px', duration: 14, delay: 5 },
  { top: '65%', height: '1px', width: '380px', duration: 25, delay: 1 },
  { top: '80%', height: '2px', width: '400px', duration: 18, delay: 4 },
  { top: '90%', height: '1px', width: '280px', duration: 20, delay: 7 },
];

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profilePicError, setProfilePicError] = useState(false);
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem('profilePic') || '/profile.jpg';
  });
  const [profilePicZoom, setProfilePicZoom] = useState(() => {
    return Number(localStorage.getItem('profilePicZoom')) || 1;
  });
  const [profilePicOffset, setProfilePicOffset] = useState(() => {
    const saved = localStorage.getItem('profilePicOffset');
    return saved ? JSON.parse(saved) : { x: 0, y: 0 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isAdjustMode, setIsAdjustMode] = useState(false);
  const [frameHovered, setFrameHovered] = useState(false);
  
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setProfilePic(base64Data);
        localStorage.setItem('profilePic', base64Data);
        setProfilePicError(false);
        // Reset offsets & zoom on new upload
        setProfilePicOffset({ x: 0, y: 0 });
        localStorage.setItem('profilePicOffset', JSON.stringify({ x: 0, y: 0 }));
        setProfilePicZoom(1);
        localStorage.setItem('profilePicZoom', '1');
        // Enter adjust mode immediately
        setIsAdjustMode(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    if (profilePicError || !isAdjustMode) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isAdjustMode) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setProfilePicOffset((prev) => {
      const next = { x: prev.x + dx, y: prev.y + dy };
      return next;
    });
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      localStorage.setItem('profilePicOffset', JSON.stringify(profilePicOffset));
    }
  };

  // Background music control
  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.play().catch(err => console.log("Audio play blocked", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundEnabled]);

  // Section refs for scrolling
  const sectionRefs = {
    home: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    credentials: useRef(null),
    contact: useRef(null),
  };

  // Sound effect
  const playSelectSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  // Scroll observer
  useEffect(() => {
    const options = {
      root: document.querySelector('.hud-content'),
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (sectionId) => {
    playSelectSound();
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = sectionRefs[sectionId].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/ambient-bg.mp3" loop />
      {!introComplete && (
        <IntroSequence 
          onComplete={() => setIntroComplete(true)} 
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />
      )}

      <div
        className="app-container"
        style={{
          opacity: introComplete ? 1 : 0,
          transform: introComplete ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(30px)',
          filter: introComplete ? 'blur(0px)' : 'blur(20px)',
          transition: 'all 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        {/* 3D Spline Scene Background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
            className="w-full h-full object-cover opacity-40" 
          />
        </div>
        {/* Dark vignette overlay for better text contrast */}
        <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(5,5,15,0.9) 100%)', zIndex: -1, pointerEvents: 'none' }} />
        <div className="ambient-glow" />

        {/* Main Screen Floating Glass Bubbles */}
        {mainBgBubbles.map((bubble, idx) => (
          <motion.div
            key={`main-bg-b-${idx}`}
            animate={{
              y: [0, -40, 20, 0],
              x: [0, 30, -20, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "linear",
              delay: bubble.delay
            }}
            style={{
              position: 'fixed',
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              top: bubble.top,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.012)',
              border: '1px solid rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(6px)',
              boxShadow: 'inset 0 4px 12px rgba(255, 255, 255, 0.05), 0 15px 35px rgba(0,0,0,0.15)',
              zIndex: 0, // In front of 3D scene but behind sidebars/content (which have z-index: 1+)
              pointerEvents: 'none'
            }}
          />
        ))}

        {/* Main Screen Glassmorphic Wind Currents (Wave lines gliding horizontally) */}
        {windCurrents.map((current, idx) => (
          <motion.div
            key={`wind-${idx}`}
            initial={{ left: '-500px' }}
            animate={{
              left: '100vw',
              y: [0, 15, -15, 0] // Wave-like vertical sway
            }}
            transition={{
              duration: current.duration,
              repeat: Infinity,
              ease: "linear",
              delay: current.delay
            }}
            style={{
              position: 'fixed',
              top: current.top,
              width: current.width,
              height: current.height,
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
              boxShadow: '0 0 12px rgba(255,255,255,0.03)',
              backdropFilter: 'blur(3px)',
              zIndex: 0, // Behind main card content, in front of 3D scene
              pointerEvents: 'none'
            }}
          />
        ))}

        {/* SIDEBAR NAVIGATION */}
        <aside className="hud-sidebar glass-panel animate-float" style={{ animationDelay: '0.5s', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ padding: '30px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {!profilePicError ? (
                <img 
                  src={profilePic} 
                  onError={() => setProfilePicError(true)} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  alt="Profile"
                />
              ) : (
                <User size={24} color="#fff" />
              )}
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '500', color: '#fff', letterSpacing: '0.5px' }}>Devansh Trivedi</h1>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>Developer Profile</span>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', flexGrow: 1 }}>
            <button onClick={() => handleNavClick('home')} className={`game-button ${activeSection === 'home' ? 'active' : ''}`} style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }}>
              <Home size={18} /> Overview
            </button>
            <button onClick={() => handleNavClick('skills')} className={`game-button ${activeSection === 'skills' ? 'active' : ''}`} style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }}>
              <Layers size={18} /> Skills
            </button>
            <button onClick={() => handleNavClick('projects')} className={`game-button ${activeSection === 'projects' ? 'active' : ''}`} style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }}>
              <FileCode size={18} /> Portfolio
            </button>
            <button onClick={() => handleNavClick('credentials')} className={`game-button ${activeSection === 'credentials' ? 'active' : ''}`} style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }}>
              <GraduationCap size={18} /> Credentials
            </button>
            <button onClick={() => handleNavClick('contact')} className={`game-button ${activeSection === 'contact' ? 'active' : ''}`} style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }}>
              <Mail size={18} /> Contact
            </button>
          </nav>

          <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '10px' }}>
            <button onClick={() => { playSelectSound(); setSoundEnabled(!soundEnabled); }} className="game-button" style={{ flex: 1, padding: '10px', borderRadius: '50px' }}>
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button onClick={() => { playSelectSound(); setSettingsOpen(!settingsOpen); }} className="game-button" style={{ flex: 1, padding: '10px', borderRadius: '50px' }}>
              <Settings size={16} />
            </button>
          </div>
        </aside>

        {/* CONTENT PANEL */}
        <main className="hud-content">
          
          <section id="home" ref={sectionRefs.home} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: '40px', flexWrap: 'wrap' }}>
            
            {/* Left Content */}
            <div className="glass-panel animate-float" style={{ padding: '60px', flex: '1 1 500px', maxWidth: '750px', position: 'relative', overflow: 'hidden' }}>
              
              {/* Decorative Soft Elements */}
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.3, filter: 'blur(40px)', background: 'var(--accent-purple)', width: '200px', height: '200px', borderRadius: '50%', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', opacity: 0.3, filter: 'blur(40px)', background: 'var(--accent-blue)', width: '200px', height: '200px', borderRadius: '50%', pointerEvents: 'none' }} />

              <div className="glass-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '500' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)', boxShadow: '0 0 10px var(--accent-blue)', animation: 'pulse 2s infinite' }} />
                ONLINE & READY
              </div>

              <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', margin: '0 0 20px 0', lineHeight: '1.1', fontWeight: '300', letterSpacing: '-1px' }}>
                AI & Robotics <br/> <span style={{ fontWeight: '600', background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Developer</span>
              </h2>

              <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontWeight: '300' }}>
                Bridging physical hardware with cognitive intelligence. Specialize in <strong style={{color: '#fff', fontWeight: 500}}>Python, Machine Learning, IoT</strong>, and elegant, real-time automation solutions.
              </p>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <button onClick={() => handleNavClick('projects')} className="glass-panel" style={{ padding: '16px 36px', fontSize: '0.9rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderRadius: '50px' }}>
                  <FileCode size={18} /> View Portfolio
                </button>
                <button onClick={() => handleNavClick('contact')} className="glass-panel" style={{ padding: '16px 36px', fontSize: '0.9rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderRadius: '50px', background: 'rgba(255,255,255,0.1)' }}>
                  <Mail size={18} /> Contact Me
                </button>
              </div>
            </div>

            {/* Right Image Block Placeholder */}
            {/* Right Image Block - Premium Glass Profile Card */}
            <div className="glass-panel animate-float-delayed" style={{ padding: '24px', flex: '0 0 400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', borderRadius: '35px', position: 'relative', overflow: 'hidden' }}>
              
              {/* Pulse Backlight behind the picture for rich depth */}
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '320px',
                height: '320px',
                background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, rgba(59, 130, 246, 0.12) 50%, rgba(0,0,0,0) 70%)',
                filter: 'blur(40px)',
                zIndex: 0,
                pointerEvents: 'none'
              }} />

              {/* Picture Frame with Change Photo overlay */}
              <div 
                onMouseEnter={() => setFrameHovered(true)}
                onMouseLeave={() => setFrameHovered(false)}
                style={{
                  width: '350px', height: '470px', borderRadius: '24px', overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                  position: 'relative',
                  background: 'rgba(255, 255, 255, 0.02)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  zIndex: 2,
                  cursor: isAdjustMode ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoUpload} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />

                {!profilePicError ? (
                  <>
                    <img 
                      src={profilePic} 
                      alt="Devansh Trivedi" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        position: 'relative', 
                        zIndex: 5,
                        transform: `scale(${profilePicZoom}) translate(${profilePicOffset.x / profilePicZoom}px, ${profilePicOffset.y / profilePicZoom}px)`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease',
                        pointerEvents: 'none'
                      }}
                      onError={() => setProfilePicError(true)}
                    />
                    
                    {/* Header Controls - Camera & Move (Only visible on hover outside adjust mode) */}
                    {!isAdjustMode && (
                      <div style={{ display: 'flex', gap: '8px', position: 'absolute', top: '15px', left: '15px', zIndex: 10 }}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (fileInputRef.current) fileInputRef.current.click();
                          }}
                          style={{
                            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
                            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', opacity: frameHovered ? 1 : 0, transition: 'all 0.3s ease',
                            color: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                          }}
                          title="Upload New Photo"
                        >
                          <Camera size={14} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAdjustMode(true);
                          }}
                          style={{
                            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
                            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', opacity: frameHovered ? 1 : 0, transition: 'all 0.3s ease',
                            color: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                          }}
                          title="Reposition Photo"
                        >
                          <Move size={14} />
                        </button>
                      </div>
                    )}

                    {/* Floating Zoom Control Panel */}
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute', bottom: '15px', left: '15px', right: '15px', zIndex: 12,
                        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.15)', borderRadius: '18px',
                        padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: '8px',
                        opacity: isAdjustMode ? 1 : 0, 
                        pointerEvents: isAdjustMode ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>
                        <span>ZOOM CONTROL</span>
                        <span>{Math.round(profilePicZoom * 100)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="3" 
                        step="0.05" 
                        value={profilePicZoom} 
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setProfilePicZoom(val);
                          localStorage.setItem('profilePicZoom', val.toString());
                        }}
                        style={{
                          width: '100%',
                          accentColor: 'var(--accent-purple)',
                          cursor: 'pointer',
                          background: 'rgba(255,255,255,0.2)',
                          height: '4px',
                          borderRadius: '2px',
                          outline: 'none'
                        }}
                      />
                      {isAdjustMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAdjustMode(false);
                          }}
                          className="game-button"
                          style={{
                            marginTop: '4px',
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            background: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            borderRadius: '50px',
                            color: '#fff',
                            width: '100%',
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          DONE
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    style={{ 
                      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', 
                      justifyContent: 'center', alignItems: 'center', color: 'rgba(255,255,255,0.5)', 
                      cursor: 'pointer', background: 'rgba(255,255,255,0.01)', zIndex: 6, gap: '10px' 
                    }}
                  >
                    <User size={48} style={{ opacity: 0.5 }} />
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Click to Upload Photo</span>
                  </div>
                )}

                {/* Floating Tech Pill Indicator */}
                <div style={{
                  position: 'absolute', top: '15px', right: '15px', zIndex: 10,
                  background: isAdjustMode ? 'rgba(147, 51, 234, 0.4)' : 'rgba(0,0,0,0.4)', 
                  backdropFilter: 'blur(10px)',
                  border: isAdjustMode ? '1px solid rgba(147, 51, 234, 0.6)' : '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '50px',
                  padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.65rem', color: '#fff', fontWeight: '500', letterSpacing: '0.5px',
                  transition: 'all 0.3s ease'
                }}>
                  <span style={{ 
                    width: '6px', height: '6px', borderRadius: '50%', 
                    background: isAdjustMode ? 'var(--accent-purple)' : '#10b981', 
                    boxShadow: isAdjustMode ? '0 0 8px var(--accent-purple)' : '0 0 8px #10b981', 
                    display: 'inline-block' 
                  }}></span>
                  {isAdjustMode ? 'CROP MODE' : 'ONLINE'}
                </div>
              </div>

              {/* Profile Details Tag */}
              <div style={{ textAlign: 'center', width: '100%', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '22px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: '400', color: '#fff', letterSpacing: '1px' }}>Devansh Trivedi</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>AI & Robotics Developer</div>
                
                {/* Node Status Indicators */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>
                    COGNITIVE: OK
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>
                    HW_LINK: SECURE
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" ref={sectionRefs.skills} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <SkillsHud />
          </section>

          <section id="projects" ref={sectionRefs.projects} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ProjectsDatabase />
          </section>

          <section id="credentials" ref={sectionRefs.credentials} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CredentialsHud />
          </section>

          <section id="contact" ref={sectionRefs.contact} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ContactLink />
          </section>

        </main>
      </div>
    </>
  );
}

export default App;
