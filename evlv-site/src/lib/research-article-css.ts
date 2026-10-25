export const RESEARCH_ARTICLE_CSS = `
.evlv-rc {
  --rc-charcoal: #0e1113;
  --rc-green-deep: #0b2f2c;
  --rc-sage: #327657;
  --rc-ivory: #f1eee7;
  --rc-ivory-soft: #e7e3da;
  --rc-stone: #d8d3c7;
  --rc-copper: #b8875a;
  --rc-body-gray: #56645f;
  max-width: 780px;
  margin: 0 auto;
  padding: 56px 24px 80px;
  font-family: var(--font-inter), 'Inter', sans-serif;
  line-height: 1.7;
  color: var(--rc-charcoal);
}
.evlv-rc h1, .evlv-rc h2, .evlv-rc h3 {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.03em;
}
.evlv-rc h1 { font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 12px; color: var(--rc-charcoal); }
.evlv-rc h2 { font-size: 1.35rem; color: var(--rc-green-deep); margin: 48px 0 14px; }
.evlv-rc h3 { font-size: 1rem; color: var(--rc-charcoal); margin: 24px 0 8px; }
.evlv-rc p { color: var(--rc-body-gray); font-size: 0.97rem; margin-bottom: 16px; }
.evlv-rc a { color: var(--rc-green-deep); }
.evlv-rc .kicker {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--rc-sage); margin-bottom: 20px; display: block;
}
.evlv-rc .lead {
  font-size: 1.08rem; color: var(--rc-charcoal); font-weight: 500;
  border-left: 3px solid var(--rc-copper); padding-left: 18px;
  margin: 24px 0 36px; line-height: 1.65;
}
.evlv-rc .callout {
  background: var(--rc-ivory); border: 1px solid var(--rc-stone);
  border-radius: 12px; padding: 22px 24px; margin: 32px 0;
}
.evlv-rc .callout p { margin-bottom: 0; font-size: 0.9rem; }
.evlv-rc .callout strong { color: var(--rc-charcoal); }
.evlv-rc .disclaimer {
  background: #fdf9f4; border: 1px solid #e8dfc9;
  border-radius: 10px; padding: 18px 22px; margin: 32px 0;
}
.evlv-rc .disclaimer p { font-size: 0.85rem; color: #7a6849; margin: 0; }
.evlv-rc .def-block {
  border-left: 3px solid var(--rc-sage); padding: 16px 18px;
  margin: 24px 0; background: #f8faf9; border-radius: 0 8px 8px 0;
}
.evlv-rc .def-block strong {
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-weight: 600;
  color: var(--rc-green-deep); display: block; margin-bottom: 6px;
}
.evlv-rc .def-block p { margin: 0; font-size: 0.92rem; }
.evlv-rc .disclosure {
  background: #f7f4ee; border: 1px solid var(--rc-stone);
  border-radius: 10px; padding: 20px 24px; margin: 36px 0;
}
.evlv-rc .disclosure p { font-size: 0.9rem; color: var(--rc-body-gray); margin: 0; }
.evlv-rc .disclosure strong {
  color: var(--rc-charcoal); display: block; margin-bottom: 6px;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
}
.evlv-rc .faq-item { border-bottom: 1px solid var(--rc-stone); padding: 20px 0; }
.evlv-rc .faq-item:last-child { border-bottom: none; }
.evlv-rc .faq-q {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.95rem; font-weight: 600; color: var(--rc-charcoal); margin-bottom: 8px;
}
.evlv-rc .faq-a { font-size: 0.9rem; color: var(--rc-body-gray); margin: 0; }
.evlv-rc .cta-block {
  background: var(--rc-green-deep); border-radius: 16px;
  padding: 36px 32px; margin: 56px 0 0; text-align: center;
}
.evlv-rc .cta-block h2 { color: #fff; margin: 0 0 10px; font-size: 1.5rem; }
.evlv-rc .cta-block p { color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 24px; }
.evlv-rc .cta-btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 48px; padding: 0 32px; border-radius: 24px;
  background: var(--rc-ivory); color: var(--rc-green-deep);
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.85rem; font-weight: 700; text-decoration: none; letter-spacing: 0.05em;
}
.evlv-rc hr { border: none; border-top: 1px solid var(--rc-stone); margin: 48px 0; }
.evlv-rc cite { font-size: 0.8rem; font-style: normal; color: #8a9490; display: block; margin-top: 6px; }
.evlv-rc .comp-table, .evlv-rc .data-table {
  width: 100%; border-collapse: collapse; margin: 32px 0; font-size: 0.88rem;
}
.evlv-rc .comp-table th, .evlv-rc .data-table th {
  background: var(--rc-green-deep); color: #fff; text-align: left; padding: 12px 16px;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-weight: 600; font-size: 0.8rem; letter-spacing: 0.04em;
}
.evlv-rc .comp-table th:first-child { border-radius: 8px 0 0 0; }
.evlv-rc .comp-table th:last-child { border-radius: 0 8px 0 0; }
.evlv-rc .comp-table td, .evlv-rc .data-table td {
  padding: 12px 16px; border-bottom: 1px solid var(--rc-stone);
  color: var(--rc-body-gray); vertical-align: top;
}
.evlv-rc .comp-table td:first-child {
  font-weight: 600; color: var(--rc-charcoal);
  font-family: var(--font-poppins), 'Poppins', sans-serif; font-size: 0.85rem;
}
.evlv-rc .comp-table tr:last-child td, .evlv-rc .data-table tr:last-child td { border-bottom: none; }
.evlv-rc .comp-table tr:nth-child(even) td, .evlv-rc .data-table tr:nth-child(even) td { background: #fafaf8; }
.evlv-rc .step-list { margin: 24px 0 32px; }
.evlv-rc .step { display: flex; gap: 18px; margin-bottom: 28px; }
.evlv-rc .step-num {
  width: 32px; height: 32px; min-width: 32px; border-radius: 50%;
  background: var(--rc-green-deep); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-weight: 600; font-size: 0.8rem; margin-top: 2px;
}
.evlv-rc .step-body h3 { margin: 0 0 6px; }
.evlv-rc .step-body p { margin: 0; }
@media (max-width: 600px) {
  .evlv-rc { padding: 36px 16px 60px; }
  .evlv-rc .comp-table, .evlv-rc .data-table { font-size: 0.82rem; }
  .evlv-rc .comp-table th, .evlv-rc .comp-table td,
  .evlv-rc .data-table th, .evlv-rc .data-table td { padding: 9px 10px; }
}
`;
