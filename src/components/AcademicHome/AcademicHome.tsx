import React, { useMemo, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  aboutContent,
  awardItems,
  educationItems,
  experienceItems,
  newsItems,
  personalInfo,
  preprints,
  publications,
  quote,
  socialLinks
} from '../../data';
import type { NewsItem, Publication, TimelineItem } from '../../types';
import './AcademicHome.css';

const getInitialClass = (initials: string) => initials.length > 2 ? 'wide' : '';
const getVenueLabel = (badge: string) => badge.replace(/'?\d{4}/, '').trim();
const getPublicationActionIcon = (label: string) => {
  if (label === '[Code]') return 'fab fa-github';
  if (label === '[Project Page]') return 'fas fa-globe';
  return '';
};
const getPublicationActionLabel = (label: string) => label.replace(/^\[|\]$/g, '');

const AcademicHome: React.FC = () => {
  const { language, t } = useLanguage();
  const [isAnimeAvatar, setIsAnimeAvatar] = useState(false);

  const groupedNews = useMemo(() => {
    return newsItems.reduce<Array<{ year: string; items: NewsItem[] }>>((groups, item) => {
      const year = item.date.split('.')[0];
      const group = groups.find((entry) => entry.year === year);
      if (group) {
        group.items.push(item);
      } else {
        groups.push({ year, items: [item] });
      }
      return groups;
    }, []);
  }, []);

  const formatDate = (date: string) => {
    const [, month, day] = date.split('.');
    const monthIndex = Number(month) - 1;
    const dayNumber = Number(day);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return language === 'zh' ? `${Number(month)}月${dayNumber}日` : `${monthNames[monthIndex]} ${dayNumber}`;
  };

  const educationAndExperienceItems = [...educationItems, ...experienceItems];

  const TimelineList: React.FC<{ title: string; items: TimelineItem[] }> = ({ title, items }) => (
    <div className="academic-timeline-column">
      <h3>{title}</h3>
      <ul className="academic-timeline-list">
        {items.map((item) => {
          const itemName = t(item.name);

          return (
            <li key={item.id} className="academic-timeline-item">
              {item.logo ? (
                <div className={`academic-logo-mark academic-logo-${item.id}`}>
                  <img src={item.logo} alt={itemName} />
                </div>
              ) : (
                <div className={`academic-initials ${getInitialClass(item.initials)}`}>{item.initials}</div>
              )}
              <div className="academic-timeline-body">
                <div className="academic-timeline-heading">
                  <strong>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {itemName}
                      </a>
                    ) : (
                      itemName
                    )}
                  </strong>
                  <span>{t(item.date)}</span>
                </div>
                {item.dept && <p className="academic-muted">{t(item.dept)}</p>}
                <p>{t(item.position)}</p>
                {item.detail && <p className="academic-detail">{t(item.detail)}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const PublicationItem: React.FC<{ publication: Publication }> = ({ publication }) => {
    const paperLink = publication.links.find((link) => link.label.en === '[Paper]');
    const pressLink = publication.links.find((link) => link.label.en === '[机器之心 Synced]');
    const actionLinks = publication.links.filter((link) => (
      link.label.en !== '[Paper]' && link.label.en !== '[机器之心 Synced]'
    ));
    const badgeClassName = [
      'academic-publication-badge',
      publication.badge.includes('ACL') ? 'academic-publication-badge-acl' : '',
      publication.badge === 'Arxiv' ? 'academic-publication-badge-arxiv' : ''
    ].filter(Boolean).join(' ');
    const badgeContent = (
      <>
        {publication.badgeLogo ? (
          <img src={publication.badgeLogo} alt={publication.badge} />
        ) : null}
        <em>{getVenueLabel(publication.badge)}</em>
      </>
    );
    return (
      <article className="academic-publication">
        <div className="academic-publication-media">
          <a className="academic-publication-image" href={paperLink?.href} target="_blank" rel="noopener noreferrer">
            <img src={publication.image} alt={publication.alt} />
          </a>
        </div>
        <div className="academic-publication-body">
          <h3 dangerouslySetInnerHTML={{ __html: t(publication.title) }} />
          <p dangerouslySetInnerHTML={{ __html: publication.authors }} />
          <div className="academic-publication-links">
            {paperLink?.href ? (
              <a className={badgeClassName} href={paperLink.href} target="_blank" rel="noopener noreferrer" title={getVenueLabel(publication.badge)}>
                {badgeContent}
              </a>
            ) : (
              <span className={badgeClassName} title={getVenueLabel(publication.badge)}>
                {badgeContent}
              </span>
            )}
            {actionLinks.map((link) => (
              link.href ? (() => {
                const iconClassName = getPublicationActionIcon(link.label.en);
                const actionLabel = getPublicationActionLabel(t(link.label));
                const isIconAction = Boolean(iconClassName);

                return (
                  <a
                    key={`${publication.id}-${link.href}`}
                    className={isIconAction ? 'academic-publication-icon-link' : undefined}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isIconAction ? actionLabel : undefined}
                    title={isIconAction ? actionLabel : undefined}
                  >
                    {iconClassName ? (
                      <i className={iconClassName} aria-hidden="true"></i>
                    ) : (
                      t(link.label)
                    )}
                  </a>
                );
              })() : (
                <span key={`${publication.id}-${t(link.label)}`}>{t(link.label)}</span>
              )
            ))}
          </div>
          {publication.award && <p className="academic-publication-note">{t(publication.award)}</p>}
          {publication.integrations && (
            <p className="academic-publication-note">
              {t({ en: 'Integrated into: ', zh: '已集成到：' })}
              {publication.integrations.map((integration, index) => (
                <React.Fragment key={integration.href}>
                  {index > 0 && ' · '}
                  <a href={integration.href} target="_blank" rel="noopener noreferrer">{t(integration.label)}</a>
              </React.Fragment>
            ))}
          </p>
        )}
          {(publication.stats || pressLink) && (
            <p className="academic-publication-note">
              {publication.stats && t(publication.stats)}
              {publication.stats && pressLink?.href && ' · '}
              {pressLink?.href && (
                <a href={pressLink.href} target="_blank" rel="noopener noreferrer">
                  {getPublicationActionLabel(t(pressLink.label))}
                </a>
              )}
            </p>
          )}
        </div>
      </article>
    );
  };

  return (
    <main className="academic-page">
      <div className="academic-shell">
        <aside className="academic-sidebar" aria-label={t({ en: 'Profile', zh: '个人信息' })}>
          <div className="academic-profile-card">
            <button
              className="academic-avatar-button"
              onClick={() => setIsAnimeAvatar((value) => !value)}
              title={language === 'zh' ? '切换头像' : 'Click to switch avatar'}
            >
              <img
                src={isAnimeAvatar ? personalInfo.profileImages.anime : personalInfo.profileImages.photo}
                alt={isAnimeAvatar ? 'Eddy anime avatar' : 'Eddy Luo'}
              />
            </button>
            <div className="academic-profile-meta">
              <h1>{personalInfo.name}</h1>
              <p className="academic-profile-subtitle">{t(personalInfo.title)}</p>
              <p className="academic-profile-location">
                <i className="fas fa-location-dot" aria-hidden="true"></i>
                {t(personalInfo.location)}
              </p>
              <a className="academic-email" href={`mailto:${personalInfo.email}`}>
                {personalInfo.email.replace('@', '(at)')}
              </a>
              <div className="academic-socials">
                {socialLinks.map((link) => (
                  <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer">
                    <i className={link.icon} aria-hidden="true"></i>
                    <span>{t(link.label)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="academic-main">
          <section className="academic-panel academic-intro" id="about">
            <div className="academic-bio">
              <div dangerouslySetInnerHTML={{ __html: t(aboutContent.bio) }} />
              <div dangerouslySetInnerHTML={{ __html: t(aboutContent.contact) }} />
            </div>
          </section>

          <section className="academic-panel academic-anime-banner" aria-label={t({ en: 'Quote', zh: '引语' })}>
            <img src={quote.images.left} alt="" className="academic-banner-character left" />
            <blockquote>
              <p>{t(quote.text)}</p>
              <p className="academic-banner-japanese">{quote.japanese}</p>
              <cite>{t(quote.author)}</cite>
            </blockquote>
            <img src={quote.images.right} alt="" className="academic-banner-character right" />
          </section>

          <section className="academic-panel" id="experience">
            <div className="academic-card-body academic-experience-grid">
              <TimelineList title={t({ en: 'Education & Experience', zh: '教育与研究经历' })} items={educationAndExperienceItems} />
              <div className="academic-awards">
                <h3>{t({ en: 'Honors & Awards', zh: '荣誉与奖项' })}</h3>
                <ul>
                  {awardItems.map((award) => (
                    <li key={award.id}>
                      <span>{t(award.name)}</span>
                      <em>{t(award.date)}</em>
                      {award.detail && <p>{t(award.detail)}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="academic-panel" id="news">
            <div className="academic-section-heading">
              <h2>{t({ en: 'News', zh: '动态' })}</h2>
            </div>
            <div className="academic-card-body academic-news-list">
              {groupedNews.map((group) => (
                <div key={group.year} className="academic-news-year">
                  <div className="academic-news-year-label">{group.year}</div>
                  <div className="academic-news-items">
                    {group.items.map((item) => (
                      <article key={item.id} className="academic-news-item">
                        <div className="academic-news-copy">
                          {item.tag && <span className="academic-news-tag">{t(item.tag)}</span>}
                          <span dangerouslySetInnerHTML={{ __html: t(item.content) }} />
                        </div>
                        <time>{formatDate(item.date)}</time>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="academic-panel" id="publications">
            <div className="academic-section-heading">
              <h2>{t({ en: 'Selected Preprints', zh: '精选预印本' })}</h2>
            </div>
            <div className="academic-card-body academic-publication-list">
              {preprints.map((publication) => (
                <PublicationItem key={publication.id} publication={publication} />
              ))}
            </div>
          </section>

          <section className="academic-panel">
            <div className="academic-section-heading">
              <h2>{t({ en: 'Selected Publications', zh: '精选发表论文' })}</h2>
            </div>
            <div className="academic-card-body academic-publication-list">
              {publications.map((publication) => (
                <PublicationItem key={publication.id} publication={publication} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AcademicHome;
