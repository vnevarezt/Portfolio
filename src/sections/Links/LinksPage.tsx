import { type ReactNode, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { fetchPhotoLine } from '@/lib/vcardPhoto';
import {
  ArrowIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  GitHubIcon,
  GlobeIcon,
  IdCardIcon,
  InstagramIcon,
  LinkedInIcon,
  PenIcon,
  XIcon,
} from '@/components/icons/Icons';
import { Monogram } from '@/components/marks/Monogram';
import { useLang } from '@/i18n/useLang';
import { localePath } from '@/i18n/routing';
import { useSeo } from '@/seo/useSeo';
import { VCARD } from '@/data/vcard';
import styles from './LinksPage.module.css';

const EMAIL = 'contact@vnevarezt.com';

const madridFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Europe/Madrid',
});

function useMadridClock(): string {
  const [time, setTime] = useState(() => madridFormatter.format(new Date()));
  useEffect(() => {
    const interval = setInterval(() => setTime(madridFormatter.format(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

export function LinksPage() {
  const { lang } = useLang();
  useSeo('/me', lang);
  return (
    <div className={styles.shell}>
      <div className={`gbg ${styles.bgGrid}`} />
      <div className={styles.bgGlow} />
      <div className={styles.bgFade} />

      <header className={styles.topbar}>
        <div className={`m ${styles.path}`}>/me</div>
        <Clock />
      </header>

      <main className={styles.main}>
        <Hero />

        <section className={`${styles.hl} ${styles.primarySection}`}>
          <PrimaryAction />
          <div className={styles.altRow}>
            <span className={`m ${styles.altLabel}`}>or email me</span>
            <CopyEmail />
          </div>
        </section>

        <section className={styles.hl}>
          <Eyebrow>Explore</Eyebrow>
          <div className={styles.linkList}>
            <SecondaryLink
              icon={<GlobeIcon size={17} />}
              label="vnevarezt.com"
              sub="Portfolio · projects · about"
              href={localePath(lang, '/')}
            />
            <SecondaryLink
              icon={<PenIcon size={17} />}
              label="The blog"
              sub="Notes on design & code"
              href={localePath(lang, '/')}
            />
            <SecondaryLink
              icon={<DownloadIcon size={17} />}
              label="Download CV"
              sub="PDF · 2026"
              href={localePath(lang, '/cv')}
            />
          </div>
        </section>

        <section className={styles.hl}>
          <Eyebrow>Find me on</Eyebrow>
          <div className={styles.socialGrid}>
            <SocialChip
              icon={<GitHubIcon size={20} />}
              label="vnevarezt"
              sub="GitHub"
              href="https://github.com/vnevarezt"
            />
            <SocialChip
              icon={<LinkedInIcon size={20} />}
              label="vnevarezt"
              sub="LinkedIn"
              href="https://linkedin.com/in/vnevarezt"
            />
            <SocialChip
              icon={<XIcon size={20} />}
              label="@vnevarezt"
              sub="X · Twitter"
              href="https://x.com/vnevarezt"
            />
            <SocialChip
              icon={<InstagramIcon size={20} />}
              label="@vnevarezt"
              sub="Instagram"
              href="https://instagram.com/vnevarezt"
            />
          </div>
        </section>

        <footer className={`${styles.hl} ${styles.footer}`}>
          <div className={`d ${styles.footerCredit}`}>
            Built by hand <span className={styles.footerAccent}>·</span> 2026
          </div>
          <div className={`m ${styles.footerUrl}`}>vnevarezt.com/me</div>
        </footer>
      </main>
    </div>
  );
}

function Clock() {
  const time = useMadridClock();
  return (
    <span className={`m ${styles.clock}`}>
      {time}
      <span className={styles.clockZone}>MAD</span>
    </span>
  );
}

function Hero() {
  return (
    <section className={`${styles.hl} ${styles.hero}`}>
      <div className={styles.monogramWrap}>
        <Monogram size={120} />
        <div className={styles.statusPip}>
          <span className={styles.statusDot}>
            <span className={styles.statusDotCore} />
            <span className={styles.statusDotPulse} />
          </span>
        </div>
      </div>

      <h1 className={`d ${styles.heroName}`}>
        Vicente Nevárez<span className={styles.heroNameAccent}>.</span>
      </h1>

      <div className={styles.heroHandleRow}>
        <span className={`m ${styles.heroHandle}`}>@vnevarezt</span>
        <span className={styles.heroDot} />
        <span className={styles.heroLocation}>Madrid · ES</span>
      </div>

      <p className={styles.heroBio}>
        Developer &amp; interface designer building{' '}
        <span className={styles.heroBioStrong}>calm software</span>.
      </p>

      <div className={styles.statusPill}>
        <span className={styles.statusPillDot} />
        <span className={`m ${styles.statusPillText}`}>Open for work · Spring 26</span>
      </div>
    </section>
  );
}

function PrimaryAction() {
  const VCARD_NAME = 'vicente-nevarez.vcf';

  const buildVCardText = async (): Promise<string> => {
    const base = VCARD.replace(/\r?\n/g, '\r\n');
    const photo = await fetchPhotoLine('/avatar.jpg');
    if (!photo) return base + '\r\n';
    return base.replace('\r\nEND:VCARD', '\r\n' + photo + '\r\nEND:VCARD') + '\r\n';
  };

  const buildVCardFile = async (): Promise<File> =>
    new File([await buildVCardText()], VCARD_NAME, {
      type: 'text/vcard;charset=utf-8',
    });

  const shareNative = async (): Promise<boolean> => {
    if (!Capacitor.isNativePlatform()) return false;
    try {
      const data = await buildVCardText();
      const { uri } = await Filesystem.writeFile({
        path: VCARD_NAME,
        data,
        directory: Directory.Cache,
        encoding: Encoding.UTF8,
      });
      await Share.share({
        title: 'Vicente Nevárez',
        files: [uri],
        dialogTitle: 'Save contact',
      });
      return true;
    } catch (err) {
      console.warn('Capacitor share failed', err);
      return false;
    }
  };

  const shareWeb = async (file: File): Promise<boolean> => {
    if (
      typeof navigator === 'undefined' ||
      typeof navigator.canShare !== 'function' ||
      typeof navigator.share !== 'function'
    ) {
      return false;
    }
    try {
      if (!navigator.canShare({ files: [file] })) return false;
      await navigator.share({ files: [file], title: 'Vicente Nevárez' });
      return true;
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return true;
      return false;
    }
  };

  const downloadFallback = (file: File) => {
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = VCARD_NAME;
    anchor.rel = 'noopener';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const downloadVCard = async () => {
    if (await shareNative()) return;
    const file = await buildVCardFile();
    if (await shareWeb(file)) return;
    downloadFallback(file);
  };

  return (
    <button type="button" onClick={downloadVCard} className={styles.primaryBtn}>
      <span className={styles.primaryShine} aria-hidden="true" />
      <div className={styles.primaryIcon}>
        <IdCardIcon size={20} />
      </div>
      <div className={styles.primaryBody}>
        <div className={`d ${styles.primaryTitle}`}>Save my contact</div>
        <div className={`m ${styles.primarySub}`}>vCard · adds to phone</div>
      </div>
      <div className={styles.primaryArrow}>
        <ArrowIcon size={15} />
      </div>
    </button>
  );
}

function CopyEmail() {
  const [done, setDone] = useState(false);

  const copy = () => {
    void navigator.clipboard?.writeText(EMAIL);
    setDone(true);
    window.setTimeout(() => setDone(false), 1800);
  };

  return (
    <button type="button" onClick={copy} className={styles.copyBtn}>
      {EMAIL}
      <span className={`${styles.copyBadge} ${done ? styles.copyBadgeActive : ''}`}>
        {done ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
      </span>
    </button>
  );
}

interface SecondaryLinkProps {
  icon: ReactNode;
  label: string;
  sub: string;
  href: string;
}

function SecondaryLink({ icon, label, sub, href }: SecondaryLinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={styles.secondaryLink}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <div className={styles.secondaryIcon}>{icon}</div>
      <div className={styles.secondaryBody}>
        <div className={`d ${styles.secondaryTitle}`}>{label}</div>
        <div className={`m ${styles.secondarySub}`}>{sub}</div>
      </div>
      <div className={styles.secondaryArrow}>
        <ArrowIcon size={13} />
      </div>
    </a>
  );
}

interface SocialChipProps {
  icon: ReactNode;
  label: string;
  sub: string;
  href: string;
}

function SocialChip({ icon, label, sub, href }: SocialChipProps) {
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={styles.socialChip}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <div className={styles.socialHead}>
        <div className={styles.socialIcon}>{icon}</div>
        <div className={styles.socialArrow}>
          <ArrowIcon size={11} />
        </div>
      </div>
      <div className={styles.socialBody}>
        <div className={`d ${styles.socialLabel}`}>{label}</div>
        <div className={`m ${styles.socialSub}`}>{sub}</div>
      </div>
    </a>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className={styles.eyebrow}>
      <span className={styles.eyebrowDot} />
      <span className={`m ${styles.eyebrowText}`}>{children}</span>
      <span className={styles.eyebrowRule} />
    </div>
  );
}
