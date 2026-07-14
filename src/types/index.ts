// Type definitions for the portfolio website

export type Language = 'en' | 'zh';

export interface Publication {
  id: string;
  badge: string;
  badgeLogo?: string;
  image: string;
  alt: string;
  authors: string;
  title: {
    en: string;
    zh: string;
  };
  links: Array<{
    href?: string;
    label: {
      en: string;
      zh: string;
    };
  }>;
  award?: {
    en: string;
    zh: string;
  };
  integrations?: Array<{
    href: string;
    label: {
      en: string;
      zh: string;
    };
  }>;
  stats?: {
    en: string;
    zh: string;
  };
}

export interface NewsItem {
  id: string;
  date: string;
  tag?: {
    en: string;
    zh: string;
  };
  content: {
    en: string;
    zh: string;
  };
}

export interface SocialLink {
  id: string;
  href: string;
  icon: string;
  label: {
    en: string;
    zh: string;
  };
}

export interface TimelineItem {
  id: string;
  name: TranslatableText;
  href?: string;
  dept?: TranslatableText;
  position: TranslatableText;
  date: TranslatableText;
  detail?: TranslatableText;
  initials: string;
  logo?: string;
}

export interface AwardItem {
  id: string;
  name: TranslatableText;
  date: TranslatableText;
  detail?: TranslatableText;
}

export interface TranslatableText {
  en: string;
  zh: string;
}
