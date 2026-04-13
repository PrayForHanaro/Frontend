export default function HeartLetterIcon() {
  return (
    <svg
      width="160"
      height="140"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Envelope body */}
      <rect x="20" y="50" width="120" height="80" rx="8" fill="#e8fff6" />
      <path
        d="M20 58 L80 95 L140 58"
        stroke="#1ea698"
        strokeWidth="2"
        fill="none"
      />
      {/* Envelope flap */}
      <path d="M20 50 L80 85 L140 50" fill="#d0f0ea" />
      {/* Main heart */}
      <path
        d="M80 30 C80 30 60 5 42 15 C24 25 30 50 80 75 C130 50 136 25 118 15 C100 5 80 30 80 30Z"
        fill="#ff6b9d"
      />
      {/* Small floating heart */}
      <path
        d="M125 20 C125 20 118 12 112 16 C106 20 109 28 125 38 C141 28 144 20 138 16 C132 12 125 20 125 20Z"
        fill="#ffb3d0"
      />
    </svg>
  );
}
