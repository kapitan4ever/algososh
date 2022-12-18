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


	return (
		<SolutionLayout title='Очередь'>
			<form className={styles.layout}>
				<div className={styles.leftWrap}>
					<Input isLimitText={true} maxLength={4} value={input} onChange={handleChange} />
					<Button text='Добавить' disabled={!input || tail === 7} onClick={() => enqueue(input)} />
					<Button text='Удалить' />
				</div>
				<Button text='Очистить' />
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
