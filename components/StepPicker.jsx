'use client';

import { useRef, useState } from 'react';

/**
 * Desktop presentation of the booking flow: the eight steps as a list beside
 * one phone stage. Choosing a step swaps the screen on the stage, so the
 * sequence is read one screen at a time — the same paced reading the mobile
 * carousel gives — without eight screenshots competing at once.
 *
 * The list is a WAI-ARIA tablist: arrow keys move between steps, Home/End jump
 * to the ends, and only the active step is in the tab order. Every screenshot
 * stays in the DOM and cross-fades, so switching never flashes an empty frame.
 * Mobile renders BookingCarousel instead (see BookingSteps).
 */
export default function StepPicker({ steps }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  function select(i) {
    const next = (i + steps.length) % steps.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(e) {
    const keys = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: steps.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    }
  }

  return (
    <div className="picker">
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
              onClick={() => setActive(i)}
            >
              <span className="picker__n">{s.n}</span>
              <span className="picker__txt">
                <span className="picker__h">{s.h}</span>
                <span className="picker__b"><span>{s.b}</span></span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="picker__stage stage" id="picker-stage" role="tabpanel" aria-labelledby={`picker-tab-${active}`}>
        <div className="picker__frame">
          {steps.map((s, i) => (
            <img
              key={s.n}
              className={`picker__shot${i === active ? ' is-on' : ''}`}
              src={s.src}
              alt={i === active ? s.alt : ''}
              aria-hidden={i === active ? undefined : true}
              width={s.w}
              height={s.ht}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
        </div>
        <p className="picker__pos label" aria-live="polite">
          Step {active + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
