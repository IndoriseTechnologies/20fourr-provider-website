/**
 * UI glyphs, drawn in the same register as TrustIcons: 24-unit grid,
 * 1.6 stroke, currentColor, no fill. Decorative by default — the text
 * beside each one carries the meaning.
 */

export function ArrowRight({ className = 'btn__arw' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M3.5 8.4 6.6 11.4 12.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 5.5 5.6v5.6c0 4 2.7 7 6.5 8.5 3.8-1.5 6.5-4.5 6.5-8.5V5.6L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 11.8 11 13.8 15.2 9.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The absent badge — same outline, dashed, no tick. */
export function ShieldEmptyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 5.5 5.6v5.6c0 4 2.7 7 6.5 8.5 3.8-1.5 6.5-4.5 6.5-8.5V5.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeDasharray="2.6 2.6"
      />
    </svg>
  );
}

export function DocIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M4 2.5h5.5L12 5v8.2a.3.3 0 0 1-.3.3H4.3a.3.3 0 0 1-.3-.3V2.8a.3.3 0 0 1 .3-.3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6 8h4M6 10.5h2.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function AlertIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M8 2.2 14.2 13H1.8L8 2.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.2" r=".8" fill="currentColor" />
    </svg>
  );
}
