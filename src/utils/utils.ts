import { ElementStates } from '../types/element-states'

export const swap = <T>(strArr: T[], i: number, j: number): void => {
	[strArr[i], strArr[j]] = [strArr[j], strArr[i]]
}

export const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

export function randomArr() {
	const min = 0
	const max = 100
	const minLen = 3
	const maxLen = 17
	let res = []
	for (let i = minLen; i < maxLen; i++) {
		res.push({ item: randomInteger(min, max), state: ElementStates.Default })
	}
	return res
}

function randomInteger(min: number, max: number) {
	let rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand)
	return rand
}
