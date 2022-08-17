import { useEffect, useState, useReducer } from 'react';

import './styles/App.css';
import './styles/Input.css';

import Input from './components/Input';
import RadioInput from './components/RadioInput';
import Button from './components/Button';
import VSpace from './components/VSpace';
import Footer from './components/Footer';
import { useLanguageContext, Language } from './contexts/LanguageContext';
import { FormReducer, FormActionTypes as FormActions, DEFAULT_FORM_STATE } from './reducers/FormReducer';

export default function App(): JSX.Element {

	const locale: Language = useLanguageContext();

	const [form, dispatch] = useReducer(
		FormReducer,
		{
			...DEFAULT_FORM_STATE,
			modeOfTransport: locale.ModesOfTransport[0]
		});

	const [currency] = useState(locale.Currency);
	const [result, setResult] = useState('');

	const [shareButtonOptions, setShareButtonOptions] = useState({ text: locale.CopyToClipboard, color: '#1d5c2c' });
	const [calculateButtonText, setCalculateButtonText] = useState(locale.Calculate);

	// when result (i.e when calculate is pressed) changes, scroll to the bottom of the page.
	const [firstRender, setFirstRender] = useState(true)
	useEffect(() => {
		if (firstRender) {
			setFirstRender(false)
			return
		}
		window.scrollTo({
			top: 4000,
			behavior: 'smooth'
		})
	}, [result, firstRender]);

	const getClipboardText = () => {
		return locale.getClipboardText(form.distance, form.fuelConsumption, form.fuelCost, currency, result, form.numOfPeople);
	}

	const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(
			{
				type: FormActions.SET_FORM_FIELD,
				payload:
				{
					value: value,
					field: name
				}
			})
	}

	return (
		<div className="App">
			<div className='app-column'>
				<div>
					<div className='margin-container'>

						<h1>{locale.Title}</h1>
						<h2>{locale.Description}</h2>

						<VSpace />

						<Input
							label={locale.Distance}
							name='distance'
							rightLabel='(km)'
							value={form.distance}
							onChange={onFieldChange}
						/>

						<VSpace />

						<RadioInput
							options={locale.ModesOfTransport}
							name='modeOfTransport'
							disabledOptions={[locale.ModesOfTransport[1], locale.ModesOfTransport[2], locale.ModesOfTransport[3]]}
							selectedOption={form.modeOfTransport}
							setOption={onFieldChange}
						/>

						<VSpace />

						<RadioInput
							options={locale.Fuels[form.modeOfTransport]}
							name='fuelType'
							selectedOption={form.fuelType}
							setOption={onFieldChange}
						/>

						<VSpace />

						<Input
							label={form.fuelType === locale.Fuels[form.modeOfTransport][2] ? locale.ElectricityConsumption : locale.FuelConsumption}
							name='fuelConsumption'
							rightLabel={form.fuelType === locale.Fuels[form.modeOfTransport][2] ? '(kWh/10km)' : '(L/10km)'}
							value={form.fuelConsumption}
							onChange={onFieldChange}
						/>

						<VSpace />

						<Input
							label={form.fuelType === locale.Fuels[form.modeOfTransport][2] ? locale.ElectricityCost : locale.FuelCost}
							name='fuelCost'
							rightLabel={form.fuelType === locale.Fuels[form.modeOfTransport[2]] ? '(' + currency + '/kWh)' : '(' + currency + '/L)'}
							value={form.fuelCost}
							onChange={onFieldChange}
						/>

						<VSpace />

						<Input
							label={locale.NumOfPeople}
							name='numOfPeople'
							value={String(form.numOfPeople)}
							onChange={onFieldChange}
						/>
					</div>
					<Button
						text={calculateButtonText}
						onClick={() => {
							if (!form.isValid) {
								setCalculateButtonText(locale.FillAllFields)
								setTimeout(() => {
									setCalculateButtonText(locale.Calculate)
								}, 2000)
								setResult('')
								return
							}
							const cost = parseFloat(form.distance) / 10 * parseFloat(form.fuelConsumption) * parseFloat(form.fuelCost)
							setResult(Math.round(cost).toString())
						}}
						color={form.isValid ? '#8424FF' : '#909090'}
					/>

					{result === '' ? '' :
						<>
							<div className='margin-container'>
								<h1>{result + ' ' + currency}</h1>

								{/* If number of people is more than 1 */}
								<h2 className='black'>
									{Number(form.numOfPeople) !== 1 ? Number(result) / Number(form.numOfPeople) + ' ' + currency + locale.CostPerPerson : ''}
								</h2>

								{/* If number of people is only 1 */}
								<h2>
									{Number(form.numOfPeople) === 1 ? 'Traveling ' + form.distance + ' km by ' + form.modeOfTransport + ' using ' + form.fuelType : ''}
								</h2>

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
							</div>

							<Button
								text={shareButtonOptions.text}
								onClick={() => {
									if (navigator.clipboard === undefined) {
										setShareButtonOptions({ text: locale.CopyClipboardFailed, color: '#FF2424' })
										setTimeout(() => {
											setShareButtonOptions({ text: locale.CopyToClipboard, color: '#1d5c2c' })
										}, 2000)
										return
									}
									navigator.clipboard.writeText(getClipboardText())
										.then(() => {
											setShareButtonOptions({ text: locale.Copied, color: '#18ad3b' })
											setTimeout(() => {
												setShareButtonOptions({ text: locale.CopyToClipboard, color: '#1d5c2c' })
											}, 2000)
										})
										.catch(err => {
											console.error(err)
										})
								}}
								color={shareButtonOptions.color}
							/>
						</>
					}
					<Footer />
				</div>
			</div >
		</div >
	);
}
