import React, { useState, useEffect } from 'react';
import { ExternalLink, GitBranch, Cpu, Database, ShieldCheck, Activity, Terminal } from 'lucide-react';

// Custom Project Visual Simulation Renderers - Configured as React Components
const ImageBotSim = ({ color }) => {
  const [activeLabel, setActiveLabel] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [boxCoords, setBoxCoords] = useState({ x: 12, y: 15, w: 45, h: 40 });
  
  const labels = [
    { name: 'IDENTIFYING...', confidence: '--', text: 'Scanning visual frame...' },
    { name: 'FELIS_CATUS (CAT)', confidence: '98.7%', text: 'Detected: Felis catus with cyber visor HUD. Class: Mammal. Status: Hostile.' },
    { name: 'CYBERPUNK_VISOR', confidence: '94.2%', text: 'Analyzing optical augmentation... Visor emits 532nm laser emission.' },
    { name: 'NEON_GLARE_REFLECT', confidence: '89.5%', text: 'Ambient luminance interference detected at 450lm. Filtering reflection...' }
  ];

  // Rotate through classification targets
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLabel((prev) => (prev + 1) % labels.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Bounding box jitter animation
  useEffect(() => {
    const boxTimer = setInterval(() => {
      setBoxCoords({
        x: Math.floor(Math.random() * 6) + 12,
        y: Math.floor(Math.random() * 6) + 12,
        w: Math.floor(Math.random() * 8) + 40,
        h: Math.floor(Math.random() * 8) + 40,
      });
    }, 800);
    return () => clearInterval(boxTimer);
  }, []);

  // Typing effect logic
  useEffect(() => {
    const fullText = labels[activeLabel].text;
    let index = 0;
    setTypedText('');
    const typingTimer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingTimer);
      }
    }, 30);
    return () => clearInterval(typingTimer);
  }, [activeLabel]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '150px', border: `1px solid ${color}35`, background: 'rgba(0,0,0,0.6)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '130px 1fr', gap: '15px', padding: '12px', boxSizing: 'border-box' }}>
      {/* Left side: Neural Image processing */}
      <div style={{ position: 'relative', border: `1px solid ${color}20`, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Vector Cat Graphic */}
        <svg width="90" height="90" viewBox="0 0 100 100" style={{ fill: 'none', stroke: color, strokeWidth: 1.5, opacity: 0.85 }}>
          <line x1="10" y1="50" x2="90" y2="50" stroke={`${color}15`} strokeWidth="0.5" />
          <line x1="50" y1="10" x2="50" y2="90" stroke={`${color}15`} strokeWidth="0.5" />
          <polygon points="50,20 25,45 25,65 50,85 75,65 75,45" strokeDasharray="3,3" />
          <polygon points="50,20 30,30 25,45 40,55 50,45 60,55 75,45 70,30" />
          <polyline points="25,65 40,70 50,85 60,70 75,65" />
          <polygon points="32,48 48,48 45,55 35,55" fill={`${color}30`} />
          <polygon points="52,48 68,48 65,55 55,55" fill={`${color}30`} />
          <polygon points="48,63 52,63 50,68" />
        </svg>
        {/* Animated Bounding Box */}
        <div style={{
          position: 'absolute',
          border: `1.5px solid ${color}`,
          boxShadow: `0 0 8px ${color}`,
          left: `${boxCoords.x}%`,
          top: `${boxCoords.y}%`,
          width: `${boxCoords.w}%`,
          height: `${boxCoords.h}%`,
          transition: 'all 0.4s ease',
          pointerEvents: 'none'
        }}>
          {/* Corners */}
          <div style={{ position: 'absolute', top: '-3px', left: '-3px', width: '6px', height: '6px', borderTop: `2px solid #fff`, borderLeft: `2px solid #fff` }} />
          <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '6px', height: '6px', borderTop: `2px solid #fff`, borderRight: `2px solid #fff` }} />
          <div style={{ position: 'absolute', bottom: '-3px', left: '-3px', width: '6px', height: '6px', borderBottom: `2px solid #fff`, borderLeft: `2px solid #fff` }} />
          <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '6px', height: '6px', borderBottom: `2px solid #fff`, borderRight: `2px solid #fff` }} />
          <span style={{ position: 'absolute', top: '-12px', left: '0', background: color, color: '#000', fontSize: '0.45rem', fontFamily: 'var(--font-mono)', padding: '0 2px', fontWeight: 'bold' }}>
            LOC:[{boxCoords.x},{boxCoords.y}]
          </span>
        </div>
        {/* Sweeping scanline */}
        <div style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: color, boxShadow: `0 0 10px ${color}`, animation: 'sweepVertical 3s linear infinite' }} />
      </div>

      {/* Right side: AI classification telemetry logs */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', boxSizing: 'border-box' }}>
        <div>
          <div style={{ color: color, fontWeight: 'bold', fontSize: '0.75rem', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
            <span>[ViT-GPT2 MULTIMODAL LOG]</span>
            <span style={{ animation: 'pulseText 0.8s infinite' }}>● ANALYZING</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>MODEL_CORE:</span> <span style={{ color: '#fff' }}>VisionTransformer-GPT2</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>CLASSIFICATION:</span> <span style={{ color: color, fontWeight: 'bold' }}>{labels[activeLabel].name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>CONFIDENCE:</span> <span style={{ color: 'var(--accent-blue)' }}>{labels[activeLabel].confidence}</span>
          </div>
        </div>
        
        {/* Dynamic chat box query response console */}
        <div style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${color}20`, padding: '6px', height: '48px', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontSize: '0.62rem' }}>
          <span style={{ color: color }}>&gt; OUTPUT_GENERATION:</span>
          <span style={{ color: '#fff', opacity: 0.95 }}>{typedText}<span style={{ animation: 'blink 0.8s infinite', color: color }}>_</span></span>
        </div>
      </div>
    </div>
  );
};

const TransitSim = ({ color }) => {
  const [stationIndex, setStationIndex] = useState(0);
  const [gpsCoords, setGpsCoords] = useState({ lat: 27.1751, lon: 78.0421 });
  const [speed, setSpeed] = useState(35);
  
  const stations = [
    { name: 'SIKANDRA', lat: 27.2185, lon: 77.9515 },
    { name: 'MG ROAD', lat: 27.1856, lon: 78.0062 },
    { name: 'TAJ MAHAL', lat: 27.1751, lon: 78.0421 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStationIndex((prev) => (prev + 1) % stations.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Interlaced GPS interpolation simulator
    const target = stations[stationIndex];
    let intervalCount = 0;
    const steps = 30;
    
    const gpsTimer = setInterval(() => {
      if (intervalCount < steps) {
        setGpsCoords((prev) => ({
          lat: prev.lat + (target.lat - prev.lat) / (steps - intervalCount),
          lon: prev.lon + (target.lon - prev.lon) / (steps - intervalCount)
        }));
        setSpeed(Math.floor(Math.random() * 15) + 30);
        intervalCount++;
      } else {
        clearInterval(gpsTimer);
        setSpeed(0); // Arrived!
      }
    }, 120);

    return () => clearInterval(gpsTimer);
  }, [stationIndex]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '150px', border: `1px solid ${color}35`, background: 'rgba(0,0,0,0.6)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px', padding: '12px', boxSizing: 'border-box' }}>
      {/* Left side: Vector Map Grid */}
      <div style={{ position: 'relative', border: `1px solid ${color}20`, background: 'rgba(0,0,0,0.4)', overflow: 'hidden' }}>
        <svg width="100%" height="100%" viewBox="0 0 160 126" style={{ fill: 'none' }}>
          <path d="M 0,20 L 160,20 M 0,50 L 160,50 M 0,80 L 160,80 M 0,110 L 160,110 M 30,0 L 30,126 M 70,0 L 70,126 M 110,0 L 110,126" stroke={`${color}10`} strokeWidth="0.5" />
          
          {/* River Yamuna representation */}
          <path d="M-10,35 Q 40,20 80,45 T 170,30" stroke="rgba(0, 150, 255, 0.4)" strokeWidth="4" fill="none" />
          
          {/* Route path */}
          <polyline points="20,100 40,80 80,80 110,50 140,80" stroke={`${color}50`} strokeWidth="2" strokeDasharray="3,3" />
          
          {/* Station Markers */}
          <circle cx="20" cy="100" r="4" fill="#000" stroke={color} strokeWidth="1.5" />
          <circle cx="80" cy="80" r="4" fill="#000" stroke={color} strokeWidth="1.5" />
          <circle cx="140" cy="80" r="4" fill="#000" stroke={color} strokeWidth="1.5" />
          
          {/* Station pulse when selected */}
          {stationIndex === 0 && <circle cx="20" cy="100" r="8" stroke={color} strokeWidth="1" fill="none" style={{ transformOrigin: '20px 100px', animation: 'corePulse 1s ease-in-out infinite' }} />}
          {stationIndex === 1 && <circle cx="80" cy="80" r="8" stroke={color} strokeWidth="1" fill="none" style={{ transformOrigin: '80px 80px', animation: 'corePulse 1s ease-in-out infinite' }} />}
          {stationIndex === 2 && <circle cx="140" cy="80" r="8" stroke={color} strokeWidth="1" fill="none" style={{ transformOrigin: '140px 80px', animation: 'corePulse 1s ease-in-out infinite' }} />}

          {/* Labels for stations */}
          <text x="15" y="112" fill="var(--text-muted)" fontSize="6" fontFamily="var(--font-mono)">SIK</text>
          <text x="75" y="72" fill="var(--text-muted)" fontSize="6" fontFamily="var(--font-mono)">MGR</text>
          <text x="132" y="72" fill="var(--text-muted)" fontSize="6" fontFamily="var(--font-mono)">TAJ</text>

          {/* Animated Bus Icon Node */}
          {(() => {
            let bx = 20, by = 100;
            if (stationIndex === 0) { bx = 20; by = 100; }
            else if (stationIndex === 1) { bx = 80; by = 80; }
            else { bx = 140; by = 80; }
            return (
              <g style={{ transform: `translate(${bx - 5}px, ${by - 5}px)`, transition: 'transform 3.5s cubic-bezier(0.25, 0.8, 0.25, 1)' }}>
                <rect x="0" y="0" width="10" height="10" rx="2" fill={color} />
                <circle cx="3" cy="10" r="1.5" fill="#fff" />
                <circle cx="7" cy="10" r="1.5" fill="#fff" />
                <line x1="2" y1="3" x2="8" y2="3" stroke="#000" strokeWidth="1" />
              </g>
            );
          })()}
        </svg>
        <span style={{ position: 'absolute', bottom: '3px', right: '4px', fontSize: '0.5rem', fontFamily: 'var(--font-mono)', color: color, background: 'rgba(0,0,0,0.6)', padding: '1px 3px' }}>OSRM_AGRA_CELL</span>
      </div>

      {/* Right side: Bus telemetry & firebase coin system */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
        <div>
          <div style={{ color: color, fontWeight: 'bold', fontSize: '0.75rem', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
            <span>[ROUTE_TRACKER_GPS]</span>
            <span style={{ color: 'var(--accent-blue)', animation: 'pulseText 1s infinite' }}>● LIVE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>LATITUDE:</span> <span style={{ color: '#fff' }}>{gpsCoords.lat.toFixed(6)}° N</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>LONGITUDE:</span> <span style={{ color: '#fff' }}>{gpsCoords.lon.toFixed(6)}° E</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>NEXT_STOP:</span> <span style={{ color: color, fontWeight: 'bold' }}>{stations[stationIndex].name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>BUS_SPEED:</span> <span style={{ color: 'var(--accent-blue)' }}>{speed} KM/H</span>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${color}20`, paddingTop: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>REWARD COIN ENGINE</span>
            <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>COINS RETRIEVED: +15 XP</span>
          </div>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)', boxShadow: '0 0 6px var(--accent-blue)', animation: 'pulseText 0.5s infinite' }} />
        </div>
      </div>
    </div>
  );
};

const AQMSim = ({ color }) => {
  const [aqiVal, setAqiVal] = useState(84);
  const [pm25, setPm25] = useState(32);
  const [co2, setCo2] = useState(415);
  const [wifiSignal, setWifiSignal] = useState(-62);
  const [graphPoints, setGraphPoints] = useState([40, 45, 38, 52, 60, 48, 55, 62, 50, 58, 64, 52]);

  useEffect(() => {
    const timer = setInterval(() => {
      const deltaAqi = Math.floor(Math.random() * 7) - 3;
      setAqiVal((prev) => Math.max(60, Math.min(180, prev + deltaAqi)));
      setPm25((prev) => Math.max(15, Math.min(90, Math.floor(prev + deltaAqi * 0.4))));
      setCo2((prev) => Math.max(380, Math.min(500, prev + Math.floor(Math.random() * 9) - 4)));
      setWifiSignal((prev) => Math.max(-80, Math.min(-50, prev + Math.floor(Math.random() * 5) - 2)));
      
      setGraphPoints((prev) => {
        const next = [...prev.slice(1)];
        next.push(Math.max(20, Math.min(90, next[next.length - 1] + Math.floor(Math.random() * 15) - 7)));
        return next;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const needleAngle = -90 + ((aqiVal - 50) / 150) * 180;

  return (
    <div style={{ position: 'relative', width: '100%', height: '150px', border: `1px solid ${color}35`, background: 'rgba(0,0,0,0.6)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', padding: '12px', boxSizing: 'border-box' }}>
      {/* Left side: Circular glowing AQI gauge dial */}
      <div style={{ position: 'relative', border: `1px solid ${color}20`, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="85" height="70" viewBox="0 0 100 80">
          <path d="M 15,70 A 35,35 0 0,1 85,70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round" />
          <path d="M 15,70 A 35,35 0 0,1 85,70" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray="110" strokeDashoffset={110 - ((aqiVal - 50) / 150) * 110} style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
          
          <g style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '50px 70px', transition: 'transform 0.5s ease-out' }}>
            <line x1="50" y1="70" x2="50" y2="35" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="70" r="4" fill="#fff" />
          </g>
        </svg>
        <div style={{ position: 'absolute', bottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-mono)' }}>
          <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>AQI_INDEX</span>
          <span style={{ fontSize: '0.85rem', color: aqiVal > 100 ? 'var(--accent-pink)' : 'var(--accent-blue)', fontWeight: 'bold' }}>{aqiVal}</span>
        </div>
      </div>

      {/* Right side: Gas parameters readout and scrolling plot */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.62rem' }}>
          <div>
            <div style={{ color: color, fontWeight: 'bold', fontSize: '0.72rem', marginBottom: '4px' }}>[ESP8266_GAS_NODE]</div>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2px', marginBottom: '2px' }}>
              CO2: <span style={{ color: '#fff', fontWeight: 'bold' }}>{co2} ppm</span>
            </div>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2px', marginBottom: '2px' }}>
              PM2.5: <span style={{ color: pm25 > 50 ? 'var(--accent-pink)' : 'var(--accent-blue)' }}>{pm25} µg/m³</span>
            </div>
            <div>
              WIFI: <span style={{ color: '#fff' }}>{wifiSignal} dBm</span>
            </div>
          </div>
          
          <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '3px' }}>
            NODE_SSID: AQM_NODE_04<br />
            STATUS: BROADCASTING
          </div>
        </div>

        <div style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px' }}>
          <span style={{ fontSize: '0.5rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>STREAM_INTEGRITY: 94%</span>
          
          <svg width="100%" height="80%" viewBox="0 0 100 50" style={{ overflow: 'visible' }}>
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              points={graphPoints.map((p, i) => `${(i / (graphPoints.length - 1)) * 100},${50 - (p / 100) * 45}`).join(' ')}
              style={{ transition: 'all 0.5s ease' }}
            />
            <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>
          
          <span style={{ alignSelf: 'flex-end', fontSize: '0.48rem', fontFamily: 'var(--font-mono)', color: color }}>LIVE_SPECTROGRAPH</span>
        </div>
      </div>
    </div>
  );
};

const SpiderRobotSim = ({ color }) => {
  const [battery, setBattery] = useState(11.8);
  const [gaitStep, setGaitStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBattery((prev) => Math.max(10.8, Math.min(12.6, prev + (Math.random() * 0.04 - 0.02))));
      setGaitStep((prev) => (prev + 1) % 8);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const getLegAngles = (legIndex) => {
    const isPhaseA = (gaitStep % 4) < 2;
    const isLeftDiag = legIndex === 0 || legIndex === 3;
    const isActive = isLeftDiag ? isPhaseA : !isPhaseA;
    return {
      hip: isActive ? 22 : -18,
      knee: isActive ? 45 : 35
    };
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '150px', border: `1px solid ${color}35`, background: 'rgba(0,0,0,0.6)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.2fr 1.1fr', gap: '15px', padding: '12px', boxSizing: 'border-box' }}>
      {/* Left side: Wireframe mechanical diagram */}
      <div style={{ position: 'relative', border: `1px solid ${color}20`, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '90px', height: '90px', border: `1px dashed ${color}15`, borderRadius: '50%', animation: 'spinRadar 15s linear infinite' }} />
        
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'relative', zIndex: 2 }}>
          <rect x="36" y="36" width="28" height="28" rx="6" fill="rgba(0,0,0,0.6)" stroke={color} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="3" fill={color} />
          
          {(() => {
            const angles = getLegAngles(0);
            return (
              <g style={{ transform: `translate(36px, 38px) rotate(${135 + angles.hip}deg)`, transformOrigin: '0 0', transition: 'all 0.3s ease' }}>
                <line x1="0" y1="0" x2="16" y2="0" stroke={color} strokeWidth="2.5" />
                <line x1="16" y1="0" x2="30" y2={`${angles.knee - 40}px`} stroke={color} strokeWidth="1.5" />
                <circle cx="30" cy={`${angles.knee - 40}px`} r="2" fill="#fff" />
              </g>
            );
          })()}

          {(() => {
            const angles = getLegAngles(1);
            return (
              <g style={{ transform: `translate(64px, 38px) rotate(${45 + angles.hip}deg)`, transformOrigin: '0 0', transition: 'all 0.3s ease' }}>
                <line x1="0" y1="0" x2="16" y2="0" stroke={color} strokeWidth="2.5" />
                <line x1="16" y1="0" x2="30" y2={`${-angles.knee + 40}px`} stroke={color} strokeWidth="1.5" />
                <circle cx="30" cy={`${-angles.knee + 40}px`} r="2" fill="#fff" />
              </g>
            );
          })()}

          {(() => {
            const angles = getLegAngles(2);
            return (
              <g style={{ transform: `translate(36px, 62px) rotate(${-135 + angles.hip}deg)`, transformOrigin: '0 0', transition: 'all 0.3s ease' }}>
                <line x1="0" y1="0" x2="16" y2="0" stroke={color} strokeWidth="2.5" />
                <line x1="16" y1="0" x2="30" y2={`${angles.knee - 40}px`} stroke={color} strokeWidth="1.5" />
                <circle cx="30" cy={`${angles.knee - 40}px`} r="2" fill="#fff" />
              </g>
            );
          })()}

          {(() => {
            const angles = getLegAngles(3);
            return (
              <g style={{ transform: `translate(64px, 62px) rotate(${-45 + angles.hip}deg)`, transformOrigin: '0 0', transition: 'all 0.3s ease' }}>
                <line x1="0" y1="0" x2="16" y2="0" stroke={color} strokeWidth="2.5" />
                <line x1="16" y1="0" x2="30" y2={`${-angles.knee + 40}px`} stroke={color} strokeWidth="1.5" />
                <circle cx="30" cy={`${-angles.knee + 40}px`} r="2" fill="#fff" />
              </g>
            );
          })()}
        </svg>
        <span style={{ position: 'absolute', bottom: '3px', left: '4px', fontSize: '0.48rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>BIOMIMETIC_DIAG</span>
      </div>

      {/* Right side: 12 Servo calibration data matrix */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.62rem' }}>
        <div>
          <div style={{ color: color, fontWeight: 'bold', fontSize: '0.72rem', marginBottom: '5px' }}>[12_SERVO_GAIT_MATRIX]</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
            <div>LF_HIP: <span style={{ color: color }}>{getLegAngles(0).hip}°</span></div>
            <div>RF_HIP: <span style={{ color: color }}>{getLegAngles(1).hip}°</span></div>
            <div>LR_HIP: <span style={{ color: color }}>{getLegAngles(2).hip}°</span></div>
            <div>RR_HIP: <span style={{ color: color }}>{getLegAngles(3).hip}°</span></div>
            <div>LF_KNE: <span style={{ color: 'var(--accent-blue)' }}>{getLegAngles(0).knee}°</span></div>
            <div>RF_KNE: <span style={{ color: 'var(--accent-blue)' }}>{getLegAngles(1).knee}°</span></div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${color}20`, paddingTop: '4px', fontSize: '0.55rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div>GAIT: TROT_COORDINATED</div>
          <div>BATTERY: <span style={{ color: battery < 11.2 ? 'var(--accent-pink)' : 'var(--accent-blue)' }}>{battery.toFixed(2)}V</span></div>
          <div>IMU_ROLL: -1.2° // PITCH: 0.8°</div>
        </div>
      </div>
    </div>
  );
};

const ObstacleSim = ({ color }) => {
  const [distance, setDistance] = useState(48);
  const [sweepAngle, setSweepAngle] = useState(0);
  const [isBypassing, setIsBypassing] = useState(false);
  const [obstacles, setObstacles] = useState([
    { angle: 30, dist: 25, active: false },
    { angle: -45, dist: 15, active: false }
  ]);

  // Sonic sonar sweep simulation
  useEffect(() => {
    let direction = 1;
    const sweepInterval = setInterval(() => {
      setSweepAngle((prev) => {
        let next = prev + 5 * direction;
        if (next >= 75) {
          direction = -1;
          next = 75;
        } else if (next <= -75) {
          direction = 1;
          next = -75;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(sweepInterval);
  }, []);

  // Distance fluctuations and collision evasion controller
  useEffect(() => {
    const timer = setInterval(() => {
      setDistance((prev) => {
        if (prev <= 12) {
          setIsBypassing(true);
          return 55; // Reset after dodge
        }
        if (isBypassing) {
          setTimeout(() => setIsBypassing(false), 800);
        }
        return prev - Math.floor(Math.random() * 5) - 2;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [isBypassing]);

  const isAlert = distance < 20;

  return (
    <div style={{ position: 'relative', width: '100%', height: '150px', border: `1px solid ${color}35`, background: 'rgba(0,0,0,0.6)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '130px 1fr', gap: '15px', padding: '12px', boxSizing: 'border-box' }}>
      {/* Left side: Sweeping Sonar Scope */}
      <div style={{ position: 'relative', border: `1px solid ${color}20`, background: 'rgba(0,0,0,0.4)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '100px', height: '100px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '60px', height: '60px', border: '1px dashed rgba(255,255,255,0.03)', borderRadius: '50%' }} />
        
        <svg width="110" height="110" viewBox="0 0 100 100">
          <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          
          <g style={{ transform: `rotate(${sweepAngle}deg)`, transformOrigin: '50px 50px' }}>
            <line x1="50" y1="50" x2="50" y2="10" stroke={isAlert ? 'var(--accent-pink)' : color} strokeWidth="1.5" />
            <polygon points="50,50 45,10 50,10" fill={`url(#sweep-grad-${color.replace('#','')})`} style={{ opacity: 0.3 }} />
          </g>

          {obstacles.map((obs, idx) => {
            const angleDiff = Math.abs(sweepAngle - obs.angle);
            const isDetected = angleDiff < 10;
            const rx = 50 + Math.sin((obs.angle * Math.PI) / 180) * obs.dist;
            const ry = 50 - Math.cos((obs.angle * Math.PI) / 180) * obs.dist;
            return (
              <circle
                key={idx}
                cx={rx}
                cy={ry}
                r={isDetected ? 3 : 2}
                fill={isDetected ? 'var(--accent-pink)' : 'rgba(255,255,255,0.1)'}
                style={{
                  transition: 'fill 0.1s, r 0.1s'
                }}
              />
            );
          })}

          <circle cx="50" cy="50" r="3" fill="#fff" />
          
          <defs>
            <linearGradient id={`sweep-grad-${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="100%" stopColor={color} stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
        <span style={{ position: 'absolute', bottom: '3px', right: '4px', fontSize: '0.45rem', fontFamily: 'var(--font-mono)', color: color }}>HC-SR04_RADAR</span>
      </div>

      {/* Right side: Telemetry & Collision alerts */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.62rem' }}>
        <div>
          <div style={{ color: color, fontWeight: 'bold', fontSize: '0.72rem', marginBottom: '4px' }}>[COLLISION_AVOIDANCE_OS]</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>SONAR_RANGE:</span> <span style={{ color: isAlert ? 'var(--accent-pink)' : '#fff', fontWeight: 'bold' }}>{distance} cm</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>SWEEP_SECTOR:</span> <span style={{ color: '#fff' }}>{sweepAngle > 0 ? `RIGHT_${sweepAngle}°` : `LEFT_${Math.abs(sweepAngle)}°`}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>STEERING:</span> 
            <span style={{ color: isAlert ? 'var(--accent-pink)' : 'var(--accent-blue)', fontWeight: 'bold' }}>
              {isBypassing ? 'EVASION_YAW_LOCK' : 'FORWARD_CRUISE'}
            </span>
          </div>
        </div>

        <div style={{
          background: isAlert ? 'rgba(255,0,85,0.15)' : 'rgba(0,0,0,0.3)',
          border: `1px solid ${isAlert ? 'var(--accent-pink)' : 'rgba(255,255,255,0.05)'}`,
          padding: '5px',
          textAlign: 'center',
          color: isAlert ? 'var(--accent-pink)' : 'var(--text-muted)',
          fontWeight: isAlert ? 'bold' : 'normal',
          animation: isAlert ? 'pulseText 0.5s infinite' : 'none'
        }}>
          {isAlert ? '⚠ COLLISION_DETECTION: RE-ROUTING' : '✓ SONAR_PATH_CLEAR'}
        </div>
      </div>
    </div>
  );
};

const FaceSim = ({ color }) => {
  const [matchProb, setMatchProb] = useState(91.8);
  const [yaw, setYaw] = useState(0.0);
  const [scanStep, setScanStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMatchProb((prev) => Math.max(89.5, Math.min(99.4, prev + (Math.random() * 0.8 - 0.4))));
      setYaw((prev) => Math.max(-5.0, Math.min(5.0, prev + (Math.random() * 2.0 - 1.0))));
      setScanStep((prev) => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '150px', border: `1px solid ${color}35`, background: 'rgba(0,0,0,0.6)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '130px 1fr', gap: '15px', padding: '12px', boxSizing: 'border-box' }}>
      {/* Left side: Vector Face mesh and sweep */}
      <div style={{ position: 'relative', border: `1px solid ${color}20`, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <svg width="85" height="85" viewBox="0 0 60 60" style={{ fill: 'none', stroke: color, strokeWidth: 1 }}>
          <path d="M30 8 C18 8 15 18 15 30 C15 42 20 50 30 54 C40 54 45 42 45 30 C45 18 42 8 30 8 Z" strokeDasharray="2,2" />
          <path d="M 30,8 L 30,54 M 15,30 Q 30,32 45,30 M 17,20 L 43,20 M 20,40 L 40,40" stroke={`${color}30`} strokeWidth="0.5" />
          
          <circle cx="23" cy="22" r="3.5" stroke={color} strokeWidth="1" />
          <circle cx="23" cy="22" r="1" fill="#fff" />
          
          <circle cx="37" cy="22" r="3.5" stroke={color} strokeWidth="1" />
          <circle cx="37" cy="22" r="1" fill="#fff" />
          
          <polyline points="28,26 30,32 32,32" stroke={color} strokeWidth="1.2" />
          <path d="M24,42 Q30,46 36,42" stroke={color} strokeWidth="1.2" />
          <path d="M24,42 Q30,38 36,42" stroke={`${color}50`} strokeWidth="0.8" />

          <circle cx="30" cy="8" r="1.5" fill="#fff" />
          <circle cx="15" cy="30" r="1.5" fill={color} />
          <circle cx="45" cy="30" r="1.5" fill={color} />
          <circle cx="30" cy="54" r="1.5" fill="#fff" />
          <circle cx="30" cy="32" r="1.5" fill="var(--accent-blue)" />
          <circle cx="24" cy="42" r="1" fill={color} />
          <circle cx="36" cy="42" r="1" fill={color} />
        </svg>

        <div style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          border: `1.5px solid ${color}`,
          borderRadius: '2px',
          animation: 'faceFocus 2.5s ease-in-out infinite'
        }}>
          <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '5px', height: '5px', borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
          <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '5px', height: '5px', borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '5px', height: '5px', borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '5px', height: '5px', borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
        </div>

        <div style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: color, boxShadow: `0 0 10px ${color}`, animation: 'sweepVertical 2.2s linear infinite' }} />
      </div>

      {/* Right side: Facial recognition metrics logs */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.62rem' }}>
        <div>
          <div style={{ color: color, fontWeight: 'bold', fontSize: '0.72rem', marginBottom: '4px' }}>[BIOMETRIC_LOGGER_CV]</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>IDENTITY:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>DEVANSH TRIVEDI</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '3px' }}>
            <span>MATCH_CONF:</span> <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{matchProb.toFixed(2)}%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>EULER_YAW:</span> <span style={{ color: '#fff' }}>{yaw.toFixed(2)}°</span>
          </div>
        </div>

        <div style={{
          background: 'rgba(0,255,102,0.1)',
          border: '1px solid var(--accent-blue)',
          padding: '5px',
          textAlign: 'center',
          color: 'var(--accent-blue)',
          fontWeight: 'bold',
          letterSpacing: '1px',
          boxShadow: '0 0 8px rgba(0,255,102,0.15)',
          animation: 'pulseText 1.5s infinite'
        }}>
          ● VERIFIED: ACCESS_GRANTED
        </div>
      </div>
    </div>
  );
};

const ProjectsDatabase = () => {
  const [activeChip, setActiveChip] = useState(0); // Default to the first project
  const [isScanning, setIsScanning] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const projects = [
    {
      id: 'NODE_01',
      title: 'CONVERSATIONAL IMAGE BOT',
      subtitle: 'Multimodal Deep Learning Chatbot',
      description: 'A deep-learning application implementing VisionTransformer-GPT2 and multimodal learning for image-based query responses. Built using PyTorch, Hugging Face Transformers, Pillow, and deployed with a Gradio interface.',
      tags: ['Python', 'PyTorch', 'Transformers', 'Gradio', 'Pillow'],
      size: '342.5 MB',
      integrity: '96% SECURE',
      category: 'AI & ML',
      color: '#EE4C2C', // PyTorch Brand Orange
      simulation: ImageBotSim,
      metrics: {
        complexity: 'HIGH',
        dataset: '50k+ Image-Text pairs',
        hardwareReq: 'NVIDIA CUDA GPU'
      },
      source: 'https://github.com/devanshtrivedi-bit',
      live: 'https://github.com/devanshtrivedi-bit'
    },
    {
      id: 'NODE_02',
      title: 'NEXTSTOP TRANSIT PLATFORM',
      subtitle: 'Real-Time Bus Tracking & Routing',
      description: 'A live public transportation tracking platform designed to modernize public transit in Tier-2 cities like Agra. Features real-time bus tracking on interactive Leaflet maps, dynamic routing via OSRM, Firebase auth, a coin reward system, and full bilingual support (Hindi/English).',
      tags: ['React 19', 'Firebase', 'Leaflet.js', 'Tailwind CSS', 'OSRM API'],
      size: '28.4 MB',
      integrity: '99% STABLE',
      category: 'Full-Stack Web',
      color: '#61DAFB', // React Brand Cyan
      simulation: TransitSim,
      metrics: {
        complexity: 'MODERATE',
        apiLatency: '45ms (OSRM)',
        database: 'Firebase Firestore'
      },
      source: 'https://github.com/devanshtrivedi-bit',
      live: 'https://github.com/devanshtrivedi-bit'
    },
    {
      id: 'NODE_03',
      title: 'AIR QUALITY MONITOR (AQM)',
      subtitle: 'IoT Sensor Node & AQI Analyzer',
      description: 'An internet-of-things (IoT) environmental sensor node built using ESP8266 Wi-Fi module, gas sensors, and Arduino. Provides real-time air quality monitoring, AQI computations, and data streaming to dashboard nodes.',
      tags: ['IoT', 'ESP8266', 'Arduino', 'Gas Sensors', 'C++'],
      size: '4.2 MB',
      integrity: '94% ACTIVE',
      category: 'Robotics & IoT',
      color: '#00979D', // Arduino Brand Teal
      simulation: AQMSim,
      metrics: {
        complexity: 'LOW-MID',
        sensorRate: '1 reading/sec',
        mcu: 'ESP8266 NodeMCU'
      },
      source: 'https://github.com/devanshtrivedi-bit',
      live: 'https://github.com/devanshtrivedi-bit'
    },
    {
      id: 'NODE_04',
      title: 'QUADRUPED SPIDER ROBOT',
      subtitle: 'Biomimetic 4-Legged Servo Robot',
      description: 'A four-legged biomimetic robot engineered using Arduino Uno, 12 servo motors, and autonomous navigation algorithms. Features sensor integration for terrain scanning and dynamic gait coordination.',
      tags: ['Arduino Uno', 'Robotics', 'Servo Control', 'C++'],
      size: '8.1 MB',
      integrity: '92% ACTIVE',
      category: 'Robotics & IoT',
      color: '#FF0055', // Cyber Red/Pink
      simulation: SpiderRobotSim,
      metrics: {
        complexity: 'HIGH',
        dof: '12 Degrees of Freedom',
        servos: '12x TowerPro SG90'
      },
      source: 'https://github.com/devanshtrivedi-bit',
      live: 'https://github.com/devanshtrivedi-bit'
    },
    {
      id: 'NODE_05',
      title: 'OBSTACLE AVOIDANCE SYSTEM',
      subtitle: 'Autonomous Navigating Robot',
      description: 'An autonomous wheeled robot utilizing Arduino UNO, HC-SR04 ultrasonic sensor, servo motors, and L293D motor shield. Implements obstacle avoidance algorithms achieving 99% collision bypass accuracy.',
      tags: ['Arduino Uno', 'Ultrasonic HC-SR04', 'L293D Shield', 'Robotics'],
      size: '6.7 MB',
      integrity: '98% VERIFIED',
      category: 'Robotics & IoT',
      color: '#00F0FF', // Sonar Cyan/Blue
      simulation: ObstacleSim,
      metrics: {
        complexity: 'LOW-MID',
        accuracy: '99% Collision Avoidance',
        chassis: '4-Wheel Smart Drive'
      },
      source: 'https://github.com/devanshtrivedi-bit',
      live: 'https://github.com/devanshtrivedi-bit'
    },
    {
      id: 'NODE_06',
      title: 'BIOMETRIC FACE ATTENDANCE',
      subtitle: 'Computer Vision Attendance System',
      description: 'A smart attendance logging system built using Python, OpenCV, and Tkinter GUI. Trained on a dataset of 500+ images, utilizing facial feature descriptors to achieve a 90%+ recognition accuracy rate under variable lighting conditions.',
      tags: ['Python', 'OpenCV', 'Tkinter', 'Haar Cascades'],
      size: '45.3 MB',
      integrity: '90% VERIFIED',
      category: 'AI & ML',
      color: '#A020F0', // OpenCV Purple
      simulation: FaceSim,
      metrics: {
        complexity: 'MID-HIGH',
        trainingImages: '500+ Face Vectors',
        accuracy: '90%+ Match Rate'
      },
      source: 'https://github.com/devanshtrivedi-bit',
      live: 'https://github.com/devanshtrivedi-bit'
    }
  ];

  // Trigger scanning laser and simulated decryption loader
  useEffect(() => {
    setIsScanning(true);
    setIsDecrypting(true);
    
    const scanTimer = setTimeout(() => {
      setIsScanning(false);
    }, 600);

    const decryptTimer = setTimeout(() => {
      setIsDecrypting(false);
    }, 450);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(decryptTimer);
    };
  }, [activeChip]);

  const activeColor = projects[activeChip].color;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ paddingBottom: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-game)', fontSize: '2rem', letterSpacing: '0.5px', fontWeight: '300', color: '#fff' }}>
            Projects Portfolio
          </h2>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '5px' }}>
            Featured Work & Case Studies
          </div>
        </div>
      </div>

      <div className="projects-grid-container" style={{ display: 'grid', gridTemplateColumns: '38% 1fr', gap: '25px' }}>
        {/* Left column - Project Directory List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '570px', overflowY: 'auto', paddingRight: '5px' }} className="projects-sidebar-list">
          {projects.map((project, index) => {
            const isSelected = activeChip === index;
            return (
              <div
                key={project.id}
                className="glass-panel projects-list-item"
                style={{
                  padding: '15px',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                  borderColor: isSelected ? project.color : 'rgba(255, 255, 255, 0.05)',
                  boxShadow: isSelected ? `0 0 15px ${project.color}30` : 'none',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  position: 'relative',
                  animation: `listSlideIn 0.5s ease-out forwards ${index * 0.08}s`,
                  opacity: 0,
                  transform: 'translateX(-20px)',
                  '--hover-glow': project.color
                }}
                onClick={() => setActiveChip(index)}
              >
                {/* Left active color tab bar indicator */}
                {isSelected && (
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
                    backgroundColor: project.color, boxShadow: `0 0 10px ${project.color}`
                  }} />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: isSelected ? project.color : 'var(--text-muted)', border: `1px solid ${isSelected ? project.color : 'rgba(255, 255, 255, 0.1)'}`, padding: '1px 5px', background: isSelected ? `${project.color}15` : 'transparent', borderRadius: '3px' }}>
                    {project.id}
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {project.category}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 3px', fontSize: '0.95rem', letterSpacing: '0.5px', fontFamily: 'var(--font-cyber)', fontWeight: 'bold', color: isSelected ? project.color : 'var(--text-main)', transition: 'color 0.2s' }}>
                  {project.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {project.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right column - Decryption HUD detailed view */}
        <div className="glass-panel " style={{ padding: '25px', background: 'rgba(255, 255, 255, 0.02)', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '480px', position: 'relative', borderColor: activeColor, boxShadow: `0 0 15px ${activeColor}30`, transition: 'all 0.3s ease' }}>
          
          {/* Scanning Line overlay */}
          {isScanning && (
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '2.5px',
              background: activeColor, boxShadow: `0 0 15px ${activeColor}`,
              animation: 'scanLineMove 0.6s linear infinite', zIndex: 10
            }} />
          )}

          {/* Header */}
          <div style={{ borderBottom: `1px solid ${activeColor}35`, paddingBottom: '15px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: activeColor }}>
                <Activity size={14} /> PROJECT DETAILS // {projects[activeChip].id}
              </div>
              <h3 style={{ margin: '4px 0 0', fontFamily: 'var(--font-cyber)', fontSize: '1.6rem', color: activeColor, fontWeight: 'bold', letterSpacing: '1px' }}>
                {projects[activeChip].title}
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                {projects[activeChip].subtitle}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <a href={projects[activeChip].source} target="_blank" rel="noopener noreferrer" className="game-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px', fontSize: '0.75rem', color: activeColor, borderColor: `${activeColor}50` }}>
                <GitBranch size={13} /> SOURCE
              </a>
              <a href={projects[activeChip].live} target="_blank" rel="noopener noreferrer" className="game-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px', fontSize: '0.75rem', color: activeColor, borderColor: `${activeColor}50` }}>
                <ExternalLink size={13} /> LAUNCH
              </a>
            </div>
          </div>

          {/* Body content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
            
            {/* Description or Simulated Decrypter */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                <Terminal size={14} /> SYSTEM_DESCRIPTION_LOG
              </div>
              
              <div style={{ minHeight: '110px' }}>
                {isDecrypting ? (
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    color: activeColor,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '0.85rem',
                    background: `${activeColor}03`,
                    padding: '15px',
                    border: `1px dashed ${activeColor}30`
                  }}>
                    <div className="text-glow" data-text=">> SYNAPSE UPLINK INITIATING..." style={{ textShadow: `0 0 4px ${activeColor}` }}>&gt;&gt; SYNAPSE UPLINK INITIATING...</div>
                    <div>&gt;&gt; DIRECTORY SECTOR: {projects[activeChip].id}</div>
                    <div style={{ animation: 'pulseText 0.5s infinite' }}>&gt;&gt; SECURE HANDSHAKE: [██████████████░░░░░░] 70%</div>
                  </div>
                ) : (
                  <p style={{
                    margin: 0,
                    fontFamily: 'var(--font-cyber)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    background: `${activeColor}03`,
                    padding: '15px',
                    border: `1px solid ${activeColor}15`,
                    borderRadius: '4px',
                    animation: 'fadeInText 0.3s ease-out forwards'
                  }}>
                    {projects[activeChip].description}
                  </p>
                )}
              </div>
            </div>

            {/* Custom Visual Simulation Component */}
            {!isDecrypting && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  <Activity size={14} /> TELEMETRY_SIMULATOR_CORE
                </div>
                {(() => {
                  const SimulationComponent = projects[activeChip].simulation;
                  return <SimulationComponent key={projects[activeChip].id} color={activeColor} />;
                })()}
              </div>
            )}

            {/* Technical Specifications & Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="projects-detail-grid">
              
              {/* Left pane of Specs - Technology stack */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  <Cpu size={14} /> COMPILE_TIME_LIBRARIES
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {projects[activeChip].tags.map((tag, tIndex) => (
                    <span 
                      key={tIndex} 
                      style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.75rem', 
                        color: activeColor, 
                        border: `1px solid ${activeColor}40`, 
                        background: `${activeColor}08`, 
                        padding: '3px 8px',
                        animation: `specTagScale 0.4s ease-out forwards ${tIndex * 0.05}s`,
                        opacity: 0,
                        transform: 'scale(0.8)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right pane of Specs - Diagnostics info & Waveform */}
              <div style={{ borderLeft: `1px solid ${activeColor}20`, paddingLeft: '20px' }} className="projects-detail-specs-right">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  <Database size={14} /> METRICS_INTELLIGENCE
                </div>
                <ul style={{ margin: 0, paddingLeft: '15px', fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)' }}>
                  {Object.entries(projects[activeChip].metrics).map(([key, value]) => (
                    <li key={key}>
                      <span style={{ color: 'var(--text-muted)' }}>{key.replace(/([A-Z])/g, ' $1')}:</span> <span style={{ color: activeColor }}>{value}</span>
                    </li>
                  ))}
                  <li>
                    <span style={{ color: 'var(--text-muted)' }}>Memory Footprint:</span> <span style={{ color: activeColor }}>{projects[activeChip].size}</span>
                  </li>
                  <li>
                    <span style={{ color: 'var(--text-muted)' }}>Signal Integrity:</span> <span style={{ color: activeColor, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={12} /> {projects[activeChip].integrity}</span>
                  </li>
                </ul>

                {/* Live Oscillating Waveform Grid */}
                <div style={{ marginTop: '15px', border: `1px solid ${activeColor}25`, padding: '8px', background: 'rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden', height: '46px' }}>
                  <div style={{ position: 'absolute', top: '1px', left: '5px', fontSize: '0.5rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    ROUTE_VECTOR_STREAM: ACTIVE
                  </div>
                  <svg width="100%" height="100%" viewBox="0 0 300 40" style={{ marginTop: '5px' }}>
                    <path
                      d="M0 20 Q 30 5, 60 20 T 120 20 T 180 20 T 240 20 T 300 20"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="1.5"
                      style={{
                        strokeDasharray: '600',
                        strokeDashoffset: '0',
                        animation: 'waveMove 3s linear infinite',
                        opacity: 0.7
                      }}
                    />
                    <path
                      d="M0 20 Q 35 35, 70 20 T 140 20 T 210 20 T 280 20 T 350 20"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="1"
                      style={{
                        strokeDasharray: '600',
                        strokeDashoffset: '0',
                        animation: 'waveMove 5s linear infinite',
                        opacity: 0.35
                      }}
                    />
                  </svg>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Embedded keyframes stylesheet */}
      <style>{`
        @keyframes scanLineMove {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes listSlideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulseText {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes fadeInText {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes specTagScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes waveMove {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
        
        /* Custom Keyframes for Project Simulations */
        @keyframes sweepVertical {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes busMapDrive {
          0% { left: 5%; transform: scaleX(1); }
          45% { left: 88%; transform: scaleX(1); }
          50% { left: 88%; transform: scaleX(-1); }
          95% { left: 5%; transform: scaleX(-1); }
          100% { left: 5%; transform: scaleX(1); }
        }
        @keyframes moveBus {
          0% { left: 0%; }
          50% { left: 90%; }
          100% { left: 0%; }
        }
        @keyframes gaugeNeedle {
          0%, 100% { transform: rotate(-60deg); }
          50% { transform: rotate(60deg); }
        }
        @keyframes spiderLegWalkLeft {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes spiderLegWalkRight {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes legStep {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes spinRadar {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes faceFocus {
          0%, 100% { transform: scale(0.95); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes graphShift {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }

        /* Custom side list hover slide pushing with dynamic color variables */
        .projects-list-item:hover {
          transform: translateX(6px) !important;
          border-color: var(--hover-glow) !important;
          box-shadow: 0 0 12px var(--hover-glow) !important;
        }

        @media (max-width: 900px) {
          .projects-grid-container {
            grid-template-columns: 1fr !important;
          }
          .projects-sidebar-list {
            max-height: 250px !important;
          }
          .projects-detail-specs-right {
            border-left: none !important;
            padding-left: 0 !important;
            margin-top: 10px;
          }
          .projects-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsDatabase;
