'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.evlvpeptides.com';
const TRACKING_KEY = process.env.NEXT_PUBLIC_CRM_TRACKING_KEY || '';
const STORAGE_KEY = 'evlv_chat';
const POLL_INTERVAL = 4000;

interface ChatSession {
  conversationId: string;
  chatToken: string;
}

interface Message {
  id: string;
  direction: 'INBOUND' | 'OUTBOUND';
  body: string;
  createdAt: string;
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firstMsg, setFirstMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const lastSeenAt = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load session from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as ChatSession;
        setSession(s);
      }
    } catch {}
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open]);

  // Poll for new messages
  const poll = useCallback(async (s: ChatSession) => {
    try {
      const params = new URLSearchParams({
        conversationId: s.conversationId,
        chatToken: s.chatToken,
        ...(lastSeenAt.current ? { after: lastSeenAt.current } : {}),
      });
      const res = await fetch(`${CRM_URL}/api/chat/messages?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      const newMsgs: Message[] = data.messages || [];
      if (newMsgs.length > 0) {
        lastSeenAt.current = newMsgs[newMsgs.length - 1].createdAt;
        setMessages((prev) => {
          const ids = new Set(prev.map((m) => m.id));
          const fresh = newMsgs.filter((m) => !ids.has(m.id));
          if (fresh.length === 0) return prev;
          // Count unread staff replies when widget is closed
          const staffReplies = fresh.filter((m) => m.direction === 'OUTBOUND');
          if (!open && staffReplies.length > 0) {
            setUnread((u) => u + staffReplies.length);
          }
          return [...prev, ...fresh];
        });
      }
    } catch {}
  }, [open]);

  useEffect(() => {
    if (!session) return;
    // Load full history on mount
    (async () => {
      try {
        const params = new URLSearchParams({
          conversationId: session.conversationId,
          chatToken: session.chatToken,
        });
        const res = await fetch(`${CRM_URL}/api/chat/messages?${params}`);
        if (res.ok) {
          const data = await res.json();
          const msgs: Message[] = data.messages || [];
          setMessages(msgs);
          if (msgs.length > 0) {
            lastSeenAt.current = msgs[msgs.length - 1].createdAt;
          }
        }
      } catch {}
    })();
    pollRef.current = setInterval(() => poll(session), POLL_INTERVAL);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [session, poll]);

  const handleOpen = () => {
    setOpen(true);
    setUnread(0);
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstMsg.trim()) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(`${CRM_URL}/api/chat/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicKey: TRACKING_KEY,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          message: firstMsg.trim(),
          pageUrl: window.location.href,
        }),
      });
      if (!res.ok) throw new Error('Failed to start chat');
      const data = await res.json();
      const s: ChatSession = { conversationId: data.conversationId, chatToken: data.chatToken };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
      setSession(s);
      setMessages([{ id: 'init', direction: 'INBOUND', body: firstMsg.trim(), createdAt: new Date().toISOString() }]);
      setFirstMsg('');
    } catch {
      setError('Could not connect. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !session) return;
    const body = input.trim();
    setInput('');
    const optimistic: Message = { id: `opt-${Date.now()}`, direction: 'INBOUND', body, createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, optimistic]);
    try {
      const res = await fetch(`${CRM_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: session.conversationId, chatToken: session.chatToken, message: body }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => prev.map((m) => m.id === optimistic.id ? { ...m, id: data.messageId, createdAt: data.createdAt } : m));
        lastSeenAt.current = data.createdAt;
      }
    } catch {}
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          style={{ position: 'fixed', bottom: '80px', right: '16px', width: '320px', maxHeight: '480px', zIndex: 9999,
            display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)', background: '#fff', border: '1px solid #e5e7eb' }}
        >
          {/* Header */}
          <div style={{ background: '#111', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>EVLV Support</div>
              <div style={{ color: '#9ca3af', fontSize: '11px' }}>We usually reply within a few hours</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>
              ×
            </button>
          </div>

          {!session ? (
            // Start chat form
            <form onSubmit={handleStart} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>Got a question? Send us a message.</p>
              <input
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                style={{ fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '7px 10px', outline: 'none' }}
              />
              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for reply (optional)"
                type="email"
                style={{ fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '7px 10px', outline: 'none' }}
              />
              <textarea
                value={firstMsg} onChange={(e) => setFirstMsg(e.target.value)}
                placeholder="How can we help?"
                required
                rows={3}
                style={{ fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '7px 10px', resize: 'none', outline: 'none' }}
              />
              {error && <p style={{ color: '#dc2626', fontSize: '12px', margin: 0 }}>{error}</p>}
              <button
                type="submit" disabled={sending || !firstMsg.trim()}
                style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '6px', padding: '9px', fontSize: '13px', fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.7 : 1 }}
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>
            </form>
          ) : (
            // Active chat
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {messages.map((m) => (
                  <div key={m.id} style={{ display: 'flex', justifyContent: m.direction === 'OUTBOUND' ? 'flex-start' : 'flex-end' }}>
                    <div style={{
                      maxWidth: '80%', padding: '8px 12px', borderRadius: '10px', fontSize: '13px', lineHeight: '1.4',
                      background: m.direction === 'OUTBOUND' ? '#f3f4f6' : '#111',
                      color: m.direction === 'OUTBOUND' ? '#111' : '#fff',
                    }}>
                      {m.body}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px', padding: '10px 12px', borderTop: '1px solid #f3f4f6' }}>
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  style={{ flex: 1, fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '7px 10px', outline: 'none' }}
                />
                <button
                  type="submit" disabled={!input.trim()}
                  style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 12px', fontSize: '13px', cursor: !input.trim() ? 'not-allowed' : 'pointer', opacity: !input.trim() ? 0.5 : 1 }}
                >
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        aria-label="Open live chat"
        style={{
          position: 'fixed', bottom: '16px', right: '16px', width: '52px', height: '52px',
          borderRadius: '50%', background: '#111', border: 'none', cursor: 'pointer', zIndex: 9998,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute', top: '2px', right: '2px', width: '18px', height: '18px',
            borderRadius: '50%', background: '#ef4444', color: '#fff',
            fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
    </>
  );
}
