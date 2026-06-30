import React, { useEffect, useState } from 'react';
import { Cpu, Shield, Zap, Globe, Activity, Brain, MessageSquare, Users, Database, Terminal, Settings } from 'lucide-react';

// Custom Tech Logo SVG Components
const PythonLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9 2C8.75 2 6 3.1 6 6.3V8.5H8.5V7.4c0-1.8 1-2.9 2.9-2.9h2.2c1.9 0 2.9 1.1 2.9 2.9v1.6H11.5c-2.5 0-4.5 2-4.5 4.5v1.6c0 2.5 2 4.5 4.5 4.5h2.2c2.5 0 4.5-2 4.5-4.5v-2.2c0-3.2-2.7-4.3-5.9-4.3H15V7.5C15 4.3 15.05 2 11.9 2z" fill="#306998"/>
    <path d="M12.1 22c3.15 0 5.9-1.1 5.9-4.3V15.5H15.5v1.1c0 1.8-1 2.9-2.9 2.9H10.4c-1.9 0-2.9-1.1-2.9-2.9v-1.6H12.5c2.5 0 4.5-2 4.5-4.5V8.9c0-2.5-2-4.5-4.5-4.5H10.3c-2.5 0-4.5 2-4.5 4.5v2.2c0 3.2 2.7 4.3 5.9 4.3H9V16.5c0 3.2-.05 5.5 3.1 5.5z" fill="#FFD43B"/>
  </svg>
);

const RLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="9" ry="7" fill="#1F65B7" opacity="0.15" stroke="#1F65B7" strokeWidth="1" />
    <text x="12" y="16" fill="#1F65B7" fontSize="13" fontFamily="Arial" fontWeight="bold" textAnchor="middle">R</text>
  </svg>
);

const ReactLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(150 12 12)" />
    <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
  </svg>
);

const TailwindLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6.09c-1.74-3.11-4.78-4.59-8.25-3.34-3.48 1.25-4.78 4.79-3.04 7.9 1.74 3.11 4.78 4.59 8.25 3.34 3.48-1.25 4.78-4.79 3.04-7.9z" fill="#38BDF8"/>
    <path d="M20.25 11.25c-1.74-3.11-4.78-4.59-8.25-3.34-3.48 1.25-4.78 4.79-3.04 7.9 1.74 3.11 4.78 4.59 8.25 3.34 3.48-1.25 4.78-4.79 3.04-7.9z" fill="#38BDF8" opacity="0.8"/>
  </svg>
);

const FirebaseLogo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.88 17.51L5.9 4.67c.07-.46.52-.73.9-.53l3.05 1.63 4.2-4.2c.28-.28.74-.21.93.14l3.15 5.86 1.95 3.63 1.95 3.63c.2.37.03.83-.36.98l-7.73 3.02a1.002 1.002 0 01-.76 0L3.88 17.51z" fill="#FFC400"/>
    <path d="M3.88 17.51L5.9 4.67c.07-.46.52-.73.9-.53l3.05 1.63L13.1 19.5l-9.22-1.99z" fill="#F57C00"/>
    <path d="M12.01 19.57l7.73-3.02c.39-.15.56-.61.36-.98L13.1 10.3l-1.09 9.27z" fill="#DD2C00"/>
  </svg>
);

const PyTorchLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 6.5 4.5 10.5 4.5 14.5c0 4.14 3.36 7.5 7.5 7.5s7.5-3.36 7.5-7.5c0-4-3.5-8-7.5-12.5z" fill="#EE4C2C"/>
    <path d="M12 18.5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="#FFF"/>
    <circle cx="12" cy="14.5" r="2" fill="#EE4C2C"/>
  </svg>
);

const OpenCVLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="4.2" stroke="#FF2D55" strokeWidth="2.5" fill="none" />
    <circle cx="7" cy="15" r="4.2" stroke="#4CD964" strokeWidth="2.5" fill="none" />
    <circle cx="17" cy="15" r="4.2" stroke="#007AFF" strokeWidth="2.5" fill="none" />
  </svg>
);

const ArduinoLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 7C5.46 7 3 9.24 3 12s2.46 5 5.5 5c2.12 0 3.96-1.09 4.9-2.73.94 1.64 2.78 2.73 4.9 2.73 3.04 0 5.5-2.24 5.5-5s-2.46-5-5.5-5c-2.12 0-3.96 1.09-4.9 2.73C12.46 8.09 10.62 7 8.5 7zm0 2c1.93 0 3.5 1.34 3.5 3s-1.57 3-3.5 3-3.5-1.34-3.5-3 1.57-3 3.5-3zm7 0c1.93 0 3.5 1.34 3.5 3s-1.57 3-3.5 3-3.5-1.34-3.5-3 1.57-3 3.5-3z" fill="#00979D"/>
    <path d="M7 12h3M14 12h3M15.5 10.5v3" stroke="#FFF" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const ESP8266Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="#222" stroke="#FFD43B" strokeWidth="1.5" />
    <rect x="7" y="7" width="10" height="10" fill="#333" stroke="#FFF" strokeWidth="1" />
    <line x1="2.5" y1="7" x2="4" y2="7" stroke="#FFD43B" strokeWidth="1.5" />
    <line x1="2.5" y1="12" x2="4" y2="12" stroke="#FFD43B" strokeWidth="1.5" />
    <line x1="2.5" y1="17" x2="4" y2="17" stroke="#FFD43B" strokeWidth="1.5" />
    <line x1="20" y1="7" x2="21.5" y2="7" stroke="#FFD43B" strokeWidth="1.5" />
    <line x1="20" y1="12" x2="21.5" y2="12" stroke="#FFD43B" strokeWidth="1.5" />
    <line x1="20" y1="17" x2="21.5" y2="17" stroke="#FFD43B" strokeWidth="1.5" />
    <path d="M12 9v1M9.5 7.5a3.5 3.5 0 015 0M7 5a7 7 0 0110 0" stroke="#00FF66" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const TransformersLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FFF275" />
    <circle cx="8" cy="10" r="1.5" fill="#222" />
    <circle cx="16" cy="10" r="1.5" fill="#222" />
    <path d="M12 18c1.5 0 2.8-.8 3.5-2H8.5c.7 1.2 2 2 3.5 2z" fill="#222" />
    <path d="M7 6l2 2M17 6l-2 2" stroke="#FF7E6B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PandasLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="13" r="8" fill="#FFFFFF" stroke="#15045C" strokeWidth="1.5" />
    <circle cx="6" cy="7" r="3" fill="#15045C" />
    <circle cx="18" cy="7" r="3" fill="#15045C" />
    <circle cx="9" cy="12" r="2.5" fill="#15045C" />
    <circle cx="15" cy="12" r="2.5" fill="#15045C" />
    <circle cx="9.5" cy="11.5" r="0.75" fill="#FFFFFF" />
    <circle cx="14.5" cy="11.5" r="0.75" fill="#FFFFFF" />
    <ellipse cx="12" cy="15" rx="1.5" ry="1" fill="#15045C" />
  </svg>
);

const LeafletLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#78B13F" />
  </svg>
);

const GradioLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="none" stroke="#FF5A00" strokeWidth="2" />
    <path d="M12 6.5a5.5 5.5 0 00-5.5 5.5h11a5.5 5.5 0 00-5.5-5.5z" fill="#FF5A00" />
  </svg>
);

const VSCodeLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 2.5l-13 11-4-3v3l4 3 13 11 3-2.5v-21l-3-2.5z" fill="#007ACC" />
    <path d="M16.5 6.5l-7 5.5 7 5.5V6.5z" fill="#1F9CF0" />
  </svg>
);

const ColabLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8.5" cy="12" rx="4.5" ry="3" fill="#F9AB00" opacity="0.8" />
    <ellipse cx="15.5" cy="12" rx="4.5" ry="3" fill="#E8710A" opacity="0.8" />
    <circle cx="12" cy="12" r="1.5" fill="#FFF" />
  </svg>
);

const GitLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5 7a2.5 2.5 0 10-3 2.45v5.1a2.5 2.5 0 101.5 0V9.45A2.5 2.5 0 0018.5 7zm-3.5 0a1 1 0 111 1 1 1 0 01-1-1zm1 10a1 1 0 11-1-1 1 1 0 011 1z" fill="#F05032" />
    <path d="M17 14.5v-5" stroke="#F05032" strokeWidth="1.5"/>
    <path d="M17 12c-2 0-3-.5-4-1.5S11 8 9 8" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="8" r="1.5" fill="#F05032" />
  </svg>
);

const OpenAILogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a4 4 0 00-4 4 4 4 0 00.5 1.9L6.6 6.6a4 4 0 00-5.6 5.6l2 1.1A4 4 0 002.5 15a4 4 0 004 4 4 4 0 001.9-.5l1.1 2a4 4 0 005.6-5.6l-2-1.1c.5-.3.9-.7 1.4-.7a4 4 0 004-4 4 4 0 00-.5-1.9l1.9 1.3a4 4 0 005.6-5.6l-2-1.1a4 4 0 00.5-1.9a4 4 0 00-4-4z" fill="#10A37F" />
  </svg>
);

const AntigravityLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l9 7v8l-9 5-9-5V9l9-7z" fill="none" stroke="#FF0055" strokeWidth="1.5" />
    <path d="M12 6l5 4v6l-5 3-5-3v-6l5-4z" fill="none" stroke="#00FF66" strokeWidth="1" />
    <circle cx="12" cy="12" r="3" fill="#FF0055" />
  </svg>
);

// Individual Interactive Skill Card Component
const SkillNodeCard = ({ skill, animate, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const radius = 20;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(skill);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-panel "
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '12px 15px',
        cursor: 'help',
        background: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
        borderColor: isHovered ? skill.color : 'rgba(255, 255, 255, 0.05)',
        boxShadow: isHovered ? `0 0 15px ${skill.color}30` : 'none',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
      }}
    >
      {/* Left Column: Tech Logo inside Circular Progress HUD */}
      <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="48" height="48" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
          <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(0, 255, 102, 0.04)" strokeWidth={strokeWidth} />
          <circle 
            cx="24" 
            cy="24" 
            r={radius} 
            fill="none" 
            stroke={isHovered ? skill.color : 'var(--text-muted)'} 
            strokeWidth={strokeWidth} 
            strokeDasharray={circumference} 
            strokeDashoffset={animate ? strokeDashoffset : circumference}
            style={{
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.1, 0.8, 0.2, 1), stroke 0.3s ease',
              filter: isHovered ? `drop-shadow(0 0 4px ${skill.color})` : 'drop-shadow(0 0 2px var(--neon-green-glow))'
            }}
          />
        </svg>
        <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {skill.logo}
        </div>
      </div>

      {/* Right Column: Name & Metadata */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flexGrow: 1, minWidth: 0 }}>
        <div style={{ 
          fontFamily: 'var(--font-cyber)', 
          fontSize: '0.85rem', 
          fontWeight: 'bold', 
          color: isHovered ? skill.color : 'var(--text-main)', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          transition: 'color 0.2s'
        }}>
          {skill.name}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <span>LEVEL: {skill.level}%</span>
          <span style={{ color: isHovered ? skill.color : 'var(--text-muted)' }}>[{skill.status}]</span>
        </div>
      </div>
    </div>
  );
};

