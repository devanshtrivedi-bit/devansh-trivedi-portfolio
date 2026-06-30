import React from 'react';
import { X, Sliders, Volume2, Tv, Activity, Cpu } from 'lucide-react';

const SettingsPanel = ({
  isOpen,
  onClose,
  bgOpacity,
  setBgOpacity,
  soundEnabled,
  setSoundEnabled,
  volume,
  setVolume,
  synthType,
  setSynthType,
  crtEnabled,
  setCrtEnabled,
  matrixEnabled,
  setMatrixEnabled,
  matrixSpeed,
  setMatrixSpeed,
  playSelectSound
}) => {
  if (!isOpen) return null;

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (playSelectSound) playSelectSound();
  };

  const handleToggleCrt = () => {
    setCrtEnabled(!crtEnabled);
    if (playSelectSound) playSelectSound();
  };

  const handleToggleMatrix = () => {
    setMatrixEnabled(!matrixEnabled);
    if (playSelectSound) playSelectSound();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      width: '320px',
      background: 'rgba(5, 12, 8, 0.95)',
      border: '1px solid var(--accent-blue)',
      boxShadow: '0 0 20px rgba(0, 255, 102, 0.25), inset 0 0 10px rgba(0, 255, 102, 0.1)',
      zIndex: 200,
      padding: '20px',
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-main)',
      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)',
      animation: 'panelSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      {/* Decorative scan grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(rgba(0,255,102,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,0.02) 1px, transparent 1px)', backgroundSize: '8px 8px', pointerEvents: 'none', zIndex: 0 }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 255, 102, 0.25)', paddingBottom: '10px', marginBottom: '15px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={16} style={{ color: 'var(--accent-blue)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>SYSTEM_SETTINGS_CORE</span>
        </div>
        <button 
          onClick={onClose} 
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className="cyber-hover-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Settings Options content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1, fontSize: '0.75rem' }}>
        
        {/* Background image Opacity */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>BG_OPACITY:</span>
            <span style={{ color: 'var(--accent-blue)' }}>{Math.round(bgOpacity * 100)}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1.0" 
            step="0.02" 
            value={bgOpacity}
            onChange={(e) => setBgOpacity(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-blue)', background: '#111', cursor: 'pointer' }}
          />
        </div>

        {/* Audio section */}
        <div style={{ borderTop: '1px solid rgba(0, 255, 102, 0.1)', paddingTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Volume2 size={13} style={{ color: 'var(--accent-blue)' }} /> AUDIO_OUTPUT
            </span>
            <button 
              onClick={handleToggleSound}
              style={{
                background: soundEnabled ? 'rgba(0, 255, 102, 0.15)' : 'rgba(255, 0, 85, 0.1)',
                border: `1px solid ${soundEnabled ? 'var(--accent-blue)' : 'var(--accent-pink)'}`,
                color: soundEnabled ? 'var(--accent-blue)' : 'var(--accent-pink)',
                padding: '2px 8px',
                fontSize: '0.65rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          {/* Volume slider */}
          <div style={{ marginBottom: '8px', opacity: soundEnabled ? 1 : 0.4, transition: 'opacity 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>DECIBELS:</span>
              <span>{Math.round(volume * 500)}%</span>
            </div>
            <input 
              type="range" 
              min="0.01" 
              max="0.25" 
              step="0.01" 
              value={volume}
              disabled={!soundEnabled}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-blue)', background: '#111', cursor: 'pointer' }}
            />
          </div>

          {/* Waveform synth type select */}
          <div style={{ opacity: soundEnabled ? 1 : 0.4, transition: 'opacity 0.2s' }}>
            <span style={{ display: 'block', marginBottom: '4px' }}>SYNTH_WAVEFORM:</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {['sine', 'triangle', 'square', 'sawtooth'].map((type) => (
                <button
                  key={type}
                  disabled={!soundEnabled}
                  onClick={() => { setSynthType(type); if (playSelectSound) playSelectSound(); }}
                  style={{
                    background: synthType === type ? 'rgba(0, 255, 102, 0.12)' : 'rgba(0,0,0,0.5)',
                    border: `1px solid ${synthType === type ? 'var(--accent-blue)' : 'rgba(255,255,255,0.08)'}`,
                    color: synthType === type ? 'var(--accent-blue)' : 'var(--text-muted)',
                    padding: '3px',
                    fontSize: '0.62rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual FX Toggles */}
        <div style={{ borderTop: '1px solid rgba(0, 255, 102, 0.1)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* CRT Screen */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tv size={13} /> CRT_SCANLINES
            </span>
            <button 
              onClick={handleToggleCrt}
              style={{
                background: crtEnabled ? 'rgba(0, 255, 102, 0.15)' : 'rgba(0,0,0,0.5)',
                border: `1px solid ${crtEnabled ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)'}`,
                color: crtEnabled ? 'var(--accent-blue)' : 'var(--text-muted)',
                padding: '2px 8px',
                fontSize: '0.65rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {crtEnabled ? 'ACTIVE' : 'BYPASS'}
            </button>
          </div>

          {/* Matrix code rain toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={13} /> MATRIX_RAIN
            </span>
            <button 
              onClick={handleToggleMatrix}
              style={{
                background: matrixEnabled ? 'rgba(0, 255, 102, 0.15)' : 'rgba(0,0,0,0.5)',
                border: `1px solid ${matrixEnabled ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)'}`,
                color: matrixEnabled ? 'var(--accent-blue)' : 'var(--text-muted)',
                padding: '2px 8px',
                fontSize: '0.65rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {matrixEnabled ? 'ONLINE' : 'OFFLINE'}
            </button>
          </div>

          {/* Matrix rain speed slider */}
          <div style={{ opacity: matrixEnabled ? 1 : 0.4, transition: 'opacity 0.2s', marginTop: '2px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>RAIN_CLOCK_SPEED:</span>
              <span style={{ color: 'var(--accent-blue)' }}>{matrixSpeed.toFixed(2)}x</span>
            </div>
            <input 
              type="range" 
              min="0.2" 
              max="2.5" 
              step="0.1" 
              value={matrixSpeed}
              disabled={!matrixEnabled}
              onChange={(e) => setMatrixSpeed(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-blue)', background: '#111', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Diagnostic Logs console feedback */}
        <div style={{
          borderTop: '1px solid rgba(0, 255, 102, 0.1)',
          paddingTop: '10px',
          marginTop: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.6rem', marginBottom: '4px' }}>
            <Cpu size={12} /> TELEMETRY_FEEDBACK
          </div>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(0, 255, 102, 0.15)',
            padding: '6px',
            fontSize: '0.58rem',
            color: 'var(--text-muted)',
            lineHeight: '1.4'
          }}>
            <div>&gt; BG_RENDER: {bgOpacity > 0 ? 'ACTIVE_TRANS_SHFT' : 'BYPASSED'}</div>
            <div>&gt; CRT_SCAN: {crtEnabled ? 'NOMINAL' : 'CRT_DISABLED'}</div>
            <div>&gt; RAIN_CLOCK: {(matrixSpeed * 30).toFixed(0)} FPS_TICK</div>
            <div>&gt; SYNTH_WAVE: {synthType.toUpperCase()}</div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes panelSlideIn {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .cyber-hover-white:hover {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default SettingsPanel;
