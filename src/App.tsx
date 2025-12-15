import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';

import fr from './i18n/fr.json';
import en from './i18n/en.json';

function App() {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr');
  const messages = locale === 'fr' ? fr : en;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-7xl px-4 py-6">
              <AppRouter setLocale={setLocale} />
            </div>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
