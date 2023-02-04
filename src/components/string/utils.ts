import { ElementStates } from '../../types/element-states'


export const stateCircle = (index: number, step: number, arr: Array<string | number>) => {
	if (step < index || step > arr.length - 1 - index) {
		return ElementStates.Modified
	}
	if (index === step || step === arr.length - 1 - index) {
		return ElementStates.Changing
	}
	return ElementStates.Default
}

export const swap = <T>(strArr: T[], i: number, j: number): void => {
	[strArr[i], strArr[j - i]] = [strArr[j - i], strArr[i]]
}

export function reverseString (string: string) {
	const arr = string.split('')
	let end = arr.length

	for (let i = 0; i < Math.floor(end / 2); i++) {
		swap(arr, i, end - 1)
	}

	return arr
}
