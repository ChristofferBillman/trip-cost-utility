import { useState } from 'react';

import './styles/App.css';
import './styles/Input.css';

import Input from './components/Input';
import RadioInput from './components/RadioInput';
import Button from './components/Button';

const fuels: any = {
	'Car': ['Gasoline', 'Diesel', 'Electricity', 'Ethanol'],
	'Train': [],
	'Plane': [],
	'Bike': [],
}

export default function App(): JSX.Element {

	const [distance, setDistance] = useState('');
	const [fuelConsumtpion, setFuelConsumption] = useState('');
	const [fuel, setFuel] = useState('');
	const [fuelCost, setfuelCost] = useState('');
	const [modeOfTransport, setModeOfTransport] = useState('Car');

	return (
		<div className="App">
			<div className='app-column'>
				<div className='margin-container'>
					<h1>Trip Cost Utility</h1>
					<Input
						label='Distance (km)'
						value={distance}
						onChange={(event: any) => setDistance(event.target.value)}
					/>
					<RadioInput
						options={['Car', 'Train', 'Plane', 'Bike']}
						selectedOption={modeOfTransport}
						setOption={setModeOfTransport}
					/>
					<RadioInput
						options={fuels[modeOfTransport]}
						selectedOption={fuel}
						setOption={setFuel}
					/>
					<Input
						label='Fuel Consumption (L/10km)'
						value={fuelConsumtpion}
						onChange={(event: any) => setFuelConsumption(event.target.value)}
					/>
					<Input
						label='Fuel Cost (kr)'
						value={fuelCost}
						onChange={(event: any) => setfuelCost(event.target.value)}
					/>

				</div>
				<Button text='Calculate' />
			</div>
		</div>
	);
}
