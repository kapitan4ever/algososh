import React from 'react'
import { Direction } from '../../types/direction'
import { Button } from '../ui/button/button'
import { Column } from '../ui/column/column'
import { RadioInput } from '../ui/radio-input/radio-input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './sorting-page.module.css'

export const SortingPage: React.FC = () => {
	return (
		<SolutionLayout title='Сортировка массива'>
			<form className={styles.layout}>
				<div className={styles.radioWrap}>
					<RadioInput label='Выбор' value='selectionSort' name='sorting' defaultChecked />
					<RadioInput label='Пузырек' value='bubbleSort' name='sorting' />
				</div>
				<div className={styles.sortingWrap}>
					<Button text='По возрастанию' sorting={Direction.Ascending} extraClass={styles.btn} />
					<Button text='По убыванию' sorting={Direction.Descending} extraClass={styles.btn} />
				</div>
				<div>
					<Button text='Новый массив' extraClass={styles.btn} />
				</div>
			</form>
			<div className={styles.list}>
				<Column index={10} />
				<Column index={50} />
			</div>
		</SolutionLayout>
	)
}
