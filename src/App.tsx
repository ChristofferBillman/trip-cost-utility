import { useEffect, useState } from 'react';

import './styles/App.css';
import './styles/Input.css';

import Input from './components/Input';
import RadioInput from './components/RadioInput';
import Button from './components/Button';
import VSpace from './components/VSpace';
import { useLangContext } from './contexts/LanguageContext';

export default function App(): JSX.Element {


	const locale: any = useLangContext();

	const [distance, setDistance] = useState('');
	const [fuelConsumtpion, setFuelConsumption] = useState('');
	const [fuel, setFuel] = useState(locale.Fuels[0]);
	const [fuelCost, setFuelCost] = useState('');
	const [modeOfTransport, setModeOfTransport] = useState(locale.ModesOfTransport[0]);

	const [numOfPeople, setNumOfPeople] = useState('');

	const [currency] = useState(locale.Currency);
	const [result, setResult] = useState('');
	const [isValidForm, setIsValidForm] = useState(false);

	const [shareButtonOptions, setShareButtonOptions] = useState({ text: locale.CopyToClipboard, color: '#1d5c2c' });
	const [calculateButtonText, setCalculateButtonText] = useState(locale.Calculate);

	const isValid = (value: string) => {
		if (value === '') return false
		return !Number.isNaN(Number(value))
	}

	// check form validity AFTER values have been updated, thus using useEffect
	useEffect(() => {
		const formIsValid = () => {
			return isValid(distance) && isValid(fuelConsumtpion) && isValid(fuelCost) && isValid(numOfPeople);
		}
		setIsValidForm(formIsValid());
	}, [distance, fuelConsumtpion, fuelCost, modeOfTransport, numOfPeople])

	// when result (i.e when calculate is pressed) changes, scroll to the bottom of the page.
	useEffect(() => {
		window.scrollTo(0, 4000)
	}, [result])

	const getClipboardText = () => {
		return locale.getClipboardText(distance, fuelConsumtpion, fuelCost, currency, result, numOfPeople);
	}


	return (
		<div className="App">
			<div className='app-column'>
				<div className='margin-container'>

					<h1>{locale.Title}</h1>
					<h2>{locale.Description}</h2>

					<VSpace />

					<Input
						label={locale.Distance}
						rightLabel='(km)'
						value={distance}
						onChange={(event: any) => setDistance(event.target.value)}
					/>

					<VSpace />

					<RadioInput
						options={locale.ModesOfTransport}
						selectedOption={modeOfTransport}
						setOption={setModeOfTransport}
					/>

					<VSpace />

					<RadioInput
						options={locale.Fuels[modeOfTransport]}
						selectedOption={fuel}
						setOption={setFuel}
					/>

					<VSpace />

					<Input
						label={fuel === locale.Fuels[modeOfTransport][2] ? locale.ElectricityConsumption : locale.FuelConsumption}
						rightLabel={fuel === locale.Fuels[modeOfTransport][2] ? '(kWh/10km)' : '(L/10km)'}
						value={fuelConsumtpion}
						onChange={(event: any) => setFuelConsumption(event.target.value)}
					/>

					<VSpace />

					<Input
						label={fuel === locale.Fuels[modeOfTransport][2] ? locale.ElectricityCost : locale.FuelCost}
						rightLabel={fuel === locale.Fuels[modeOfTransport[2]] ? '(' + currency + '/kWh)' : '(' + currency + '/L)'}
						value={fuelCost}
						onChange={(event: any) => setFuelCost(event.target.value)}
					/>

					<VSpace />

					<Input
						label={locale.NumOfPeople}
						value={String(numOfPeople)}
						onChange={(event: any) => setNumOfPeople(event.target.value)}
					/>

				</div>

				<Button
					text={calculateButtonText}
					onClick={() => {
						if (!isValidForm) {
							setCalculateButtonText(locale.FillAllFields)
							setTimeout(() => {
								setCalculateButtonText(locale.Calculate)
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
								{Number(numOfPeople) !== 1 ? Number(result) / Number(numOfPeople) + ' ' + currency + locale.CostPerPerson : ''}
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
								navigator.clipboard.writeText(getClipboardText())
									.then(() => {
										setShareButtonOptions({ text: locale.Copied, color: '#18ad3b' })
										setTimeout(() => {
											setShareButtonOptions({ text: locale.CopyToClipboard, color: '#1d5c2c' })
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
