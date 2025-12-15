import { FormattedMessage } from 'react-intl';

export default function LanguageSwitcher({
  setLocale,
}: {
  setLocale: (lang: 'fr' | 'en') => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button onClick={() => setLocale('fr')}>FR</button>
      <button onClick={() => setLocale('en')}>EN</button>
    </div>
  );
}
