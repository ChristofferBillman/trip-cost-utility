interface RadioInputProps {
	options: string[];
	selectedOption: string;
	setOption: (option: string) => void;
}

export default function RadioInput({ options, selectedOption, setOption }: RadioInputProps): JSX.Element {

	return (
		<div className='radio-input-container'>
			{options.map((option: string) => {
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
						/>
						{option}
					</label>
				);
			})}
		</div >
	);
}