// Type definitions for the portfolio website

export type Language = 'en' | 'zh';

export type Theme = 'light' | 'dark' | 'auto';

export interface Publication {
  id: string;
  badge: string;
  image: string;
  alt: string;
  authors: string;
  title: {
    en: string;
    zh: string;
  };
  links: Array<{
    href: string;
    label: {
      en: string;
      zh: string;
    };
  }>;
  highlight?: string;
  award?: {
    en: string;
    zh: string;
  };
  nvidia?: {
    en: string;
    zh: string;
  };
  stats?: {
    en: string;
    zh: string;
  };
}

export interface NewsItem {
  id: string;
  date: string;
  emoji: string;
  content: {
    en: string;
    zh: string;
  };
}

export interface ResearchInterest {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
}

export interface SocialLink {
  id: string;
  href: string;
  icon?: string;
  iconType: 'fas' | 'fab' | 'img';
  label: {
    en: string;
    zh: string;
  };
  imgSrc?: string;
}

export interface TranslatableText {
  en: string;
  zh: string;
}
