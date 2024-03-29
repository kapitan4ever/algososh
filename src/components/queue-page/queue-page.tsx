import React, { ChangeEvent, useState } from 'react'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { queue } from './utils'
import { delay } from '../../utils/utils'
import styles from './queue-page.module.css'
import { ElementStates } from '../../types/element-states'

type TInProgress = {
	push: boolean
	pop: boolean
}

export const QueuePage: React.FC = () => {
	const [input, setInput] = useState('')
	const [arr, setArr] = useState(queue.getQueue())
	const [head, setHead] = useState(queue.getHead())
	const [tail, setTail] = useState(queue.getTail())
	const [curr, setCurr] = useState(-1)
	const [inProgress, setInProgress] = useState<TInProgress>({ push: false, pop: false })


	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const enqueue = async (value: string) => {
		setInProgress(prev => {
			return {
				...prev,
				push: true,
			}
		})
		queue.enqueue(value)
		setInput('')
		setArr([...queue.getQueue()])
		setTail(queue.getTail())
		setCurr(tail % queue.getSize())
		await delay(500)
		setCurr(-1)
		setInProgress(prev => {
			return {
				...prev,
				push: false,
			}
		})
	}

	const dequeue = async () => {
		setInProgress(prev => {
			return {
				...prev,
				pop: true,
			}
		})
		if(queue.getLength() > 0) {
			queue.dequeue()
			setArr([...queue.getQueue()])
			setCurr(queue.getHead() % queue.getSize())
			await delay(500)
			setHead(queue.getHead())
			setCurr(-1)
		}
		setInProgress(prev => {
			return {
				...prev,
				pop: false,
			}
		})
	}

	const clear = () => {
		setInProgress(prev => {
			return {
				...prev,
				clearInt: true,
			}
		})
		queue.clear()
		setArr([...queue.getQueue()])
		setHead(queue.getHead())
		setTail(queue.getTail())
		setInProgress(prev => {
			return {
				...prev,
				clearInt: false,
			}
		})
	}

	return (
		<SolutionLayout title='Очередь'>
			<form className={styles.layout} onSubmit={evt => evt.preventDefault()}>
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
						disabled={!input || tail === 7}
						onClick={() => enqueue(input)}
						isLoader={inProgress.push}
					/>
					<Button
						text='Удалить'
						disabled={(!input && !queue.getLength()) || head === 7}
						onClick={() => dequeue()}
						isLoader={inProgress.pop}
					/>
				</div>
				<Button text='Очистить' onClick={() => clear()} disabled={head === 0 && tail === 0} />
			</form>
			<div className={styles.list}>
				{arr.map((item, index) => {
					return (
						<Circle
							key={index}
							index={index}
							letter={item}
							state={index === curr ? ElementStates.Changing : ElementStates.Default}
							head={index === head && queue.isEmpty() === false ? 'head' : ''}
							tail={index === tail - 1 && queue.isEmpty() === false ? 'tail' : ''}
						/>
					)
				})}
			</div>
		</SolutionLayout>
	)
}
