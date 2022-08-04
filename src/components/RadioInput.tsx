import { useEffect, useState } from 'react';

import { useLangContext } from '../contexts/LanguageContext';

interface RadioInputProps {
	options: string[];
	selectedOption: string;
	setOption: (option: string) => void;
	disabledOptions?: string[];
}

export default function RadioInput({ options, selectedOption, setOption, disabledOptions }: RadioInputProps): JSX.Element {

	const locale = useLangContext();
	const [warning, setWarning] = useState('');

	useEffect(() => {

	}, [selectedOption]);

	return (
		<>
			<div className='radio-input-container'>
				{options.map((option: string) => {
					if (disabledOptions && disabledOptions.includes(option)) {
						return (
							<label
								className='disabled'
								key={option}
								onClick={() => {
									setWarning(locale.isDisabled)
									setTimeout(() => {
										setWarning('')
									}, 1000);
								}}
							>
								{option}
							</label>
						)
					}
					else {
						return (
							<label
								key={option}
								className={option === selectedOption ? 'selected' : ''}
							>
								<input
									type='radio'
									name='modeOfTransport'
									value={option}
									checked={selectedOption === option}
									onChange={() => setOption(option)}
									onClick={() => setWarning('')}
								/>
								{option}
							</label>)
					}
				})}
			</div >
			<p className='warn nomargin'>{warning}</p>
		</>
	);
}