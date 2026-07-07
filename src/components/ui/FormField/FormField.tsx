interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
  placeholder?: string;
  required?: boolean;
}

export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  area,
  placeholder = '…',
  required,
}: FormFieldProps) {
  return (
    <label style={{ display: 'block' }}>
      <span
        className="m"
        style={{
          fontSize: 'var(--fs-9)',
          color: 'var(--fg-d)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 5,
        }}
      >
        {label}
      </span>
      {area ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field"
          style={{ minHeight: 80 }}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field"
          placeholder={placeholder}
          required={required}
        />
      )}
    </label>
  );
}
