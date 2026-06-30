import React, { useState, useEffect, useRef } from 'react';

const TerminalConsole = ({ onCommandExecuted }) => {
  const [history, setHistory] = useState([
    { text: 'SYSTEM: CORRUPT NET DETECTED. BYPASSING FIREWALLS...', isSystem: true },
    { text: 'Neural Link: CONNECTED [SECURE_IP: 192.0.2.148]', isSystem: true },
    { text: 'Initializing portfolio-os terminal environment v2.5...', isSystem: true },
    { text: 'Type "help" to display list of available decryption protocols.', isSystem: true }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase();
      const currentHistory = [...history, { text: `guest@portfolio-shell:~$ ${input}`, isInput: true }];
      
      let reply = [];

      switch (trimmedInput) {
        case 'help':
          reply = [
            'Available commands in the system database:',
            '  about       - Reveals identity record and biography',
            '  skills      - Discovers technological skill matrix',
            '  projects    - Outputs active software project logs',
            '  credentials - Decrypts education & certification matrix',
            '  contact     - Initiates secure contact portal channels',
            '  hack        - Runs a decryption simulation against local firewall',
            '  clear       - Wipes terminal log buffer cache'
          ];
          break;
        case 'credentials':
          reply = [
            'CREDENTIALS_DATA DECRYPTED',
            '==========================================',
            '🎓 Dayalbagh Educational Institute (B.Voc AI & Robotics, Expected 2027)',
            '🎓 Ch. Beeri Singh Inter College (Class XII Intermediate, March 2024)',
            '🎓 Ch. Beeri Singh Inter College (Class X High School, March 2022)',
            '🎖 Anudip Foundation (AI Fundamentals, 2025)',
            '🎖 My Job Grow (AI Internship, 2025)',
            '🎖 SkillUp (Machine Learning & Generative AI, 2025)'
          ];
          if (onCommandExecuted) onCommandExecuted('credentials');
          break;
        case 'about':
          reply = [
            'LOG_DATA: CORE_PROFILE_DECRYPTED',
            '==========================================',
            'NAME: Devansh Trivedi',
            'ROLE: Aspiring AI & Robotics Developer',
            'STATUS: Student // Dayalbagh Educational Institute (B.Voc AI & Robotics)',
            'TACTICS: Specialized in PyTorch, OpenCV, Transformers, IoT (ESP8266/Arduino), and Full-Stack development.',
            'BIO: I bridge physical hardware with artificial cognition. Designing smart systems, deep learning models, real-time tracking platforms, and autonomous robots to deliver user-focused automation solutions.'
          ];
          if (onCommandExecuted) onCommandExecuted('about');
          break;
        case 'skills':
          reply = [
            'SKILLSET_INDEX DECRYPTED',
            '==========================================',
            '🧠 Cognitive / AI: Python, R, OpenCV, PyTorch, Transformers, Pandas',
            '🤖 Robotics / IoT: Arduino Uno/Nano, ESP8266, Servo Controllers, Sensors',
            '⚡ Web Matrix: React 19, Tailwind CSS, Leaflet.js, OSRM Routing, Firebase',
            '🛠 Dev Tools: VS Code, Google Colab, Git, Gradio, OpenAI / ChatGPT APIs'
          ];
          if (onCommandExecuted) onCommandExecuted('skills');
          break;
        case 'projects':
          reply = [
            'PROJECT_LOGS_DECRYPTED',
            '==========================================',
            '📁 Node 1: Conversational Image Bot (Multimodal AI Chatbot)',
            '📁 Node 2: NextStop Transit Platform (Real-Time Tracker)',
            '📁 Node 3: Air Quality Monitor (IoT Environment Node)',
            '📁 Node 4: Quadruped Spider Robot (Biomimetic 12-Servo Robot)',
            '📁 Node 5: Obstacle Avoidance System (Autonomous Wheeled Robot)',
            '📁 Node 6: Face Recognition Attendance (Biometric CV Tracker)',
            '------------------------------------------',
            'Type "projects" inside HUD navigation menu to open detail datachips.'
          ];
          if (onCommandExecuted) onCommandExecuted('projects');
          break;
        case 'contact':
          reply = [
            'ESTABLISHING CONNECTION CHANNELS...',
            '==========================================',
            '📬 Primary Email : ttrivedidevansh2007@gmail.com',
            '📬 Academic Email: devanshtrivedidei@gmail.com',
            '🐙 Git Uplink    : github.com/devanshtrivedi-bit',
            '🌐 Social Uplink : linkedin.com/in/devansh-trivedi-01b024356',
            '📞 Comm Link     : +91 9045927577',
            '📍 Location      : Agra, India',
            '------------------------------------------',
            'Connection secure. You can also use the contact form below.'
          ];
          if (onCommandExecuted) onCommandExecuted('contact');
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'hack':
          reply = [
            '⚠ WARNING: FIREWALL BREACH DETECTED!',
            'PROGRESS: [████████████████████] 100% SECURE_BYPASS',
            'STATUS: ROOT PRIVILEGES GRANTED. ACCESS CODE: DEVAN_ROOT_99',
            'SYSTEM: Cyberpunk mood activated. Matrix canvas frequency increased.'
          ];
          break;
        case '':
          reply = [];
          break;
        default:
          reply = [
            `Command "${input}" not recognized.`,
            'Type "help" to query valid execution instructions.'
          ];
      }

      const replyItems = reply.map(t => ({ text: t, isSystem: false }));
      setHistory([...currentHistory, ...replyItems]);
      setInput('');
    }
  };

  return (
    <div className="glass-panel " style={{ padding: '20px', minHeight: '350px', display: 'flex', flexDirection: 'column', height: '100%' }} onClick={focusInput}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(0, 255, 102, 0.15)', paddingBottom: '8px', marginBottom: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff0055' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbb00' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00ff66' }}></span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-blue)', letterSpacing: '1px' }}>guest@antigravity-shell:~</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PORT: 8080</span>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '280px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.4', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '5px' }}>
        {history.map((log, index) => (
          <div key={index} style={{
            color: log.isInput ? 'var(--text-main)' : log.isSystem ? 'var(--text-muted)' : 'var(--accent-blue)',
            textShadow: log.isInput ? 'none' : '0 0 3px rgba(0, 255, 102, 0.2)',
            whiteSpace: 'pre-wrap'
          }}>
            {log.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', borderTop: '1px solid rgba(0, 255, 102, 0.1)', paddingTop: '10px', fontFamily: 'var(--font-mono)' }}>
        <span style={{ color: 'var(--accent-blue)', marginRight: '8px' }}>guest@portfolio-shell:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          style={{
            flexGrow: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            caretColor: 'var(--accent-blue)'
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default TerminalConsole;
