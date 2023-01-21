import { reverseString } from './utils.ts'

describe('Test component StringComponent', () => {
	it('Корректно разворачивает строку с чётным количеством символов.', () => {
		expect(reverseString('1234')).toEqual(['4', '3', '2', '1'])
	})
	it('Корректно разворачивает строку с нечётным количеством символов.', () => {
		expect(reverseString('12345')).toEqual(['5', '4', '3', '2', '1'])
	})
	it('Корректно разворачивает строку с одним символом.', () => {
		expect(reverseString('1')).toEqual(['1'])
	})
	it('Корректно разворачивает пустую строку', () => {
		expect(reverseString('')).toEqual([])
	})
	// it('Correctly expands a string with an even number of characters.', async () => {
	// 	const str = 'abcd'
	// 	const expected = 'dcba'
	// 	const res = await reverseString(str)
	// 	expect(res).toBe(expected)
	// })
	// it('Correctly expands a string with an odd number of characters.', async () => {
	// 	const str = 'abcde'
	// 	const res = await reverseString(str)
	// 	expect(res).toBe('edcba')
	// })
	// it('Correctly expands a string with one character.', async () => {
	// 	const str = 'a'
	// 	const res = await reverseString(str)
	// 	expect(res).toBe('a')
	// })
	// it('Correctly expands an empty string.', async () => {
	// 	const str = ''
	// 	const res = await reverseString(str)
	// 	expect(res).toBe('')
	// })
})
