import { FC, useState } from 'react'
import { Direction } from '../../types/direction'
import { delay, swap } from '../../utils/utils'
import { Button } from '../ui/button/button'
import { Column } from '../ui/column/column'
import { RadioInput } from '../ui/radio-input/radio-input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { randomArr } from '../../utils/utils'
import styles from './sorting-page.module.css'
import { ElementStates } from '../../types/element-states'

type TNewArr = {
	item: number
	state: ElementStates
}

type TInProgress = {
	ascending: boolean
	descending: boolean
}

export const SortingPage: FC = () => {
	const [newArr, setNewArr] = useState<TNewArr[]>([])
	const [inProgress, setInProgress] = useState<TInProgress>({ ascending: false, descending: false })
	const [checked, setChecked] = useState<string>('selection')

	//генерация массива
	const handleNewArr = () => {
		setNewArr(randomArr())
	}

	//сортировка массива
	const handleAscending = () => {
		if (checked === 'selection') selectionSort(true)
		if (checked === 'bubble') bubbleSort(true)
	}
	const handleDescending = () => {
		if (checked === 'selection') selectionSort(false)
		if (checked === 'bubble') bubbleSort(false)
	}

	//задержка вывода
	const delaySort = async () => {
		setNewArr([...newArr])
		await delay(250)
	}

	//сортировка пузырьком
	const bubbleSort = async (isAscending: boolean) => {
		setInProgress({ ...inProgress, ascending: isAscending, descending: !isAscending })
		for (let i = 0; i < newArr.length - 1; i++) {
			for (let z = 0; z < newArr.length - 1 - i; z++) {
				newArr[z].state = ElementStates.Changing
				newArr[z + 1].state = ElementStates.Changing
				await delaySort()
				if (isAscending) {
					if (newArr[z].item > newArr[z + 1].item) {
						swap(newArr, z, z + 1)
						await delaySort()
					}
				} else {
					if (newArr[z].item < newArr[z + 1].item) {
						swap(newArr, z, z + 1)
						await delaySort()
					}
				}
				newArr[z].state = ElementStates.Default
				newArr[z + 1].state = ElementStates.Default
			}
			newArr[newArr.length - i - 1].state = ElementStates.Modified
			await delaySort()
		}
		newArr[0].state = ElementStates.Modified
		await delaySort()
		setInProgress({ ...inProgress, ascending: false, descending: false })
	}

	//сортировка выбором
	const selectionSort = async (isAscending: boolean) => {
		setInProgress({ ...inProgress, ascending: isAscending, descending: !isAscending })
		for (let i = 0; i < newArr.length; i++) {
			let maxInd = i
			newArr[maxInd].state = ElementStates.Changing
			setNewArr([...newArr])
			for (let z = i + 1; z < newArr.length; z++) {
				newArr[z].state = ElementStates.Changing
				await delaySort()
				if (isAscending) {
					if (newArr[maxInd].item > newArr[z].item) maxInd = z
				} else {
						if (newArr[maxInd].item < newArr[z].item) maxInd = z
					}
					newArr[z].state = ElementStates.Default
					await delaySort()
				}
				swap(newArr, i, maxInd)
				newArr[maxInd].state = ElementStates.Default
				newArr[i].state = ElementStates.Modified
				await delaySort()
			}
			setInProgress({ ...inProgress, ascending: false, descending: false })
		}

	return (
		<SolutionLayout title='Сортировка массива'>
			<form className={styles.layout}>
				<div className={styles.radioWrap}>
					<RadioInput
						label='Выбор'
						value='selection'
						name='sorting'
						checked={checked === 'selection'}
						onChange={() => setChecked('selection')}
						disabled={inProgress.ascending || inProgress.descending}
					/>
					<RadioInput
						label='Пузырек'
						value='bubble'
						name='sorting'
						checked={checked === 'bubble'}
						onChange={() => setChecked('bubble')}
						disabled={inProgress.ascending || inProgress.descending}
					/>
				</div>
				<div className={styles.sortingWrap}>
					<Button
						text='По возрастанию'
						sorting={Direction.Ascending}
						extraClass={styles.btn}
						disabled={inProgress.ascending || inProgress.descending}
						isLoader={inProgress.ascending}
						onClick={() => handleAscending()}
					/>
					<Button
						text='По убыванию'
						sorting={Direction.Descending}
						extraClass={styles.btn}
						disabled={inProgress.ascending || inProgress.descending}
						isLoader={inProgress.descending}
						onClick={() => handleDescending()}
					/>
				</div>
				<div>
					<Button
						text='Новый массив'
						extraClass={styles.btn}
						onClick={handleNewArr}
						disabled={inProgress.ascending || inProgress.descending}
					/>
				</div>
			</form>
			<div className={styles.list}>
				{newArr.length === 0
					? null
					: newArr.map((item, index) => {
							return <Column index={item.item} key={index} state={item.state} />
					  })}
			</div>
		</SolutionLayout>
	)
}
