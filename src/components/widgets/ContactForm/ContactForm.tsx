import { useState } from 'react';
import { ArrowIcon } from '@/components/icons/Icons';

function FInput({
  label,
  type = 'text',
  val,
  set,
  area,
}: {
  label: string;
  type?: string;
  val: string;
  set: (v: string) => void;
  area?: boolean;
}) {
  return (
    <div>
      <label
        className="m"
        style={{
          fontSize: 9,
          color: 'var(--fg-d)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 5,
        }}
      >
        {label}
      </label>
      {area ? (
        <textarea
          value={val}
          onChange={(e) => set(e.target.value)}
          className="field"
          style={{ minHeight: 80 }}
          placeholder="Your message…"
        />
      ) : (
        <input
          type={type}
          value={val}
          onChange={(e) => set(e.target.value)}
          className="field"
          placeholder="…"
        />
      )}
    </div>
  );
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 0',
          gap: 12,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--ac-s)',
            color: 'var(--ac)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          ✓
        </div>
        <div className="d" style={{ fontSize: 18, fontWeight: 500 }}>
          Sent!
        </div>
        <div style={{ fontSize: 13, color: 'var(--fg-m)' }}>I'll reply within 24h.</div>
        <button
          className="btn"
          onClick={() => setSent(false)}
          style={{ marginTop: 4, padding: '8px 16px', fontSize: 12 }}
        >
          Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name && email && msg) setSent(true);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <FInput label="Name" val={name} set={setName} />
      <FInput label="Email" type="email" val={email} set={setEmail} />
      <FInput label="Message" val={msg} set={setMsg} area />
      <button
        type="submit"
        className="btn p"
        style={{ justifyContent: 'center', marginTop: 2 }}
      >
        Send <ArrowIcon size={13} />
      </button>
    </form>
  );
}
