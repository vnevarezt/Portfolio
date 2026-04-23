interface FilterPillsProps {
  options: readonly string[];
  active: string;
  onChange: (value: string) => void;
}

export function FilterPills({ options, active, onChange }: FilterPillsProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        padding: 4,
        background: 'var(--bg-c)',
        border: '1px solid var(--br)',
        borderRadius: 999,
      }}
    >
      {options.map((option) => (
        <button
          key={option}
          className={active === option ? 'accent-surface' : undefined}
          onClick={() => onChange(option)}
          style={{
            padding: '6px 14px',
            border: 'none',
            background: active === option ? undefined : 'transparent',
            color: active === option ? undefined : 'var(--fg-m)',
            fontFamily: 'var(--font-b)',
            fontSize: 12,
            borderRadius: 999,
            cursor: 'pointer',
            transition: 'all .15s',
            fontWeight: active === option ? 500 : 400,
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
