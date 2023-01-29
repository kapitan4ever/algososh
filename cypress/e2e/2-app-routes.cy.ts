describe('App routes', () => {
	beforeEach(() => {
		cy.visit('')
	})
	it('Works on localhost:3000/recursion', () => {
		cy.visit('recursion')
	})
	it('Works on localhost:3000/fibonacci', () => {
		cy.visit('fibonacci')
	})
	it('Works on localhost:3000/sorting', () => {
		cy.visit('sorting')
	})
	it('Works on localhost:3000/stack', () => {
		cy.visit('stack')
	})
	it('Works on localhost:3000/queue', () => {
		cy.visit('queue')
	})
	it('Works on localhost:3000/list', () => {
		cy.visit('list')
	})
})
