import styles from './SegmentedControl.module.css';

interface SegmentedControlProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  size?: 'sm' | 'md';
  /** Display label for an option (e.g. localized); values stay stable. */
  labelFor?: (option: T) => string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
  labelFor,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`${styles.root} ${size === 'sm' ? styles.sm : ''}`}
    >
      {options.map((option) => {
        const isActive = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            className={`${styles.btn} ${isActive ? `accent-surface ${styles.active}` : ''}`}
            onClick={() => onChange(option)}
          >
            {labelFor ? labelFor(option) : option}
          </button>
        );
      })}
    </div>
  );
}
