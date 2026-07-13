import { useState } from 'react';
import { ArrowIcon } from '@/components/icons/Icons';
import { FormField } from '@/components/ui/FormField/FormField';
import { useT } from '@/i18n/useT';

export function ContactForm() {
  const t = useT();
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
          {t.form.sentTitle}
        </div>
        <div style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-m)' }}>
          {t.form.sentNote}
        </div>
        <button
          className="btn"
          onClick={() => setSent(false)}
          style={{ marginTop: 4, padding: '8px 16px', fontSize: 'var(--fs-12)' }}
        >
          {t.form.another}
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
      <FormField label={t.form.name} value={name} onChange={setName} required />
      <FormField label={t.form.email} type="email" value={email} onChange={setEmail} required />
      <FormField
        label={t.form.message}
        value={msg}
        onChange={setMsg}
        area
        placeholder={t.form.messagePlaceholder}
        required
      />
      <button type="submit" className="btn p" style={{ justifyContent: 'center', marginTop: 2 }}>
        {t.form.send} <ArrowIcon size={13} />
      </button>
    </form>
  );
}
