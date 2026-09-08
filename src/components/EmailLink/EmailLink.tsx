import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './EmailLink.css';

async function copyEmail(email: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
      return true;
    }

    const previousFocus = document.activeElement;
    const input = document.createElement('textarea');
    input.value = email;
    input.readOnly = true;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);

    try {
      input.select();
      return document.execCommand('copy');
    } finally {
      input.remove();
      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus({ preventScroll: true });
      }
    }
  } catch {
    return false;
  }
}

export default function EmailLink({ email }: { email: string }) {
  const { t } = useLanguage();
  const [feedback, setFeedback] = useState<{ copied: boolean } | null>(null);

  useEffect(() => {
    if (!feedback?.copied) return;
    const timeout = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setFeedback({ copied: await copyEmail(email) });
  };

  const copyLabel = t({ en: 'Copy email address', zh: '复制邮箱地址' });

  return (
    <>
      <a
        className="academic-email"
        href={`mailto:${email}`}
        title={copyLabel}
        aria-label={`${copyLabel}: ${email}`}
        onClick={handleClick}
      >
        {email.replace('@', '(at)')}
      </a>
      <div className="email-feedback" role="status" aria-live="polite" aria-atomic="true">
        {feedback && (
          <>
            <p>
              {feedback.copied
                ? t({ en: 'Email copied to clipboard.', zh: '邮箱地址已复制。' })
                : t({ en: 'Couldn’t copy automatically. You can select and copy the address below.', zh: '自动复制失败，你可以选中下方地址手动复制。' })}
            </p>
            {!feedback.copied && (
              <>
                <code className="email-feedback-address">{email}</code>
                <a href={`mailto:${email}`}>
                  {t({ en: 'Open email app', zh: '打开邮件应用' })}
                </a>
              </>
            )}
            <button
              type="button"
              className="email-feedback-dismiss"
              aria-label={t({ en: 'Dismiss notification', zh: '关闭提示' })}
              onClick={() => setFeedback(null)}
            >
              ×
            </button>
          </>
        )}
      </div>
    </>
  );
}
