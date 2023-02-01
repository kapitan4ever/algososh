import {
	changingStyle,
	dataCyForm,
	dataCyInput,
	dataCySubmit,
	defaultStyle,
	mainCircle,
	modifiedStyle,
} from '../constants/constants'

describe('Корректная работа строки', () => {
	beforeEach(() => {
		cy.visit(`/recursion`)
	})
	it('Если в инпуте пусто, то кнопка добавления недоступна.', function () {
		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCySubmit).should('be.disabled')
		})
	})
	it('Cтрока разворачивается корректно', function () {
		cy.clock()
		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).type('hello')
			cy.get(dataCySubmit).click()
			cy.get(dataCySubmit).should('be.disabled')
		})

		cy.get(mainCircle).then(elem => {
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[0]).children().should('have.text', 'h')

			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[1]).children().should('have.text', 'e')

			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[2]).children().should('have.text', 'l')

			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[3]).children().should('have.text', 'l')

			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[4]).children().should('have.text', 'o')
		})

		cy.tick(500)

		cy.get(mainCircle).then(elem => {
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[0]).children().should('have.text', 'o')

			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[1]).children().should('have.text', 'e')

			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[3]).children().should('have.text', 'l')

			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedStyle))
			cy.get(elem[4]).children().should('have.text', 'h')
		})

		cy.tick(500)

		cy.get(mainCircle).then(elem => {
			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[1]).children().should('have.text', 'l')

			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(changingStyle))
			cy.get(elem[2]).children().should('have.text', 'l')

			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedStyle))
			cy.get(elem[3]).children().should('have.text', 'e')
		})

		cy.tick(500)
		cy.wait(500)

		cy.get(mainCircle).then(elem => {
			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(modifiedStyle))
			cy.get(elem[2]).children().should('have.text', 'l')
		})

		cy.get(mainCircle)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(modifiedStyle))

		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCySubmit).should('be.disabled')
		})
	})
}) 