const SkillsHud = () => {
  const [animate, setAnimate] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [cpuFreq, setCpuFreq] = useState(4.82);

  useEffect(() => {
    // Trigger loading animation on mount
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuFreq((4.8 + Math.random() * 0.15).toFixed(2));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const skillGroups = [
    {
      title: 'COGNITIVE MATRIX: AI & MACHINE LEARNING',
      icon: <Cpu size={18} style={{ color: 'var(--accent-blue)' }} />,
      skills: [
        { name: 'Python & R', level: 90, status: 'STABLE', color: '#306998', logo: <PythonLogo />, note: 'Primary programming languages for data science, statistical analysis, AI model compiling, and OpenCV scripts.' },
        { name: 'PyTorch Framework', level: 85, status: 'OPTIMIZED', color: '#EE4C2C', logo: <PyTorchLogo />, note: 'Deep learning implementation, matrix computing, and transformer-based VisionTransformer-GPT2 multimodal neural networks.' },
        { name: 'OpenCV (Vision)', level: 80, status: 'ACTIVE', color: '#FF2D55', logo: <OpenCVLogo />, note: 'Computer vision integration, real-time webcam video arrays, Haar Cascade filters, and face recognition classifiers.' },
        { name: 'Transformers & NLP', level: 85, status: 'STABLE', color: '#FFD43B', logo: <TransformersLogo />, note: 'Hugging Face transformers integration, text generation modules, and LLM multimodal interfaces.' },
        { name: 'Pandas & Tkinter', level: 85, status: 'STABLE', color: '#15045C', logo: <PandasLogo />, note: 'Large dataset manipulation, training data vector logging, and building desktop tool interfaces.' }
      ]
    },
    {
      title: 'PHYSICAL MATRIX: ROBOTICS & IoT',
      icon: <Shield size={18} style={{ color: 'var(--accent-blue)' }} />,
      skills: [
        { name: 'Arduino (Uno/Nano)', level: 95, status: 'MAX_LOAD', color: '#00979D', logo: <ArduinoLogo />, note: 'Direct firmware programming, serial communication protocols (SPI, I2C), and servo motor controllers.' },
        { name: 'ESP8266 Wi-Fi', level: 85, status: 'ACTIVE', color: '#FFD43B', logo: <ESP8266Logo />, note: 'Internet-of-Things sensor node data transmission, local IP socket hosting, and real-time environment telemetry.' },
        { name: 'Sensors & Robotics', level: 90, status: 'STABLE', color: '#00FF66', logo: <Settings size={18} style={{ color: '#00FF66' }} />, note: 'Gaits coordination for quadruped spider robots, L293D motor drivers, autonomous obstacle avoiding, and sensor telemetry.' },
        { name: 'Digital Electronics', level: 85, status: 'SECURE', color: '#B5179E', logo: <Cpu size={18} style={{ color: '#B5179E' }} />, note: 'Design of circuits, hardware-to-software handshakes, analog/digital conversions, and logic gates layout.' }
      ]
    },
    {
      title: 'WEB SYSTEM INTEGRATION: FULL STACK',
      icon: <Globe size={18} style={{ color: 'var(--accent-blue)' }} />,
      skills: [
        { name: 'React & HTML5/CSS', level: 85, status: 'OPTIMIZED', color: '#61DAFB', logo: <ReactLogo />, note: 'React 19 hooks architecture, Vite fast compilation bundling, Tailwind utilities grid, and glassmorphism styling.' },
        { name: 'Firebase Database', level: 80, status: 'SECURE', color: '#FFC400', logo: <FirebaseLogo />, note: 'Secure Google authorization pipelines, user coins/avatars synchronization, and real-time Firestore database.' },
        { name: 'Leaflet & OSRM APIs', level: 80, status: 'ACTIVE', color: '#78B13F', logo: <LeafletLogo />, note: 'Interactive maps integration, geo-markers rendering, and OSRM API live route generation coordinates.' },
        { name: 'Gradio & Web Demos', level: 90, status: 'STABLE', color: '#FF5A00', logo: <GradioLogo />, note: 'Rapid hosting interfaces for deep learning and vision models, custom CSS animations, and public web demos.' }
      ]
    },
    {
      title: 'OPERATIONAL TOOL DECK: DEV UTILITIES & SERVICES',
      icon: <Terminal size={18} style={{ color: 'var(--accent-blue)' }} />,
      skills: [
        { name: 'VS Code & Colab', level: 95, status: 'STABLE', color: '#007ACC', logo: <VSCodeLogo />, note: 'Local and cloud execution environments, notebook servers, debugging, and workspace terminal panels.' },
        { name: 'Git Versioning', level: 90, status: 'VERIFIED', color: '#F05032', logo: <GitLogo />, note: 'Distributed version control, remote repo pushing, merging branches, and deployment integrations.' },
        { name: 'OpenAI & ChatGPT', level: 92, status: 'ACTIVE', color: '#10A37F', logo: <OpenAILogo />, note: 'API integration of large language models, dynamic prompts engineering, and chat automation scripts.' },
        { name: 'Antigravity Engine', level: 95, status: 'SYS_NOMINAL', color: '#FF0055', logo: <AntigravityLogo />, note: 'Agentic AI coding assistance, file system operations, and automated debugging protocols.' }
      ]
    },
    {
      title: 'NEURAL HANDSHAKE: SOFT SKILLS',
      icon: <Brain size={18} style={{ color: 'var(--accent-blue)' }} />,
      skills: [
        { name: 'Problem-Solving', level: 95, status: 'MAX_THINK', color: '#00F0FF', logo: <Brain size={18} style={{ color: '#00F0FF' }} />, note: 'Algorithmic efficiency analysis, debugging hardware-software bottlenecks, and architectural optimization.' },
        { name: 'Communication Link', level: 90, status: 'STABLE', color: '#8338EC', logo: <MessageSquare size={18} style={{ color: '#8338EC' }} />, note: 'Explaining technical system architectures, documenting API parameters, and technical writing.' },
        { name: 'Team Collaboration', level: 92, status: 'STABLE', color: '#3A86C8', logo: <Users size={18} style={{ color: '#3A86C8' }} />, note: 'Git-based team branch merges, project code alignment, and cross-functional planning.' }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ paddingBottom: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-game)', fontSize: '2rem', letterSpacing: '0.5px', fontWeight: '300', color: '#fff' }}>
            Technical Abilities
          </h2>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '5px' }}>
            Core Competencies & Technologies
          </div>
        </div>
      </div>

      {/* Grid of skill categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {skillGroups.map((group, groupIdx) => (
          <div key={groupIdx} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Category header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(0, 255, 102, 0.1)', paddingBottom: '8px' }}>
              {group.icon}
              <h3 style={{ margin: 0, fontSize: '0.85rem', letterSpacing: '1px', fontFamily: 'var(--font-cyber)', color: 'var(--accent-blue)', fontWeight: 'bold' }}>
                {group.title}
              </h3>
            </div>

            {/* Grid of tech cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {group.skills.map((skill, skillIdx) => (
                <SkillNodeCard
                  key={skillIdx}
                  skill={skill}
                  animate={animate}
                  onHover={setHoveredSkill}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Telemetry Console & Live Status Deck */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 1fr', gap: '20px', marginTop: '10px' }} className="skills-telemetry-deck">
        
        {/* Telemetry Console display */}
        <div className="glass-panel " style={{ padding: '15px 20px', minHeight: '110px', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'border-color 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '5px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            <Activity size={14} /> SKILL INSIGHTS
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
            {hoveredSkill ? (
              <div>
                <span style={{ color: hoveredSkill.color, fontWeight: '500' }}>{hoveredSkill.name}</span>: <span style={{ opacity: 0.8 }}>{hoveredSkill.note}</span>
              </div>
            ) : (
              <span style={{ color: 'var(--text-muted)', animation: 'pulse 2s infinite', opacity: 0.7 }}>
                Hover over a skill to view details...
              </span>
            )}
          </div>
        </div>

        {/* Live system parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="glass-panel " style={{ padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255, 255, 255, 0.02)' }}>
            <Cpu style={{ color: 'var(--text-muted)' }} size={20} />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Processor</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Optimal {cpuFreq} GHz</div>
            </div>
          </div>
          <div className="glass-panel " style={{ padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255, 255, 255, 0.02)' }}>
            <Zap style={{ color: 'var(--text-muted)' }} size={20} />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Response Time</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>12ms / Ultra-fast</div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @media (max-width: 768px) {
          .skills-telemetry-deck {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillsHud;
