import { FC, useEffect, useState } from 'react'
import { Direction } from '../../types/direction'
import { Button } from '../ui/button/button'
import { Column } from '../ui/column/column'
import { RadioInput } from '../ui/radio-input/radio-input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { randomArr } from '../../utils/utils'
import styles from './sorting-page.module.css'
import { TNewArr, TInProgress } from '../../types/sorting'
import { bubbleSort, selectionSort } from './utils'


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
		setInProgress({...inProgress, ascending: true, descending: false})
		if (checked === 'selection') selectionSort(true, newArr, setNewArr, 250)
		if (checked === 'bubble') bubbleSort(true, newArr, setNewArr, 250)
		setInProgress({ ...inProgress, ascending: false, descending: false })
	}
	const handleDescending = () => {
		setInProgress({ ...inProgress, ascending: false, descending: true })
		if (checked === 'selection') selectionSort(false, newArr, setNewArr, 250)
		if (checked === 'bubble') bubbleSort(false, newArr, setNewArr, 250)
		setInProgress({ ...inProgress, ascending: false, descending: false })
	}
	
//первоначальная загрузка массива
		 useEffect(() => {
				setNewArr(randomArr())
			}, [])

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
				{newArr.map((item, index) => {
							return <Column index={item.item} key={index} state={item.state} />
					  })}
			</div>
		</SolutionLayout>
	)
}
