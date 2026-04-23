interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
}

export function FormField({ label, type = 'text', value, onChange, area }: FormFieldProps) {
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field"
          style={{ height: 80 }}
          placeholder="Your message..."
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field"
          placeholder="..."
        />
      )}
    </div>
  );
}
