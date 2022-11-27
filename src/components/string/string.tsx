import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './string.module.css'
import { stateCircle } from './utils/utils'
import { swap, delay } from '../../utils/utils'

export const StringComponent: React.FC = () => {
	const [input, setInput] = useState<string>('')
	const [inProgress, setInProgress] = useState(false)
	const [arr, setArr] = useState<string[]>([])
	const [step, setStep] = useState<number>(0)

	const reverseString = async () => {
		setInProgress(true)
		setStep(0)

		const arrOfValueInput = input.split('')
		setArr([...arrOfValueInput])
		await delay(500) //задержка 0.5с

		let start = 0
		let end = arrOfValueInput.length - 1
		while (start < end) {
			swap(arrOfValueInput, start, end)
			start += 1
			end -= 1
			setStep(prev => prev + 1)
			setArr([...arrOfValueInput])
			await delay(1000) //задержка 1с
		}

		setInProgress(false)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const handleClick = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		reverseString()
		setInput('')
	}
	return (
		<SolutionLayout title='Строка'>
			<form className={styles.layout} onSubmit={handleClick}>
				<Input isLimitText={true} maxLength={11} value={input} onChange={handleChange} />
				<Button text='Развернуть' type='submit' disabled={!input} isLoader={inProgress} />
			</form>
			<div className={styles.list}>
				{arr.length === 0
					? null
					: arr.map((letter, index, arr) => {
							return <Circle letter={letter} key={index} state={stateCircle(index, step, arr)} />
					  })}
			</div>
		</SolutionLayout>
	)
}
