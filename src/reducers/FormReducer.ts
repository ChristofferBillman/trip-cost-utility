interface FormState {
	distance: string
	fuelConsumption: string
	fuelType: string
	fuelCost: string
	numOfPeople: string
	modeOfTransport: string
	isValid: boolean
}

interface FormAction {
	type: string
	payload:
	{
		field: string,
		value: string
	}
}
export enum FormActionTypes {
	SET_FORM_FIELD = 'SET_FORM_FIELD',
}

export const DEFAULT_FORM_STATE = {
	distance: '',
	fuelConsumption: '',
	fuelType: '',
	fuelCost: '',
	numOfPeople: '',
	modeOfTransport: '',
	isValid: false,
}

export function FormReducer(state: FormState, action: FormAction): FormState {
	const { type } = action
	const { field, value } = action.payload

	switch (type) {
		case FormActionTypes.SET_FORM_FIELD:
			return {
				...state,
				[field]: value,
				isValid: fieldIsValid(value)
			}
		default:
			return state
	}
}

function fieldIsValid(value: string): boolean {
	if (value === '') return false
	return !Number.isNaN(Number(value)) && Number(value) > 0;
}