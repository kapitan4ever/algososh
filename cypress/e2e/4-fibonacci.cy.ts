import { dataCyForm, dataCyInput, dataCySubmit, mainCircle } from '../constants/constants'

describe('Correct operation of Fibonacci', () => {
	beforeEach(() => {
		cy.visit(`/fibonacci`)
	})
	it('If the input is empty, then the add button is unavailable', function () {
		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCySubmit).should('be.disabled')
		})
	})
	it('The numbers are generated correctly', function () {
		cy.clock()
		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).type('5')
			cy.contains('Рассчитать').click()
			cy.get(dataCySubmit).should('be.disabled')
		})

		cy.tick(500)

		cy.get(mainCircle).children().should('have.length', '1').should('have.text', '1')

		cy.tick(500)
		cy.wait(500)

		cy.get(mainCircle).children().should('have.length', '2').should('have.text', '11')

		cy.tick(500)
		cy.wait(500)

		cy.get(mainCircle).children().should('have.length', '3').should('have.text', '112')

		cy.tick(500)
		cy.wait(500)

		cy.get(mainCircle).children().should('have.length', '4').should('have.text', '1123')

		cy.tick(500)
		cy.wait(500)

		cy.get(mainCircle).children().should('have.length', '5').should('have.text', '11235')

		cy.tick(500)
		cy.wait(500)

		cy.get(mainCircle).children().should('have.length', '6').should('have.text', '112358')

		cy.tick(500)
		cy.wait(500)

		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCySubmit).should('be.disabled')
		})
	})
})
