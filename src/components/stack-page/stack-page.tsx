import React, { ChangeEvent, useState } from 'react'
import { ElementStates } from '../../types/element-states'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { stack } from './stack'
import { delay } from '../../utils/utils'
import styles from './stack-page.module.css'

type TInProgress = {
	push: boolean
	pop: boolean
}

export const StackPage: React.FC = () => {
	const [arr, setArr] = useState<string[]>([])
	const [input, setInput] = useState('')
	const [curr, setCurr] = useState(0)
	const [inProgress, setInProgress] = useState<TInProgress>({ push: false, pop: false })

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const push = async (value: string) => {
		setInProgress(prev => {
			return {
				...prev,
				push: true,
			}
		})
		stack.push(value)
		setArr(stack.getStack())
		setInput('')
		await delay(500)
		setCurr(curr + 1)
		setInProgress(prev => {
			return {
				...prev,
				push: false,
			}
		})
	}

	const pop = async () => {
		setInProgress(prev => ({
			...prev,
			pop: true,
		}))
		setCurr(stack.getIndex())
		await delay(500)
		stack.pop()
		setArr([...stack.getStack()])
		setInProgress(prev => ({
			...prev,
			pop: false
		}))
	}

	const clear = () => {
		stack.clear()
		setArr(stack.getStack())
		setCurr(0)
	}

	const getIndex = () => {
		return stack.getIndex()
	}

	return (
		<SolutionLayout title='Стек'>
			<form data-cy='form' className={styles.layout} onSubmit={evt => evt.preventDefault()}>
				<div className={styles.leftWrap}>
					<Input
						data-cy='input'
						isLimitText={true}
						maxLength={4}
						value={input}
						onChange={handleChange}
					/>
					<Button
						data-cy='submit'
						text='Добавить'
						onClick={() => push(input)}
						disabled={!input}
						isLoader={inProgress.push}
					/>
					<Button
						text='Удалить'
						onClick={() => pop()}
						disabled={stack.getSize() < 1 || inProgress.push}
						isLoader={inProgress.pop}
					/>
				</div>

				<Button
					text='Очистить'
					onClick={() => clear()}
					disabled={stack.getSize() < 1 || inProgress.push || inProgress.pop}
				/>
			</form>
			<div className={styles.list}>
				{arr.map((item, index) => {
					return (
						<Circle
							index={index}
							state={index === curr ? ElementStates.Changing : ElementStates.Default}
							key={index}
							head={getIndex() === index ? 'top' : ''}
							letter={item}
						/>
					)
				})}
			</div>
		</SolutionLayout>
	)
}
