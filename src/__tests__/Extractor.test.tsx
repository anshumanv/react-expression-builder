import React from 'react'
import Extractor from '../'
import { cleanup, fireEvent, render } from '../../../common/TestUtil'
import { functions, staticValues } from '../helpers'

afterEach(cleanup)

// functions for the extractor
const options = [...functions, ...staticValues]

const concatFunction = functions[1]
const adDimension = staticValues[1]

const onUpdate = editorState => {
	return editorState.buildExpression()
}

const extractorProps = {
	onChangeFn: onUpdate,
	options: options
}

describe('Extractor renders properly', () => {
	it('Renders correctly', () => {
		const { asFragment } = render(<Extractor {...extractorProps} />)

		// Get the options list which should be shown by default
		const optionsList = document.querySelector('[data-type="expression-list"]')
		expect(optionsList).toBeInTheDocument()

		// Check initial focus on render
		const { activeElement } = document
		expect(activeElement!.parentElement).toHaveAttribute(
			'data-type',
			'expression-input-root'
		)

		// Input field should how focus initially
		expect(asFragment()).toMatchSnapshot()
	})
	it('Scaffolds an expression on typing one', () => {
		const { asFragment } = render(<Extractor {...extractorProps} />)
		// Get the root input element
		const { activeElement } = document
		fireEvent.input(activeElement as any, {
			target: { value: functions[0].key }
		})

		// Check that all params are scaffolded properly
		const expressionInputRoots = document.querySelectorAll(
			'[data-type="expression-input-root"]'
		)
		expect(expressionInputRoots).toHaveLength(3)

		// Check that the expression root is created
		const expressionRoots = document.querySelectorAll(
			'[data-type="expression-root"]'
		)
		expect(expressionRoots).toHaveLength(1)

		expect(asFragment()).toMatchSnapshot()
	})
	it('Hides options list on blur', () => {
		const { asFragment } = render(<Extractor {...extractorProps} />)
		// Initially the input has focus
		// Get the options list which should be shown by default
		const optionsList = document.querySelector('[data-type="expression-list"]')
		expect(optionsList).toBeInTheDocument()

		// create a new element and transfer focus
		const newInput = document.createElement('input')
		newInput.focus()

		expect(optionsList).not.toBeInTheDocument()

		expect(asFragment()).toMatchSnapshot()
	})
	it('Applies correct data attributes', () => {
		const { asFragment } = render(<Extractor {...extractorProps} />)

		// Get the root input element
		const { activeElement } = document
		fireEvent.input(activeElement as any, {
			target: { value: staticValues[1].label }
		})

		// Check for attributes
		expect(activeElement).toHaveAttribute('data-value-type', 'dimension')
		expect(activeElement).toHaveStyle('background-color: #fdedce')

		expect(asFragment()).toMatchSnapshot()
	})
})

describe('Extractor builds data structure properly', () => {
	it('Fires the onChange function', () => {
		const onChangeFn = jest.fn()
		const { asFragment } = render(
			<Extractor {...extractorProps} onChangeFn={onChangeFn} />
		)

		// Get the root input element
		const { activeElement } = document
		fireEvent.change(activeElement as any, {
			target: { value: adDimension.label }
		})

		expect(onChangeFn).toHaveBeenCalled()

		expect(asFragment()).toMatchSnapshot()
	})

	it('Builds correct string on input', () => {
		const onChangeFn = jest.fn(editorState => editorState.buildExpression())
		const { asFragment } = render(
			<Extractor {...extractorProps} onChangeFn={onChangeFn} />
		)

		// Scaffold and expression
		const { activeElement } = document
		fireEvent.change(activeElement as any, {
			target: { value: concatFunction.label }
		})

		// Get scaffolded params
		const expressionParamsInput = document.querySelectorAll(
			'[data-type="expression-input-root"] input'
		)
		expect(expressionParamsInput).toHaveLength(2)
		fireEvent.change(expressionParamsInput[0], {
			target: { value: adDimension.label }
		})
		fireEvent.change(expressionParamsInput[1], { target: { value: '"_"' } })

		expect(onChangeFn).toHaveBeenCalledTimes(3)
		expect(onChangeFn.mock.results[2].value).toEqual('CONCAT (Ad, "_")')

		expect(asFragment()).toMatchSnapshot()
	})
})

describe('Keyboard events work properly', () => {
	it('Should navigate to the expression root on pressing left on first param', () => {
		const { asFragment } = render(<Extractor {...extractorProps} />)

		// Get the root input element
		let { activeElement } = document
		fireEvent.change(activeElement as any, {
			target: { value: concatFunction.key }
		})

		// Active element will be changed to the first param of the expression
		activeElement = document.activeElement

		// Fire left arrow key
		fireEvent.keyDown(activeElement as any, { keyCode: 37 })

		// Check that the focus has shifted to the root of the expression
		activeElement = document.activeElement
		expect(activeElement).toHaveAttribute('data-type', 'expression-root')

		expect(asFragment()).toMatchSnapshot()
	})
	it('Should navigate to the next param on pressing right ', () => {
		const { asFragment } = render(<Extractor {...extractorProps} />)

		// Get the root input element
		let { activeElement } = document
		fireEvent.change(activeElement as any, {
			target: { value: concatFunction.key }
		})

		// Active element will be changed to the first param of the expression
		activeElement = document.activeElement

		// Fire left arrow key
		fireEvent.keyDown(activeElement as any, { keyCode: 39 })

		// Check that the focus has shifted to the root of the expression
		activeElement = document.activeElement
		expect(activeElement!.parentElement).toHaveAttribute(
			'data-type',
			'expression-input-root'
		)
		const allInputs = document.querySelectorAll(
			'[data-type="expression-input-root"]'
		)
		const lastInput = allInputs[1].firstElementChild
		expect(lastInput).toEqual(activeElement)

		// Check that on pressing right, the focus stays for last param
		fireEvent.keyDown(activeElement as any, { keyCode: 39 })
		expect(document.activeElement).toEqual(lastInput)

		expect(asFragment()).toMatchSnapshot()
	})
	it('Should delete the expression root on pressing backspace ', () => {
		const { asFragment } = render(<Extractor {...extractorProps} />)

		// Get the root input element
		let { activeElement } = document
		fireEvent.change(activeElement as any, {
			target: { value: concatFunction.key }
		})

		// Active element will be changed to the first param of the expression
		activeElement = document.activeElement

		// Fire left arrow key
		fireEvent.keyDown(activeElement as any, { keyCode: 37 })

		// Get the expression root
		activeElement = document.activeElement

		// Press backspace
		fireEvent.keyDown(activeElement as any, { keyCode: 8 })
		// Expression root should have been removed by now
		expect(activeElement).not.toBeInTheDocument()

		expect(asFragment()).toMatchSnapshot()
	})
})
