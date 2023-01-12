import React from 'react'
import { reversedString } from './utils'

describe('Test component StringComponent', () => {
	it('Correctly expands a string with an even number of characters.', () => {
		expect(reversedString('1234')).toEqual(['4', '3', '2', '1'])
	})
	it('Correctly expands a string with an odd number of characters.', () => {
		expect(reversedString('12345')).toEqual(['5', '4', '3', '2', '1'])
	})
	it('Correctly expands a string with one character.', () => {
		expect(reversedString('1')).toEqual(['1'])
	})
	it('Correctly expands an empty string.', () => {
		expect(reversedString('')).toEqual([''])
	})
})
