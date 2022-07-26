import { useEffect, useState } from 'react';
import { Language, useLanguageContext } from '../contexts/LanguageContext';

import '../styles/Input.css';

interface InputProps {
	value?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	rightLabel?: string;
	name: string;
}

function getLabelClassName(state: string): string {
	switch (state) {
		case 'blur':
			return 'label-blurred';
		case 'focus':
			return 'label-focused';
		case 'filled':
			return 'label-filled';
		default:
			console.error('In component Input: Invalid state: ' + state);
			return '';
	}
}

export default function Input({ value, onChange, label, rightLabel, name }: InputProps): JSX.Element {

	const locale: Language = useLanguageContext()

	const [state, setState] = useState('blur');
	const [err, setErr] = useState('');

	useEffect(() => {
		if (Number.isNaN(Number(value))) setErr(locale.MustBeNumber);
		else if (Number(value) < 0) setErr(locale.MustBePositive);
	}, [value, locale]);

	const onFocus = () => setState('focus')
	const onBlur = () => {
		if (value !== '') {
			setState('filled');
		}
		else {
			setState('blur')
		}
	}

	const isValid = () => {
		if (value === '') return true
		return !Number.isNaN(Number(value)) && Number(value) > 0;
	}

	return (
		<div className='input-container'>
			<div className='row'>
				<label className={getLabelClassName(state)}>{label}</label>
				<label className={getLabelClassName(state)}>{rightLabel}</label>
			</div>
			<input type="text" value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} name={name} />
			<p className={`message err nomargin ' + ${isValid() ? 'hide' : 'show'}`}> {err}</p>
		</div>
	);
}