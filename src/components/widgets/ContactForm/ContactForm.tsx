import { useState } from 'react';
import { ArrowIcon } from '@/components/icons/Icons';
import { FormField } from '@/components/ui/FormField/FormField';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        className="view-fade"
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
        <div className="d" style={{ fontSize: 'var(--fs-17)', fontWeight: 500 }}>
          Sent!
        </div>
        <div style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-m)' }}>
          I'll reply within 24h.
        </div>
        <button
          className="btn"
          onClick={() => setSent(false)}
          style={{ marginTop: 4, padding: '8px 16px', fontSize: 'var(--fs-12)' }}
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
        setSent(true);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <FormField label="Name" value={name} onChange={setName} required />
      <FormField label="Email" type="email" value={email} onChange={setEmail} required />
      <FormField
        label="Message"
        value={msg}
        onChange={setMsg}
        area
        placeholder="Your message…"
        required
      />
      <button type="submit" className="btn p" style={{ justifyContent: 'center', marginTop: 2 }}>
        Send <ArrowIcon size={13} />
      </button>
    </form>
  );
}
