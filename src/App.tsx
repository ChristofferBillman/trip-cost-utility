import { useEffect, useState } from 'react';

import './styles/App.css';
import './styles/Input.css';

import Input from './components/Input';
import RadioInput from './components/RadioInput';
import Button from './components/Button';
import VSpace from './components/VSpace';

const fuels: any = {
	'Car': ['Gasoline', 'Diesel', 'Electricity', 'Ethanol'],
	'Train': [],
	'Plane': [],
	'Bike': [],
}

export default function App(): JSX.Element {

	const [distance, setDistance] = useState('');
	const [fuelConsumtpion, setFuelConsumption] = useState('');
	const [fuel, setFuel] = useState('Gasoline');
	const [fuelCost, setFuelCost] = useState('');
	const [modeOfTransport, setModeOfTransport] = useState('Car');

	const [numOfPeople, setNumOfPeople] = useState('');

	const [currency] = useState('kr');
	const [result, setResult] = useState('');
	const [isValidForm, setIsValidForm] = useState(false);

	const [shareButtonOptions, setShareButtonOptions] = useState({ text: 'Copy to clipboard', color: '#1d5c2c' });
	const [calculateButtonText, setCalculateButtonText] = useState('Calculate');

	useEffect(() => {
		setIsValidForm(formIsValid());
	}, [distance, fuelConsumtpion, fuelCost, modeOfTransport, numOfPeople])

	const isValid = (value: string) => {
		if (value === '') return false
		return !Number.isNaN(Number(value))
	}

	const formIsValid = () => {
		return isValid(distance) && isValid(fuelConsumtpion) && isValid(fuelCost) && isValid(numOfPeople);
	}


	return (
		<div className="App">
			<div className='app-column'>
				<div className='margin-container'>
					<h1>Trip Cost Calculator</h1>
					<h2>A tool to help you calculate the cost of your travels</h2>

					<VSpace />

					<Input
						label='Distance (km)'
						value={distance}
						onChange={(event: any) => setDistance(event.target.value)}
					/>

					<VSpace />

					<RadioInput
						options={['Car', 'Train', 'Plane', 'Bike']}
						selectedOption={modeOfTransport}
						setOption={setModeOfTransport}
					/>

					<VSpace />

					<RadioInput
						options={fuels[modeOfTransport]}
						selectedOption={fuel}
						setOption={setFuel}
					/>

					<VSpace />

					<Input
						label={fuel === 'Electricity' ? 'Fuel Consumption (kWh/10km)' : 'Fuel Consumption (L/10km)'}
						value={fuelConsumtpion}
						onChange={(event: any) => setFuelConsumption(event.target.value)}
					/>

					<VSpace />

					<Input
						label={fuel === 'Electricity' ? 'Electricty Cost (' + currency + '/kWh)' : 'Fuel Cost (' + currency + '/L)'}
						value={fuelCost}
						onChange={(event: any) => setFuelCost(event.target.value)}
					/>

					<VSpace />

					<Input
						label={'Number of people'}
						value={String(numOfPeople)}
						onChange={(event: any) => setNumOfPeople(event.target.value)}
					/>

				</div>

				<Button
					text={calculateButtonText}
					onClick={() => {
						if (!isValidForm) {
							setCalculateButtonText('Please fill in all fields')
							setTimeout(() => {
								setCalculateButtonText('Calculate')
							}, 2000)
							setResult('')
							return
						}
						const cost = parseFloat(distance) / 10 * parseFloat(fuelConsumtpion) * parseFloat(fuelCost)
						setResult(Math.round(cost).toString())
					}}
					color={isValidForm ? '#8424FF' : '#909090'}
				/>

				{result === '' ? '' :
					<>
						<div className='margin-container'>
							<h1>{result + ' ' + currency}</h1>

							{/* If number of people is more than 1 */}
							<h2 className='black'>
								{Number(numOfPeople) !== 1 ? Number(result) / Number(numOfPeople) + ' ' + currency + '/person, split equally' : ''}
							</h2>

							{/* If number of people is only 1 */}
							<h2>
								{Number(numOfPeople) === 1 ? 'Traveling ' + distance + ' km by ' + modeOfTransport + ' using ' + fuel : ''}
							</h2>
						</div>

						{/*<Button
							text='Reset fields'
							onClick={() => {
								setDistance('');
								setFuelConsumption('');
								setFuelCost('');
								setModeOfTransport('Car');
								setFuel('');
								setNumOfPeople('');
								setResult('');
							}}
							color='#FF2424'
						/>*/}

						<Button
							text={shareButtonOptions.text}
							onClick={() => {
								navigator.clipboard.writeText('A trip of ' + distance + ' km will cost ' + result + ' ' + currency)
									.then(() => {
										setShareButtonOptions({ text: 'Copied!', color: '#18ad3b' })
										setTimeout(() => {
											setShareButtonOptions({ text: 'Copy to clipboard', color: '#1d5c2c' })
										}, 2000)
									})
									.catch(err => {
										console.log('Something went wrong', err);
									})
							}}
							color={shareButtonOptions.color}
						/>
					</>
				}
			</div>
		</div >
	);
}
