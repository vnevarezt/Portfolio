import { DICT } from './dict';
import { useLang } from './useLang';

/** Returns the UI string dictionary for the active language. */
export function useT() {
  const { lang } = useLang();
  return DICT[lang];
}
