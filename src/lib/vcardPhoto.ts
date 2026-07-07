const PHOTO_MAX_DIMENSION = 512;
const JPEG_QUALITY = 0.85;
const FOLD_LINE_LENGTH = 75;

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image load failed'));
    img.src = src;
  });
}

function downscaleToBase64(img: HTMLImageElement): string | null {
  const scale = Math.min(
    PHOTO_MAX_DIMENSION / img.width,
    PHOTO_MAX_DIMENSION / img.height,
    1,
  );
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, w, h);
  const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
  const idx = dataUrl.indexOf(',');
  return idx < 0 ? null : dataUrl.slice(idx + 1);
}

function foldLine(prefix: string, payload: string): string {
  const firstChunkLen = Math.max(1, FOLD_LINE_LENGTH - prefix.length);
  const lines: string[] = [prefix + payload.slice(0, firstChunkLen)];
  let i = firstChunkLen;
  const chunkLen = FOLD_LINE_LENGTH - 1;
  while (i < payload.length) {
    lines.push(' ' + payload.slice(i, i + chunkLen));
    i += chunkLen;
  }
  return lines.join('\r\n');
}

export async function fetchPhotoLine(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    try {
      const img = await loadImage(objectUrl);
      const base64 = downscaleToBase64(img);
      if (!base64) return null;
      return foldLine('PHOTO;ENCODING=b;TYPE=JPEG:', base64);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
    return null;
  }
}
