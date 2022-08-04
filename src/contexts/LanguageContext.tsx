import { createContext, useContext } from "react";

interface languageContextProps {
	children: React.ReactNode;
	language: string;
}

type Language = {
	Name: string;
	Title: string;
	Description: string;
	Distance: string;
	ModesOfTransport: string[];
	Fuels: any,
	CannotPickFuelType: string;
	FuelConsumption: string;
	ElectricityConsumption: string;
	FuelCost: string;
	ElectricityCost: string;
	NumOfPeople: string;
	FillAllFields: string;
	Calculate: string;
	CopyToClipboard: string;
	Copied: string;
	Result: string;
	Currency: string;
	CostPerPerson: string;
	MustBeNumber: string;
	getClipboardText: (distance: string, fuelConsumption: string, fuelCost: string,
		currency: string, result: string, numOfPeople: string) => string;
}

const LangContext = createContext({} as Language);

export const useLangContext = () => {
	const context = useContext(LangContext);

	if (context === undefined) {
		throw new Error("LangContext must be used within a LanguageContextProvider");
	}

	return context;
}

export default function LanguageContextProvider({ children, language }: languageContextProps): any {

	const lang: Language | undefined = translations.find(lang => lang.Name === language)

	if (lang === undefined) {
		throw new Error(`Language ${language} not found`);
	}

	return (
		<LangContext.Provider value={lang}>
			{children}
		</LangContext.Provider>
	);
}

const translations: Language[] = [
	{
		Name: "EN",
		Title: 'Trip Cost Calculator',
		Description: 'A tool to help you calculate the cost of your travels',
		Distance: 'Distance',
		ModesOfTransport: ['Car', 'Train', 'Plane', 'Bike'],
		Fuels: {
			Car: ['Gasoline', 'Diesel', 'Electricity', 'Ethanol'],
			Train: [],
			Plane: [],
			Bike: []
		},
		CannotPickFuelType: 'Cannot pick fuel for this mode of transport',
		FuelConsumption: 'Fuel consumption',
		ElectricityConsumption: 'Electricity consumption',
		FuelCost: 'Fuel cost',
		ElectricityCost: 'Electricity cost',
		NumOfPeople: 'Number of people',
		FillAllFields: 'Please fill all fields',
		Calculate: 'Calculate',
		CopyToClipboard: 'Copy to clipboard',
		Copied: 'Copied!',
		Result: 'Result',
		Currency: '$',
		CostPerPerson: '/person, split equally',
		MustBeNumber: 'Must be a number',
		getClipboardText: (distance: string, fuelConsumption: string, fuelCost: string,
			currency: string, result: string, numOfPeople: string) => {
			return `🚗 Trip details 🚗

			Distance: ${distance} km
			Fuel consumption: ${fuelConsumption} liters per 100 km
			Fuel cost: ${fuelCost} ${currency} per liter
			
			💸 Cost 💸
			${result} ${currency}${Number(numOfPeople) !== 1 ? ', ' + Number(result) / Number(numOfPeople) + ' ' + currency + '/person, split equally among ' + Number(numOfPeople) + ' people' : ''}
			
			Calculated with Trip Cost Calculator, made by @popkrull`
		}
	},
	{
		Name: 'SE',
		Title: 'Reseräknaren',
		Description: 'Ett verktyg för att hjälpa dig räkna ut din resekostnad.',
		Distance: 'Avstånd',
		ModesOfTransport: ['Bil', 'Tåg', 'Flyg', 'Cykel'],
		Fuels: {
			Bil: ['Bensin', 'Diesel', 'El', 'Etanol'],
			Tåg: [],
			Flyg: [],
			Cykel: []
		},
		CannotPickFuelType: 'Kan ej välja bränsle för detta transportsätt',
		FuelConsumption: 'Bränsleförbrukning',
		ElectricityConsumption: 'Elförbrukning',
		FuelCost: 'Bränslekostnad',
		ElectricityCost: 'Elpris',
		NumOfPeople: 'Antal personer',
		FillAllFields: 'Fyll i alla fält',
		Calculate: 'Beräkna',
		CopyToClipboard: 'Kopiera till urklipp',
		Copied: 'Kopierad!',
		Result: 'Din resekostnad är',
		Currency: 'kr',
		CostPerPerson: '/person, delat lika',
		MustBeNumber: 'Måste vara ett nummer',
		getClipboardText: (distance: string, fuelConsumption: string, fuelCost: string,
			currency: string, result: string, numOfPeople: string) => {
			return `🚗 Resedetaljer 🚗

Avstånd: ${distance} km
Bränsleförbrukning: ${fuelConsumption} liter per 100km
Bränslekostnad: ${fuelCost} ${currency} per liter

💸 Kostnad 💸
${result} ${currency}${Number(numOfPeople) !== 1 ? ', ' + Number(result) / Number(numOfPeople) + ' ' + currency + '/person, delat lika mellan ' + Number(numOfPeople) + ' personer' : ''}

Uträknat med reseräknaren, skapad av @popkrull`
		}
	}
]