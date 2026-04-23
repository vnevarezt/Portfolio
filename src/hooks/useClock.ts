import { useState, useEffect } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Europe/Madrid',
});

export function useClock(): string {
  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
