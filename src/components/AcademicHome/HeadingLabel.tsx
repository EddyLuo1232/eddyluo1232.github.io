import type { ReactNode } from 'react';

const icons = {
  awards: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="m8.5 12-1.5 9 5-3 5 3-1.5-9" />
    </>
  ),
  news: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M7 8h4v4H7zM14 8h3M14 11h3M7 16h10" />
    </>
  ),
  preprints: <path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h6" />,
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
