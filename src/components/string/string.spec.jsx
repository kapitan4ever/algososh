import { reverseString } from './utils.ts'

describe('Test component StringComponent', () => {
	it('Correctly expands a string with an even number of characters.', () => {
		expect(reverseString('1234')).toEqual(['4', '3', '2', '1'])
	})
	it('Correctly expands a string with an odd number of characters.', () => {
		expect(reverseString('12345')).toEqual(['5', '4', '3', '2', '1'])
	})
	it('Correctly expands a string with one character.', () => {
		expect(reverseString('1')).toEqual(['1'])
	})
	it('Correctly expands an empty string.', () => {
		expect(reverseString('')).toEqual([])
	})
})
