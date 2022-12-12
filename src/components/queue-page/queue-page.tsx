import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'

export const QueuePage: React.FC = () => {
  return (
		<SolutionLayout title='Очередь'>
			<form className={styles.layout}>
				<div className={styles.leftWrap}>
					<Input maxLength={4} />
					<Button text='Добавить' />
					<Button text='Удалить' />
				</div>

				<Button text='Очистить' />
			</form>
			<div className={styles.list}>
				<Circle index={0} />
				<Circle index={1} />
			</div>
		</SolutionLayout>
	)
};
