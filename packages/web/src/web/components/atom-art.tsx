/* oxlint-disable jsx-a11y/prefer-tag-over-role -- inline SVG has no equivalent semantic HTML element */
export function Star({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 50 50" aria-hidden="true">
      <path d="M25 0 29 20 50 25 29 29 25 50 20 29 0 25 20 20Z" fill="currentColor" />
    </svg>
  );
}
export function AtomArt({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "atom-art small" : "atom-art"}
      viewBox="0 0 620 570"
      role="img"
      aria-label="Stylized atomic symbol with electrons surrounding a nucleus; not to scale"
    >
      <defs>
        <pattern
          id={small ? "dots-small" : "dots"}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.1" fill="#193f3b" opacity=".35" />
        </pattern>
      </defs>
      <circle cx="310" cy="275" r="210" fill="#d4aa51" opacity=".35" />
      <circle cx="310" cy="275" r="210" fill={`url(#${small ? "dots-small" : "dots"})`} />
      <g fill="none" stroke="#193f3b" strokeWidth="4">
        <ellipse cx="310" cy="275" rx="265" ry="91" transform="rotate(-30 310 275)" />
        <ellipse cx="310" cy="275" rx="265" ry="91" transform="rotate(30 310 275)" />
        <ellipse cx="310" cy="275" rx="265" ry="91" transform="rotate(90 310 275)" />
      </g>
      <g fill="#bf4934" stroke="#f4ecd9" strokeWidth="5">
        <circle cx="281" cy="251" r="34" />
        <circle cx="333" cy="248" r="34" />
        <circle cx="311" cy="298" r="34" />
      </g>
      <g fill="#193f3b" stroke="#f4ecd9" strokeWidth="5">
        <circle cx="288" cy="283" r="29" />
        <circle cx="341" cy="283" r="29" />
        <circle cx="309" cy="237" r="29" />
      </g>
      <g fill="#bf4934" stroke="#f4ecd9" strokeWidth="5">
        <circle cx="119" cy="131" r="18" />
        <circle cx="506" cy="419" r="18" />
        <circle cx="355" cy="41" r="18" />
      </g>
      <g fill="#193f3b">
        <path d="m531 88 5 23 23 5-23 5-5 23-5-23-23-5 23-5Z" />
        <path d="m83 374 3 16 16 3-16 3-3 16-3-16-16-3 16-3Z" />
        <path d="m460 27 2 10 10 2-10 2-2 10-2-10-10-2 10-2Z" />
      </g>
      <g stroke="#193f3b" fill="none" strokeWidth="1.5">
        <path d="M326 284h82l39-39h120" />
        <path d="M130 135H79l-23-23H12" />
      </g>
      <g fill="#193f3b" fontFamily="Barlow Condensed,sans-serif" fontSize="15" letterSpacing="2">
        <text x="457" y="234">
          THE NUCLEUS
        </text>
        <text x="12" y="101">
          ELECTRON
        </text>
      </g>
    </svg>
  );
}
