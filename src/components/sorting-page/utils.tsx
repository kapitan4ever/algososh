import { Dispatch, SetStateAction } from 'react'
import { ElementStates } from '../../types/element-states'
import { TNewArr } from '../../types/sorting'
import { delay, swap } from '../../utils/utils'

//задержка вывода
const delaySort = async (
	arr: TNewArr[],
	setArr: Dispatch<SetStateAction<TNewArr[]>>,
	wait: number,
) => {
	setArr([...arr])
	await delay(wait)
}

//сортировка пузырьком
export const bubbleSort = async (
	isAscending: boolean,
	arr: TNewArr[],
	setArr: Dispatch<SetStateAction<TNewArr[]>>,
	wait: number,
) => {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let z = 0; z < arr.length - 1 - i; z++) {
			arr[z].state = ElementStates.Changing
			arr[z + 1].state = ElementStates.Changing
			await delaySort(arr, setArr, wait)
			if (isAscending) {
				if (arr[z].item > arr[z + 1].item) {
					swap(arr, z, z + 1)
					await delaySort(arr, setArr, wait)
				}
			} else {
				if (arr[z].item < arr[z + 1].item) {
					swap(arr, z, z + 1)
					await delaySort(arr, setArr, wait)
				}
			}
			arr[z].state = ElementStates.Default
			arr[z + 1].state = ElementStates.Default
		}
		arr[arr.length - i - 1].state = ElementStates.Modified
		await delaySort(arr, setArr, wait)
	}
	if (arr.length) arr[0].state = ElementStates.Modified
	await delaySort(arr, setArr, wait)
}

//сортировка выбором
export const selectionSort = async (
	isAscending: boolean,
	arr: TNewArr[],
	setArr: Dispatch<SetStateAction<TNewArr[]>>,
	wait: number,
) => {
	for (let i = 0; i < arr.length; i++) {
		let maxInd = i
		arr[maxInd].state = ElementStates.Changing
		setArr([...arr])
		for (let z = i + 1; z < arr.length; z++) {
			arr[z].state = ElementStates.Changing
			await delaySort(arr, setArr, wait)
			if (isAscending) {
				if (arr[maxInd].item > arr[z].item) maxInd = z
			} else {
				if (arr[maxInd].item < arr[z].item) maxInd = z
			}
			arr[z].state = ElementStates.Default
			await delaySort(arr, setArr, wait)
		}
		swap(arr, i, maxInd)
		arr[maxInd].state = ElementStates.Default
		arr[i].state = ElementStates.Modified
		await delaySort(arr, setArr, wait)
	}
}
