export const getFibNumbers = (count: number) => {
	const fibNumbers = [1, 1]
	for (let i = 2; i <= count; i++) {
		fibNumbers.push(fibNumbers[i - 2] + fibNumbers[i - 1])
	}
	return fibNumbers
}
