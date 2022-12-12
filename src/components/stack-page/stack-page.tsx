import React from 'react'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './stack-page.module.css'

export const StackPage: React.FC = () => {
	return (
		<SolutionLayout title='Стек'>
			<form className={styles.layout}>
				<div className={styles.leftWrap}>
					<Input />
					<Button text='Добавить' />
					<Button text='Удалить' />
				</div>

				<Button text='Очистить' />
			</form>
			<div className={styles.list}>
				<Circle index={0} head='top' letter='1' />
				<Circle index={1} letter='2' />
			</div>
		</SolutionLayout>
	)
}
