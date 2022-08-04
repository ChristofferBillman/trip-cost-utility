import { useLangContext } from "../contexts/LanguageContext";


interface RadioInputProps {
	options: string[];
	selectedOption: string;
	setOption: (option: string) => void;
}

export default function RadioInput({ options, selectedOption, setOption }: RadioInputProps): JSX.Element {

	const content: any = useLangContext()

	return (
		<div className='radio-input-container'>
			{options.length === 0 ?
				(
					<label style={{ color: '#ffa724' }}>{content.CannotPickFuelType}</label>
				) : (
					options.map((option: string) => {
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
					})
				)}
		</div >
	);
}