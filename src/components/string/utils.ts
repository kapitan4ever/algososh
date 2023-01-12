import { ElementStates } from '../../types/element-states'
import {swap} from '../../utils/utils'

export const stateCircle = (index: number, step: number, arr: Array<string>) => {
	if (index < step || index > arr.length - 1 - step) {
		return ElementStates.Modified
	}
	if (index === step || index === arr.length - 1 - step) {
		return ElementStates.Changing
	}
	return ElementStates.Default
}

export function reversedString (string: string) {
	const arrayLetters = string.split('');
	let endLetters = arrayLetters.length

	for (let index = 0; index < Math.floor(endLetters / 2); index++) {
		swap(arrayLetters, index, endLetters - 1)
	}
 }