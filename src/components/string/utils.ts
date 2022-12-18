import { ElementStates } from '../../types/element-states'

export const stateCircle = (index: number, step: number, arr: Array<string>) => {
	if (index < step || index > arr.length - 1 - step) {
		return ElementStates.Modified
	}
	if (index === step || index === arr.length - 1 - step) {
		return ElementStates.Changing
	}
	return ElementStates.Default
}
