'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const DWELL = 4500; // ms per screen while the flow plays on its own

/**
 * Desktop presentation of the booking flow: the eight steps as a list beside
 * one phone stage. Choosing a step swaps the screen on the stage, so the
 * sequence is read one screen at a time — the same paced reading the mobile
 * carousel gives — without eight screenshots competing at once.
 *
 * While the section is on screen it plays through the steps by itself, with a
 * progress bar on the active step, so a visitor who never clicks still sees
 * that there are eight screens. It stops for good the moment the visitor takes
 * over (click, key, focus), pauses while hovered, and never runs under
 * prefers-reduced-motion.
 *
 * The list is a WAI-ARIA tablist: arrow keys move between steps, Home/End jump
 * to the ends, and only the active step is in the tab order. Every screenshot
 * stays in the DOM and cross-fades, so switching never flashes an empty frame.
 * Mobile renders BookingCarousel instead (see BookingSteps).
 */
export default function StepPicker({ steps }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false); // in view, auto-advancing
  const [stopped, setStopped] = useState(false); // the visitor took over
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef(null);
  const tabRefs = useRef([]);

  // Play only while the section is actually on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || stopped) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, [stopped]);

  const running = playing && !stopped && !hovered;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((n) => (n + 1) % steps.length), DWELL);
    return () => clearTimeout(t);
  }, [running, active, steps.length]);

  function take(i) {
    setStopped(true);
    setActive((i + steps.length) % steps.length);
  }

  function onKeyDown(e) {
    const keys = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: steps.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      const next = (keys[e.key] + steps.length) % steps.length;
      take(next);
      tabRefs.current[next]?.focus();
    }
  }

  return (
    <div
      className={`picker${running ? ' is-playing' : ''}`}
      ref={rootRef}
      style={{ '--dwell': `${DWELL}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setStopped(true)}
    >
      <div className="picker__list" role="tablist" aria-label="Booking flow, step by step" aria-orientation="vertical" onKeyDown={onKeyDown}>
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.n}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`picker-tab-${i}`}
              aria-selected={on}
              aria-controls="picker-stage"
              tabIndex={on ? 0 : -1}
              className={`picker__tab${on ? ' is-on' : ''}`}
              onClick={() => take(i)}
            >
              <span className="picker__n">{s.n}</span>
              <span className="picker__txt">
                <span className="picker__h">{s.h}</span>
                <span className="picker__b"><span>{s.b}</span></span>
              </span>
              {/* keyed on the step so the fill restarts each time a step becomes active */}
              {on && <span className="picker__bar" key={`bar-${active}`} aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      <div className="picker__stage stage" id="picker-stage" role="tabpanel" aria-labelledby={`picker-tab-${active}`}>
        <div className="picker__frame">
          {steps.map((s, i) => (
            <Image
              key={s.n}
              className={`picker__shot${i === active ? ' is-on' : ''}`}
              src={s.src}
              alt={i === active ? s.alt : ''}
              aria-hidden={i === active ? undefined : true}
              width={s.w}
              height={s.ht}
              sizes="310px"
              quality={85}
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
        <p className="picker__pos label" aria-live={stopped ? 'polite' : 'off'}>
          Step {active + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
