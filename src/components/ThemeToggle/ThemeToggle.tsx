import { useTheme } from '@/hooks/useTheme';
import { SunIcon, MoonIcon } from '@/components/icons/Icons';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        border: '1px solid var(--br)',
        background: 'transparent',
        color: 'var(--fg-m)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all .15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--ac)';
        e.currentTarget.style.borderColor = 'var(--ac)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--fg-m)';
        e.currentTarget.style.borderColor = 'var(--br)';
      }}
    >
      {theme === 'dark' ? <SunIcon size={15} /> : <MoonIcon size={15} />}
    </button>
  );
}
