import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Activity, 
  Database, 
  RefreshCw, 
  Sliders, 
  CheckCircle2, 
  Play, 
  Binary 
} from 'lucide-react';

const CredentialsHud = ({ soundEnabled, playSound }) => {
  const [activeTab, setActiveTab] = useState('education');
  const [selectedId, setSelectedId] = useState('bvoc-ai');
  const [injectingState, setInjectingState] = useState({ active: false, progress: 0, targetId: null });
  const [injectedModules, setInjectedModules] = useState({});

  const education = [
    {
      id: 'bvoc-ai',
      institution: 'Dayalbagh Educational Institute',
      degree: 'Bachelor of Vocation in Artificial Intelligence & Robotics',
      timeline: '2024 - 2027 (Expected)',
      grade: 'First Class',
      status: 'ACTIVE UPLINK',
      details: 'Comprehensive study of machine learning architectures, industrial automation, control theory, deep learning models, and real-time robotic hardware systems integration.',
      modules: ['Machine Learning', 'Industrial Automation', 'Deep Learning', 'Robotic Systems', 'Control Theory'],
      integrity: 98,
      uplinkNode: 'DEI_CORE_UPLINK_AGRA',
      color: '#00ff66', // Neon Green
      glowColor: 'rgba(0, 255, 102, 0.4)'
    },
    {
      id: 'inter-xii',
      institution: 'Ch. Beeri Singh Inter College',
      degree: 'Intermediate Certificate (Class XII)',
      timeline: 'March 2024',
      grade: 'Science & Math Stream',
      status: 'ARCHIVED RECORD',
      details: 'Focused study of mathematical analysis, advanced physics, and computing fundamentals.',
      modules: ['Advanced Calculus', 'Classical Mechanics', 'Electromagnetism', 'Computer Science'],
      integrity: 100,
      uplinkNode: 'UPMSP_ARCHIVE_SEC_A',
      color: '#00f0ff', // Cyber Cyan
      glowColor: 'rgba(0, 240, 255, 0.4)'
    },
    {
      id: 'high-x',
      institution: 'Ch. Beeri Singh Inter College',
      degree: 'High School (Class X)',
      timeline: 'March 2022',
      grade: 'Science Stream',
      status: 'ARCHIVED RECORD',
      details: 'Secondary board education with core focus on computational science and engineering fundamentals.',
      modules: ['General Mathematics', 'Elementary Chemistry', 'Physics Foundations', 'Information Tech'],
      integrity: 100,
      uplinkNode: 'UPMSP_ARCHIVE_SEC_B',
      color: '#ab47bc', // Cyber Purple
      glowColor: 'rgba(171, 71, 188, 0.4)'
    }
  ];

  const certifications = [
    {
      id: 'cert-ai-fun',
      title: 'Artificial Intelligence Fundamentals',
      provider: 'Anudip Foundation',
      year: '2025',
      code: 'AN-AI-9908',
      status: 'VALIDATED',
      checksum: '0x8B1A4F99D2E4',
      color: '#00ff66',
      glowColor: 'rgba(0, 255, 102, 0.4)',
      firmware: 'ANUDIP-AI-v1.2',
      metrics: { accuracy: '94.2%', neural_layers: '12', latency: '14ms' },
      modules: ['Artificial Intelligence', 'Basic Machine Learning', 'Data Ethics', 'Neural Synapse Systems']
    },
    {
      id: 'cert-ai-int',
      title: 'Artificial Intelligence Internship',
      provider: 'My Job Grow',
      year: '2025',
      code: 'MJG-INT-2025',
      status: 'COMPLETED',
      checksum: '0xC2D1F490E8B2',
      color: '#ffb700', // Gold/Amber
      glowColor: 'rgba(255, 183, 0, 0.4)',
      firmware: 'MJG-INT-v2.5',
      metrics: { accuracy: '96.8%', neural_layers: '24', latency: '18ms' },
      modules: ['Industry ML Pipelines', 'Generative API Integration', 'Computer Vision Deployments', 'Team Git Operations']
    },
    {
      id: 'cert-ai-ws',
      title: 'Artificial Intelligence Workshop',
      provider: 'Dayalbagh Educational Institute',
      year: '2025',
      code: 'DEI-WS-AI',
      status: 'VALIDATED',
      checksum: '0xE5F1A8C92B45',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.4)',
      firmware: 'DEI-AI-WS-v1.0',
      metrics: { accuracy: '92.5%', neural_layers: '8', latency: '12ms' },
      modules: ['Robotics Vision', 'DEI AI Architectures', 'Edge Computing Intro', '15-Day Deep Hackathon']
    },
    {
      id: 'cert-ml-py',
      title: 'Machine Learning in Python',
      provider: 'SkillUp',
      year: '2025',
      code: 'SKUP-ML-PY',
      status: 'VERIFIED',
      checksum: '0xD4F3B2C1A099',
      color: '#ff0055', // Cyber Neon Pink
      glowColor: 'rgba(255, 0, 85, 0.4)',
      firmware: 'SKUP-ML-v3.1',
      metrics: { accuracy: '95.0%', neural_layers: '16', latency: '15ms' },
      modules: ['Pythonic ML Libraries', 'Regression & Classification', 'Feature Engineering', 'Supervised Learning Sync']
    },
    {
      id: 'cert-gen-ai',
      title: 'Generative AI',
      provider: 'SkillUp',
      year: '2025',
      code: 'SKUP-GEN-AI',
      status: 'VERIFIED',
      checksum: '0xA9B8C7D6E5F4',
      color: '#ab47bc',
      glowColor: 'rgba(171, 71, 188, 0.4)',
      firmware: 'SKUP-GENAI-v4.0',
      metrics: { accuracy: '98.1%', neural_layers: '32', latency: '22ms' },
      modules: ['Large Language Models', 'Prompt Engineering', 'Diffusion Models', 'AI Agent Orchestration']
    }
  ];

  // Auto-switch selected item when tab changes
  useEffect(() => {
    if (activeTab === 'education') {
      setSelectedId(education[0].id);
    } else {
      setSelectedId(certifications[0].id);
    }
  }, [activeTab]);

  const activeList = activeTab === 'education' ? education : certifications;
  const currentItem = activeList.find(item => item.id === selectedId) || activeList[0];

  const triggerSound = (freq = 800, type = 'sine', duration = 0.08) => {
    if (soundEnabled && playSound) {
      playSound(freq, type, duration);
    }
  };

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      triggerSound(700, 'triangle', 0.12);
      setActiveTab(tab);
    }
  };

  const handleSelectCard = (id) => {
    if (id !== selectedId) {
      triggerSound(600, 'sine', 0.05);
      setSelectedId(id);
    }
  };

  const handleInjectModule = () => {
    if (injectingState.active || injectedModules[currentItem.id]) return;

    triggerSound(400, 'sawtooth', 0.15);
    setTimeout(() => triggerSound(480, 'sawtooth', 0.15), 100);

    setInjectingState({
      active: true,
      progress: 0,
      targetId: currentItem.id
    });

    const duration = 1800; // 1.8 seconds
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progressPercent = Math.min(Math.round((currentStep / steps) * 100), 100);
      
      // Rising sound tone as progress grows
      if (currentStep % 4 === 0) {
        triggerSound(500 + progressPercent * 5, 'sine', 0.05);
      }

      setInjectingState(prev => ({
        ...prev,
        progress: progressPercent
      }));

      if (currentStep >= steps) {
        clearInterval(timer);
        setInjectedModules(prev => ({ ...prev, [currentItem.id]: true }));
        setInjectingState({ active: false, progress: 0, targetId: null });
        
        // Success Chime
        setTimeout(() => triggerSound(900, 'triangle', 0.1), 0);
        setTimeout(() => triggerSound(1200, 'triangle', 0.15), 100);
        setTimeout(() => triggerSound(1500, 'triangle', 0.25), 200);
      }
    }, intervalTime);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%' }}>
      {/* Title */}
      <div style={{ paddingBottom: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-game)', fontSize: '2rem', letterSpacing: '0.5px', fontWeight: '300', color: '#fff' }}>
            Credentials & Experience
          </h2>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '5px' }}>
            Professional Background
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '10px' }}>
        <button
          onClick={() => handleTabChange('education')}
          className={`game-button ${activeTab === 'education' ? 'active' : ''}`}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontSize: '0.85rem',
            borderColor: activeTab === 'education' ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.05)'
          }}
        >
          <GraduationCap size={16} /> Academic Records
        </button>
        <button
          onClick={() => handleTabChange('certifications')}
          className={`game-button ${activeTab === 'certifications' ? 'active' : ''}`}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontSize: '0.85rem',
            borderColor: activeTab === 'certifications' ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.05)'
          }}
        >
          <Award size={16} /> Certifications
        </button>
      </div>

      {/* Main Grid */}
      <div className="credentials-dashboard-grid">
        {/* Left Side: List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {activeList.map((item) => {
            const isSelected = item.id === selectedId;
            const isInjected = injectedModules[item.id];
            return (
              <div
                key={item.id}
                onClick={() => handleSelectCard(item.id)}
                className={`credentials-item-card ${isSelected ? 'selected' : ''}`}
                style={{
                  '--card-theme-color': item.color,
                  '--card-glow-color': item.glowColor,
                  borderLeft: `4px solid ${isSelected ? item.color : 'rgba(125, 165, 143, 0.2)'}`
                }}
              >
                {/* Corner details */}
                <div className="card-bracket-top-right"></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className="card-id-badge" style={{ color: item.color }}>
                    {activeTab === 'education' ? 'EDU_SEC' : 'CERT_SEC'}: #{item.id.toUpperCase().split('-')[1] || item.id}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isInjected && (
                      <span className="injected-tag glow-green">
                        <CheckCircle2 size={10} /> INJECTED
                      </span>
                    )}
                    <span className="pulse-indicator" style={{ backgroundColor: item.color }}></span>
                  </div>
                </div>

                <h3 className="card-title-text" style={{ color: isSelected ? '#ffffff' : 'var(--text-main)' }}>
                  {activeTab === 'education' ? item.degree : item.title}
                </h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '8px' }}>
                  <span>{activeTab === 'education' ? item.institution : item.provider}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Calendar size={11} /> {activeTab === 'education' ? item.timeline.split(' ')[0] : item.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Diagnostics Deck */}
        <div className="diagnostics-monitor-container">
          <div className="glass-panel diagnostics-panel" style={{ '--panel-theme-color': currentItem?.color || 'var(--accent-blue)', padding: '30px', background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
            
            {/* Monitor Header */}
            <div className="monitor-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '15px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={14} style={{ color: currentItem?.color }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Details</span>
              </div>
            </div>

            {/* Monitor Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 2 }}>
              
              {/* Graphic SVG Node Visualizer */}
              <div className="graphic-uplink-visualizer">
                <svg width="100%" height="110" viewBox="0 0 300 110" style={{ overflow: 'visible' }}>
                  {/* Central Node */}
                  <circle cx="150" cy="55" r="16" fill="rgba(0,0,0,0.6)" stroke={currentItem?.color} strokeWidth="2" className="pulse-circle" />
                  <circle cx="150" cy="55" r="6" fill={currentItem?.color} />
                  
                  {/* Surrounding Connected Nodes */}
                  <g className="network-connections">
                    {/* Left Connector Node */}
                    <line x1="150" y1="55" x2="60" y2="35" stroke={currentItem?.color} strokeWidth="1" strokeDasharray="4,4" className="dash-anim" />
                    <circle cx="60" cy="35" r="8" fill="rgba(0,0,0,0.6)" stroke={currentItem?.color} strokeWidth="1.5" />
                    <circle cx="60" cy="35" r="3" fill={currentItem?.color} />
                    
                    {/* Right Connector Node */}
                    <line x1="150" y1="55" x2="240" y2="35" stroke={currentItem?.color} strokeWidth="1" strokeDasharray="4,4" className="dash-anim-reverse" />
                    <circle cx="240" cy="35" r="8" fill="rgba(0,0,0,0.6)" stroke={currentItem?.color} strokeWidth="1.5" />
                    <circle cx="240" cy="35" r="3" fill={currentItem?.color} />

                    {/* Bottom Left Connector */}
                    <line x1="150" y1="55" x2="90" y2="85" stroke={currentItem?.color} strokeWidth="1" strokeDasharray="4,4" className="dash-anim" />
                    <circle cx="90" cy="85" r="8" fill="rgba(0,0,0,0.6)" stroke={currentItem?.color} strokeWidth="1.5" />
                    <circle cx="90" cy="85" r="3" fill={currentItem?.color} />

                    {/* Bottom Right Connector */}
                    <line x1="150" y1="55" x2="210" y2="85" stroke={currentItem?.color} strokeWidth="1" strokeDasharray="4,4" className="dash-anim-reverse" />
                    <circle cx="210" cy="85" r="8" fill="rgba(0,0,0,0.6)" stroke={currentItem?.color} strokeWidth="1.5" />
                    <circle cx="210" cy="85" r="3" fill={currentItem?.color} />
                  </g>
                  
                  {/* Labels on SVG */}
                  <text x="150" y="85" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1">SECURE_SYNC</text>
                  <text x="60" y="20" textAnchor="middle" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="7">DATA_CH_01</text>
                  <text x="240" y="20" textAnchor="middle" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="7">UPLINK_02</text>
                </svg>
              </div>

              {/* Identity details */}
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontFamily: 'var(--font-cyber)', fontSize: '1.05rem', color: '#ffffff', letterSpacing: '1px' }}>
                  {activeTab === 'education' ? currentItem.degree : currentItem.title}
                </h4>
                <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span>ORG: <span style={{ color: currentItem.color }}>{activeTab === 'education' ? currentItem.institution : currentItem.provider}</span></span>
                  <span>|</span>
                  <span>{activeTab === 'education' ? 'TIMELINE' : 'ISSUED'}: {activeTab === 'education' ? currentItem.timeline : currentItem.year}</span>
                </div>
              </div>

              {/* Details explanation text */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderLeft: `2px solid ${currentItem.color}`, fontSize: '0.8rem', lineHeight: '1.4', color: 'var(--text-main)', minHeight: '60px' }}>
                {activeTab === 'education' ? currentItem.details : `Neural certification registered under verification hash ${currentItem.checksum}. Provides validated authority token to execute operations regarding ${currentItem.title}.`}
              </div>

              {/* Grid data specs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Spec item 1 */}
                <div className="spec-tile">
                  <span className="spec-label">INTEGRITY_INDEX</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <div style={{ flexGrow: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${activeTab === 'education' ? currentItem.integrity : 100}%`, height: '100%', backgroundColor: currentItem.color, boxShadow: `0 0 8px ${currentItem.color}` }}></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: currentItem.color, fontWeight: 'bold' }}>
                      {activeTab === 'education' ? currentItem.integrity : 100}%
                    </span>
                  </div>
                </div>

                {/* Spec item 2 */}
                <div className="spec-tile">
                  <span className="spec-label">SECTOR_NODE</span>
                  <span className="spec-value" style={{ color: '#ffffff' }}>
                    {activeTab === 'education' ? currentItem.uplinkNode.split('_')[0] : currentItem.firmware}
                  </span>
                </div>

                {/* Spec item 3 */}
                <div className="spec-tile" style={{ gridColumn: 'span 2' }}>
                  <span className="spec-label">TRANSMISSION_SIGNATURE</span>
                  <span className="spec-value" style={{ fontFamily: 'var(--font-mono)', color: currentItem.color, fontSize: '0.75rem', wordBreak: 'break-all' }}>
                    {activeTab === 'education' ? `RSA_KEY_DEC_${currentItem.id.toUpperCase()}_DEI_NODE_SECURE` : `SHA_256::${currentItem.checksum} [VERIFIED]`}
                  </span>
                </div>
              </div>

              {/* Core Skill Sub-modules */}
              <div>
                <span className="spec-label" style={{ marginBottom: '6px', display: 'block' }}>CORE_MODULES_LOADED</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {currentItem.modules?.map((mod, idx) => (
                    <span key={idx} className="skill-bubble" style={{ borderColor: `rgba(${parseInt(currentItem.color.slice(1,3),16) || 0}, ${parseInt(currentItem.color.slice(3,5),16) || 255}, ${parseInt(currentItem.color.slice(5,7),16) || 102}, 0.25)` }}>
                      <Binary size={10} style={{ color: currentItem.color, marginRight: '4px' }} />
                      {mod.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Inject Neural Link */}
              <div style={{ marginTop: '5px' }}>
                {injectedModules[currentItem.id] ? (
                  <div className="injected-success-banner" style={{ borderColor: currentItem.color }}>
                    <CheckCircle2 size={16} className="glow-icon" style={{ color: currentItem.color }} />
                    <span style={{ color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '1px' }}>
                      INTEGRITY CHECK COMPLETE // NODE LOADED
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={handleInjectModule}
                    disabled={injectingState.active}
                    className="game-button inject-btn"
                    style={{ 
                      width: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '10px',
                      borderColor: currentItem.color,
                      color: currentItem.color,
                      fontSize: '0.85rem'
                    }}
                  >
                    {injectingState.active && injectingState.targetId === currentItem.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                          <span>UPLINKING NEURAL COGNITION SYSTEM...</span>
                          <span>{injectingState.progress}%</span>
                        </div>
                        <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${injectingState.progress}%`, height: '100%', backgroundColor: currentItem.color, boxShadow: `0 0 10px ${currentItem.color}` }}></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <RefreshCw size={14} className="sync-icon-spin" />
                        <span>RUN NEURAL LINK INJECTION</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Embedded style elements for layout and custom responsiveness */}
      <style>{`
        .credentials-dashboard-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 25px;
        }

        @media (max-width: 900px) {
          .credentials-dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Card Styles */
        .credentials-item-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 18px;
          border-radius: 12px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .credentials-item-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .credentials-item-card.selected {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--card-theme-color);
          box-shadow: 0 0 20px rgba(255,255,255,0.05);
        }

        .card-bracket-top-right {
          display: none;
        }

        .credentials-item-card.selected .card-bracket-top-right {
          display: none;
        }

        .card-id-badge {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 1px;
          font-weight: 500;
        }

        .card-title-text {
          margin: 5px 0;
          font-family: var(--font-cyber);
          font-size: 1.08rem;
          font-weight: bold;
          line-height: 1.3;
          transition: color 0.2s ease;
        }

        .pulse-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          animation: cardPulse 2s infinite ease-in-out;
        }

        .injected-tag {
          font-family: var(--font-body);
          font-size: 0.65rem;
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #fff;
          font-weight: 500;
        }

        /* Monitor Deck Panel */
        .diagnostics-panel {
          padding: 22px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .diagnostics-panel::before {
          display: none;
        }

        .diagnostics-panel::after {
          display: none;
        }

        .monitor-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 10px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 1px;
        }

        .blinking-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: dotBlink 1.2s infinite ease-in-out;
        }

        .hologram-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(255, 255, 255, 0.03) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.01), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.01));
          background-size: 100% 4px, 6px 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* Specs elements */
        .spec-tile {
          display: flex;
          flex-direction: column;
          background: rgba(0,0,0,0.25);
          padding: 8px 12px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 4px;
        }

        .spec-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .spec-value {
          font-family: var(--font-cyber);
          font-size: 0.85rem;
          font-weight: 600;
          margin-top: 2px;
        }

        .skill-bubble {
          display: flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          padding: 3px 8px;
          background: rgba(0,0,0,0.3);
          border: 1px solid;
          border-radius: 12px;
          color: var(--text-main);
        }

        /* Inject button & progress */
        .inject-btn:hover {
          background: rgba(255, 255, 255, 0.02) !important;
        }

        .sync-icon-spin {
          animation: spin 3s linear infinite;
        }

        .injected-success-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background: rgba(0, 255, 102, 0.05);
          border: 1px solid;
          border-radius: 4px;
          animation: bannerGlow 1.5s ease-in-out infinite alternate;
        }

        .glow-icon {
          filter: drop-shadow(0 0 4px currentColor);
        }

        /* Corner Brackets for HUD feel */
        .corner-bracket {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: rgba(255, 255, 255, 0.15);
          border-style: solid;
          pointer-events: none;
          z-index: 2;
        }

        .corner-bracket.top-left { top: 12px; left: 12px; border-width: 1px 0 0 1px; }
        .corner-bracket.top-right { top: 12px; right: 12px; border-width: 1px 1px 0 0; }
        .corner-bracket.bottom-left { bottom: 12px; left: 12px; border-width: 0 0 1px 1px; }
        .corner-bracket.bottom-right { bottom: 12px; right: 12px; border-width: 0 1px 1px 0; }

        /* Animation Keyframes */
        @keyframes cardPulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }

        @keyframes dotBlink {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bannerGlow {
          0% { box-shadow: 0 0 5px rgba(0, 255, 102, 0.05); }
          100% { box-shadow: 0 0 12px rgba(0, 255, 102, 0.15); }
        }

        .pulse-circle {
          transform-origin: 150px 55px;
          animation: pulseNode 3s infinite ease-in-out;
        }

        @keyframes pulseNode {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.7; }
        }

        .dash-anim {
          stroke-dasharray: 5, 5;
          animation: dashMove 8s linear infinite;
        }

        @keyframes dashMove {
          to {
            stroke-dashoffset: -40;
          }
        }

        .dash-anim-reverse {
          stroke-dasharray: 5, 5;
          animation: dashMoveReverse 8s linear infinite;
        }

        @keyframes dashMoveReverse {
          to {
            stroke-dashoffset: 40;
          }
        }
      `}</style>
    </div>
  );
};

export default CredentialsHud;
