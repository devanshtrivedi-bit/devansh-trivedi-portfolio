import React, { useState } from 'react';
import { Send, Terminal, Shield, CheckCircle, Code, Users, MessageSquare, Mail, ExternalLink } from 'lucide-react';

const ContactLink = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success
  const [logMessages, setLogMessages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addLogMessage = (msg, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLogMessages((prev) => [...prev, msg]);
        resolve();
      }, delay);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setLogMessages([]);

    await addLogMessage('>> Accessing neural uplink gateway...', 200);
    await addLogMessage('>> Packaging payload bytes...', 400);
    await addLogMessage('>> Encrypting transmission package (SHA-512)...', 600);
    await addLogMessage('>> Bypassing proxy nodes...', 500);
    await addLogMessage('>> Opening mail client protocol...', 400);
    await addLogMessage('>> TRANSMISSION HANDOFF COMPLETED.', 400);

    // After animation, open mailto link
    setTimeout(() => {
      const mailtoLink = `mailto:devanshtrivedidei@gmail.com?subject=Contact from Portfolio (via ${formData.name})&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
      window.location.href = mailtoLink;
      setStatus('success');
    }, 500);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
    setLogMessages([]);
  };

  const socialLinks = [
    { icon: <Code size={20} />, name: 'GitHub', url: 'https://github.com/devanshtrivedi-bit', color: '#ffffff' },
    { icon: <Users size={20} />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/devansh-trivedi-01b024356', color: '#0077b5' },
    { icon: <Mail size={20} />, name: 'Direct Email', url: 'mailto:devanshtrivedidei@gmail.com', color: '#ea4335' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Title */}
      <div style={{ paddingBottom: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-game)', fontSize: '2rem', letterSpacing: '0.5px', fontWeight: '300', color: '#fff' }}>
            Contact & Networking
          </h2>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '5px' }}>
            Get in touch for collaborations
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        
        {/* Social Links Panel */}
        <div className="glass-panel animate-float" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'var(--font-game)', letterSpacing: '1px' }}>DIRECT COMMS</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
            Establish a direct connection outside the secure terminal. Choose your preferred communication protocol.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="game-button"
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '15px 20px', textDecoration: 'none',
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ color: social.color }}>{social.icon}</div>
                  <span style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>{social.name}</span>
                </div>
                <ExternalLink size={16} style={{ color: 'var(--text-muted)' }} />
              </a>
            ))}
          </div>
        </div>

        {/* Secure Form panel */}
        <div className="glass-panel animate-float-delayed" style={{ padding: '30px', position: 'relative' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', fontFamily: 'var(--font-game)', letterSpacing: '1px' }}>SECURE TERMINAL</h3>
          
          {status === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', textAlign: 'center', gap: '15px', animation: 'fadeIn 0.5s ease' }}>
              <CheckCircle size={56} style={{ color: 'var(--accent-blue)' }} className="crt-effect" />
              <div>
                <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-game)', color: 'var(--accent-blue)', fontSize: '1.4rem', letterSpacing: '2px' }} className="text-glow">
                  HANDOFF COMPLETE
                </h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Your secure payload has been formatted and pushed to your local mail client for final transmission.
                </p>
              </div>
              <button onClick={handleReset} className="game-button" style={{ marginTop: '20px' }}>
                INITIALIZE NEW PAYLOAD
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  disabled={status === 'sending'}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-main)',
                    outline: 'none',
                    borderRadius: '8px',
                    transition: 'border 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  disabled={status === 'sending'}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-main)',
                    outline: 'none',
                    borderRadius: '8px',
                    transition: 'border 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message..."
                  rows={4}
                  disabled={status === 'sending'}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-main)',
                    outline: 'none',
                    borderRadius: '8px',
                    resize: 'none',
                    transition: 'border 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="game-button"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '10px', marginTop: '10px', width: '100%', padding: '15px'
                }}
              >
                {status === 'sending' ? (
                  <>
                    <Terminal size={18} className="animate-pulse" /> PROCESSING HANDOFF...
                  </>
                ) : (
                  <>
                    <Send size={18} /> TRANSMIT VIA MAIL CLIENT
                  </>
                )}
              </button>
            </form>
          )}

          {/* Status log console for the secure form */}
          {status === 'sending' && (
             <div style={{
                position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px',
                padding: '30px', display: 'flex', flexDirection: 'column', zIndex: 10
             }}>
                <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase' }}>
                    Sending Message...
                  </span>
                  <Mail size={16} style={{ color: '#fff' }} />
                </div>
                <div style={{ flexGrow: 1, fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
                  {logMessages.map((msg, index) => (
                    <div key={index} style={{
                      color: msg.includes('COMPLETED') ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                      fontWeight: msg.includes('COMPLETED') ? '500' : '400'
                    }}>
                      {msg}
                    </div>
                  ))}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactLink;
