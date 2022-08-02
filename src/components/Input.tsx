import { useState } from 'react';

import '../styles/Input.css';

interface InputProps {
	value?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	rightLabel?: string;
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

export default function Input({ value, onChange, label, rightLabel }: InputProps): JSX.Element {

	const [state, setState] = useState('blur');

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
		return !Number.isNaN(Number(value))
	}

	return (
		<div className='input-container'>
			<div className='row'>
				<label className={getLabelClassName(state)}>{label}</label>
				<label className={getLabelClassName(state)}>{rightLabel}</label>
			</div>
			<input type="text" value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
			<p className='err nomargin'> {!isValid() ? 'Must be a number' : ''}</p>
		</div>
	);
}