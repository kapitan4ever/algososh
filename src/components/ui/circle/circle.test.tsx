import { render } from '@testing-library/react'
import { ElementStates } from '../../../types/element-states'
import { Circle } from './circle'

describe('Circle', () => {
	it('renders with correct text', () => {
		const { getByTestId } = render(<Circle letter='circleExample' />)
		const circle = getByTestId('circle')

		expect(circle).toHaveTextContent('circleExample')
		expect(circle).toMatchSnapshot()
	})
	it('renders without correct text', () => {
		const { getByTestId } = render(<Circle />)
		const circle = getByTestId('circle')

		expect(circle).toBeInTheDocument()
		expect(circle).toMatchSnapshot()
	})
	it('renders with correct text in head', () => {
		const { getByTestId } = render(<Circle head='head' />)
		const circle = getByTestId('circle')

		expect(circle).toHaveTextContent('head')
		expect(circle).toMatchSnapshot()
	})
	it('renders with correct text in tail', () => {
		const { getByTestId } = render(<Circle tail='tail' />)
		const circle = getByTestId('circle')

		expect(circle).toHaveTextContent('tail')
		expect(circle).toMatchSnapshot()
	})
	it('renders with correct text in react element head', () => {
		const { getByTestId } = render(<Circle head={<a>head</a>} />)
		const circle = getByTestId('circle')

		expect(circle).toHaveTextContent('head')
		expect(circle).toMatchSnapshot()
	})
	it('renders with correct text in react element tail', () => {
		const { getByTestId } = render(<Circle tail={<a>tail</a>} />)
		const circle = getByTestId('circle')

		expect(circle).toHaveTextContent('tail')
		expect(circle).toMatchSnapshot()
	})
	it('renders with correct index', () => {
		const { getByTestId } = render(<Circle index={8} />)
		const circle = getByTestId('circle')

		expect(circle).toHaveTextContent('8')
		expect(circle).toMatchSnapshot()
	})
	it('renders with correct isSmall', () => {
		const { getByTestId } = render(<Circle isSmall />)
		const circle = getByTestId('circle-main')

		expect(circle).toHaveClass('small')
		expect(circle).toMatchSnapshot()
	})
	it('renders with correct state Default', () => {
		const { getByText } = render(<Circle state={ElementStates.Default} letter='default' />)
		const circle = getByText('default')

		expect(circle).toHaveTextContent('default')
		expect(circle).toMatchSnapshot()
	})
	it('renders with correct state Modified', () => {
		const { getByText } = render(<Circle state={ElementStates.Modified} letter='modified' />)
		const circle = getByText('modified')

		expect(circle).toHaveTextContent('modified')
		expect(circle).toMatchSnapshot()
	})
	it('renders with correct state Changing', () => {
		const { getByText } = render(<Circle state={ElementStates.Changing} letter='changing' />)
		const circle = getByText('changing')

		expect(circle).toHaveTextContent('changing')
		expect(circle).toMatchSnapshot()
	})
})
