import { useEffect, useState } from 'react';

import { useLangContext } from '../contexts/LanguageContext';

import '../styles/Input.css';

interface RadioInputProps {
	options: string[];
	selectedOption: string;
	setOption: (option: string) => void;
	disabledOptions?: string[];
}

export default function RadioInput({ options, selectedOption, setOption, disabledOptions }: RadioInputProps): JSX.Element {

	const locale = useLangContext();
	const [isValid, setIsValid] = useState(true);

	useEffect(() => {

	}, [selectedOption]);

	return (
		<div className='radio-input-container'>
			<div className='row'>
				{options.map((option: string) => {
					if (disabledOptions && disabledOptions.includes(option)) {
						return (
							<label
								className='disabled'
								key={option}
								onClick={() => {
									setIsValid(false)
									setTimeout(() => {
										setIsValid(true)
									}, 2000);
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
									onClick={() => setIsValid(true)}
								/>
								{option}
							</label>)
					}
				})}
				<p className={`message warn nomargin ${isValid ? 'hide' : 'show'}`}>{locale.isDisabled}</p>
			</div >
		</div>
	);
}