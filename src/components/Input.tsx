import { useState } from 'react';

import '../styles/Input.css';

interface InputProps {
	value?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
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

export default function Input({ value, onChange, label }: InputProps): JSX.Element {

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

	return (
		<div className='input-container'>
			<label className={getLabelClassName(state)}>{label}</label>
			<input type="text" value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
		</div>
	);
}