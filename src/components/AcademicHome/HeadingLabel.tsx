import type { ReactNode } from 'react';

const icons = {
  awards: <path d="M7 3h10v6a5 5 0 0 1-10 0ZM7 5H3v2a4 4 0 0 0 4 4M17 5h4v2a4 4 0 0 1-4 4M12 14v7M8 21h8" />,
  news: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M7 8h4v4H7zM14 8h3M14 11h3M7 16h10" />
    </>
  ),
  preprints: <path d="m12 3 10 5-10 5L2 8ZM2 12l10 5 10-5M2 16l10 5 10-5" />,
  publications: <path d="M12 6C9 4 6 4 3 5v15c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1ZM12 6v15" />,
  mentees: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2" />
    </>
  ),
  education: <path d="m2 9 10-5 10 5-10 5ZM6 11v6c4 3 8 3 12 0v-6M22 9v7" />,
  internships: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V4h8v3M3 12c6 4 12 4 18 0M12 12v4" />
    </>
  ),
  interests: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2.5 5.5L8 16l2.5-5.5Z" />
    </>
  )
};

export type HeadingIcon = keyof typeof icons;

const HeadingLabel = ({ icon, children }: { icon: HeadingIcon; children: ReactNode }) => (
  <span className="academic-heading-label">
    <svg
      className="academic-heading-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[icon]}
    </svg>
    <span>{children}</span>
  </span>
);

export default HeadingLabel;
