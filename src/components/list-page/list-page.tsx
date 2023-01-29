import React, { ChangeEvent, useState } from 'react'
import { Button } from '../ui/button/button'
import { Input } from '../ui/input/input'
import { Circle } from '../ui/circle/circle'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { ArrowIcon } from '../ui/icons/arrow-icon'
import { delay } from '../../utils/utils'
import { ElementStates } from '../../types/element-states'
import styles from './list-page.module.css'
import { LinkedListNode, randomArr } from './utils'

interface ILittleCicle {
	value: string
	type: 'top' | 'bottom'
}

interface IListArrItem {
	value: string
	littleCicle: ILittleCicle | undefined
	state: ElementStates
}

interface IStateProgress {
	addToHead: boolean
	addToTail: boolean
	delFromHead: boolean
	delFromTail: boolean
	addByIndex: boolean
	delByIndex: boolean
}

export const randomArray = randomArr(4)
export const list = new LinkedListNode<string>(randomArray)

const getRandomListArr = (list: LinkedListNode<string>): IListArrItem[] => {
	return list.getArr().map(item => ({
		value: item,
		state: ElementStates.Default,
		littleCicle: undefined,
	}))
}

export const ListPage: React.FC = () => {
	const [inputValue, setInputValue] = useState('')
	const [inputIndex, setInputIndex] = useState('')
	const [listArr, setListArr] = useState(getRandomListArr(list))
	const [disabled, setDisabled] = useState(false)
	const [inProgress, setInProgress] = useState<IStateProgress>({
		addToHead: false,
		addToTail: false,
		delFromHead: false,
		delFromTail: false,
		addByIndex: false,
		delByIndex: false,
	})

	const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
		setInputIndex(e.target.value)
	}

	const addHead = async () => {
		setInProgress({ ...inProgress, addToHead: true })
		setDisabled(true)
		list.prepend(inputValue)
		listArr[0].littleCicle = {
			value: inputValue,
			type: 'top',
		}
		setInputValue('')
		setListArr([...listArr])
		await delay(500)
		listArr[0].littleCicle = undefined
		listArr.unshift({
			...listArr[0],
			value: inputValue,
			state: ElementStates.Modified,
		})
		setListArr([...listArr])
		await delay(500)
		listArr[0].state = ElementStates.Default
		setListArr([...listArr])
		setInProgress({ ...inProgress, addToHead: false })
		setDisabled(false)
	}

	const addTail = async () => {
		setInProgress({ ...inProgress, addToTail: true })
		setDisabled(true)
		list.append(inputValue)
		listArr[listArr.length - 1] = {
			...listArr[listArr.length - 1],
			littleCicle: {
				value: inputValue,
				type: 'top',
			},
		}
		setInputValue('')
		setListArr([...listArr])
		await delay(500)
		listArr[listArr.length - 1] = {
			...listArr[listArr.length - 1],
			littleCicle: undefined,
		}
		setListArr([...listArr])
		listArr.push({
			value: inputValue,
			state: ElementStates.Modified,
			littleCicle: undefined,
		})
		setListArr([...listArr])
		await delay(500)
		listArr[listArr.length - 1].state = ElementStates.Default
		setListArr([...listArr])
		setInProgress({ ...inProgress, addToTail: false })
		setDisabled(false)
	}

	const delHead = async () => {
		setInProgress({ ...inProgress, delFromHead: true })
		setDisabled(true)
		listArr[0] = {
			...listArr[0],
			value: '',
			littleCicle: {
				value: listArr[0].value,
				type: 'bottom',
			},
		}
		list.deleteHead()
		setListArr([...listArr])
		await delay(500)
		listArr.shift()
		setListArr([...listArr])
		setInProgress({ ...inProgress, delFromHead: false })
		setDisabled(false)
	}

	const delTail = async () => {
		setInProgress({ ...inProgress, delFromTail: true })
		setDisabled(true)
		listArr[listArr.length - 1] = {
			...listArr[listArr.length - 1],
			value: '',
			littleCicle: {
				value: listArr[listArr.length - 1].value,
				type: 'bottom',
			},
		}
		list.deleteTail()
		setListArr([...listArr])
		await delay(500)
		listArr.pop()
		setListArr([...listArr])
		setInProgress({ ...inProgress, delFromTail: false })
		setDisabled(false)
	}

	const addOfIndex = async () => {
		setInProgress({ ...inProgress, addByIndex: true })
		setDisabled(true)
		const index = parseInt(inputIndex)
		if (index === list.getSize()) {
			setInputIndex('')
			addTail()
			return
		}
		list.addByIndex(inputValue, index)
		for (let i = 0; i <= index; i++) {
			listArr[i] = {
				...listArr[i],
				state: ElementStates.Changing,
				littleCicle: {
					value: inputValue,
					type: 'top',
				},
			}
			await delay(500)
			setListArr([...listArr])
			if (i > 0) {
				listArr[i - 1] = {
					...listArr[i - 1],
					littleCicle: undefined,
				}
			}
			setListArr([...listArr])
		}
		await delay(500)
		listArr[index] = {
			...listArr[index],
			state: ElementStates.Default,
			littleCicle: undefined,
		}
		listArr.splice(index, 0, {
			value: inputValue,
			state: ElementStates.Modified,
			littleCicle: undefined,
		})
		setListArr([...listArr])
		listArr[index].state = ElementStates.Default
		listArr.forEach(item => {
			item.state = ElementStates.Default
		})
		await delay(500)
		setListArr([...listArr])
		setInputValue('')
		setInputIndex('')
		setInProgress({ ...inProgress, addByIndex: false })
		setDisabled(false)
	}

	const delOfIndex = async () => {
		setInProgress({ ...inProgress, delByIndex: true })
		setDisabled(true)
		const index = parseInt(inputIndex)
		list.deleteByIndex(index)
		for (let i = 0; i <= index; i++) {
			listArr[i] = {
				...listArr[i],
				state: ElementStates.Changing,
			}
			await delay(500)
			setListArr([...listArr])
		}
		listArr[index] = {
			...listArr[index],
			value: '',
			littleCicle: {
				value: listArr[index].value,
				type: 'bottom',
			},
		}
		await delay(500)
		setListArr([...listArr])
		listArr.splice(index, 1)
		listArr[index - 1] = {
			...listArr[index - 1],
			value: listArr[index - 1].value,
			state: ElementStates.Modified,
			littleCicle: undefined,
		}
		await delay(500)
		setListArr([...listArr])
		listArr.forEach(item => {
			item.state = ElementStates.Default
		})
		await delay(500)
		setListArr([...listArr])
		setInputIndex('')
		setInProgress({ ...inProgress, delByIndex: false })
		setDisabled(false)
	}

	return (
		<SolutionLayout title='Связный список'>
			<form className={styles.layout}>
				<div className={styles.row}>
					<Input
						data-cy='input'
						placeholder='Введите значение'
						isLimitText={true}
						maxLength={4}
						value={inputValue}
						onChange={handleChangeValue}
						extraClass={styles.input}
					/>
					<Button
						data-cy='add_head'
						text='Добавить в head'
						extraClass={styles.btn}
						onClick={addHead}
						isLoader={inProgress.addToHead}
						disabled={!inputValue || disabled || listArr.length >= 8}
					/>
					<Button
						data-cy='add_tail'
						text='Добавить в tail'
						extraClass={styles.btn}
						onClick={addTail}
						isLoader={inProgress.addToTail}
						disabled={!inputValue || disabled || listArr.length >= 8}
					/>
					<Button
						data-cy='remove_head'
						text='Удалить из head'
						extraClass={styles.btn}
						onClick={delHead}
						isLoader={inProgress.delFromHead}
						disabled={listArr.length <= 1 || disabled}
					/>
					<Button
						text='Удалить из tail'
						extraClass={styles.btn}
						onClick={delTail}
						isLoader={inProgress.delFromTail}
						disabled={listArr.length <= 1 || disabled}
					/>
				</div>
				<div className={styles.row}>
					<Input
						placeholder='Введите индекс'
						value={inputIndex}
						onChange={handleChangeIndex}
						extraClass={styles.input}
						disabled={disabled}
						max={8}
						maxLength={1}
						type={'number'}
					/>
					<Button
						data-cy='add_by_index'
						text='Добавить по индексу'
						extraClass={styles.btnlong}
						onClick={addOfIndex}
						isLoader={inProgress.addByIndex}
						disabled={
							!inputIndex ||
							!inputValue ||
							disabled ||
							listArr.length >= 8 ||
							Number(inputIndex) > listArr.length - 1
						}
					/>
					<Button
						text='Удалить по индексу'
						extraClass={styles.btnlong}
						onClick={delOfIndex}
						isLoader={inProgress.delByIndex}
						disabled={
							disabled ||
							listArr.length === 0 ||
							Number(inputIndex) > listArr.length - 1 ||
							Number(inputIndex) < 1
						}
					/>
				</div>
			</form>
			<div className={styles.list}>
				{listArr.map((item, index, arr) => {
					return (
						<div className={styles.cicleWrap} key={index}>
							<Circle
								key={index}
								index={index}
								letter={item.value}
								state={item.state}
								head={index === 0 ? 'head' : ''}
								tail={index === list.getSize() - 1 ? 'tail' : ''}
							/>
							{index < arr.length - 1 && <ArrowIcon fill={'#0032FF'} />}

							{item.littleCicle && (
								<div
									className={
										item.littleCicle.type === 'top'
											? styles.littleUpCircle
											: styles.littleDownCicrcle
									}
								>
									<Circle
										letter={item.littleCicle.value}
										isSmall={true}
										state={ElementStates.Changing}
									/>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</SolutionLayout>
	)
}
