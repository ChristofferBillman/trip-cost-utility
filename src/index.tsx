import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import LanguageContextProvider from './contexts/LanguageContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

function getLocale() {
	const locale = navigator.language

	if (locale === 'en-US') return 'EN'
	if (locale === 'sv-SE') return 'SE'
	return 'EN'
}

root.render(
	<React.StrictMode>
		<LanguageContextProvider language={getLocale()} >
			<App />
		</LanguageContextProvider>
	</React.StrictMode>
);
