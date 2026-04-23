import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
  children: ReactNode;
  href?: string;
}

export function Button({ variant = 'default', children, href, className = '', ...props }: ButtonProps) {
  const cls = `btn ${variant === 'primary' ? 'p' : ''} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
