import React, { useRef, useState, useEffect } from 'react'
import Exp from './Expression'
import DownSelect from './DownSelect'

const Drop = props => {
	const {
		placeholder,
		EditorData,
		node,
		initialFocus = false,
		options,
		validationFn,
		onChangeFn
	} = props

	const [value, setValue] = useState('')
	const [exp, setExp] = useState(false)
	// use it later for validation
	const [valid, setValid] = useState(true)
	const dropRef = useRef(null)

	useEffect(() => {
		if (dropRef.current && initialFocus) {
			dropRef.current.focus()
			// console.log(dropRef.current, initialFocus)
		}
		// console.log(node)
		// console.log(document.activeElement)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dropRef.current])

	const fnKeys = options.filter(fn => fn.type === 'function').map(fn => fn.key)
	const stringRegex = /"([^\\"]|\\")*"/
	// const handleBlur = e => {
	// 	if (!value) setDrop(false)
	// }

	const handleValueChange = e => {
		const val = e.target.value.toLowerCase()
		// console.log({val})
		// const newNode = new TreeNode(val)
		node.setValue({ data: val, type: 'string' })
		setValue(val)
		if (fnKeys.includes(val)) {
			setExp(true)
			node.setValue({ data: options.find(f => f.key === val), type: 'fn' }) // todo
		}
		if (onChangeFn) onChangeFn(EditorData)
		// console.log(EditorData.buildExpression())
	}

	const getNextNode = () => {
		let currElement = dropRef.current.parentElement
		// if the present element has a next sibling, directly switch to next
		if (currElement.nextElementSibling)
			currElement = currElement.nextElementSibling
		// else keep going levels up till you find a next node
		// else {
		// 	currElement = currElement.parentNode
		// }
		// this is when you want to skip the top levels and only play in text fields
		else {
			while (!currElement.nextElementSibling)
				currElement = currElement.parentElement
			currElement = currElement.nextElementSibling
		}
		// while (rootClasses.includes(finalElement.dataset.type)) {
		// 	finalElement = finalElement.firstElementChild
		// }

		if (currElement.dataset.type !== 'expression-root')
			currElement = currElement.firstElementChild

		return currElement
	}

	const getPrevNode = () => {
		let currElement = dropRef.current.parentElement
		// if the present element has a next sibling, directly switch to next
		if (currElement.previousElementSibling)
			currElement = currElement.previousElementSibling
		// else {
		// 	currElement = currElement.parentNode
		// }
		// else keep going levels up till you find a next node
		else {
			if (!currElement.previousElementSibling)
				currElement = currElement.parentElement
			// if (currElement.dataset.type === 'expression-root' && initialFocus)
			// 	return currElement
			// currElement = currElement.lastElementChild
		}
		// some transitions as per the element we arrive on
		while (currElement.dataset.type === 'expression-root' && !initialFocus) {
			currElement = currElement.lastElementChild
		}
		if (currElement.dataset.type === 'expression-input-root') {
			currElement = currElement.firstElementChild
		}
		// console.log(currElement)
		return currElement
	}

	const handleDir = e => {
		e.stopPropagation()
		const inputNode = dropRef.current
		switch (e.keyCode) {
			case 39:
				// only when I'm at last caret position
				if (inputNode.selectionStart !== inputNode.value.length) return
				e.preventDefault()
				const nextNode = getNextNode()
				nextNode && nextNode.focus()
				return
			case 37:
				// only when at caret position is 0
				if (inputNode.selectionStart !== 0) return
				e.preventDefault()
				const prevNode = getPrevNode()
				prevNode && prevNode.focus()
				return
			default:
				return
		}
	}

	if (!exp) {
		// this is an approximation
		// let inputLen = `${(value
		// 	? value.length
		// 	: placeholder && placeholder.length) * 8}px`
		// if (dropRef.current) inputLen = dropRef.current.scrollWidth
		return (
			<DownSelect
				inputRef={dropRef}
				inputPlaceholder={placeholder}
				options={options}
				onKeyDown={e => handleDir(e)}
				inputValue={value}
				validationFn={validationFn}
				handleValueChange={handleValueChange}
			/>
		)
	}
	return (
		<Exp
			EditorData={EditorData}
			options={options}
			setExp={setExp}
			setValue={setValue}
			node={node}
			onChangeFn={onChangeFn}
			fname={value}
		/>
	)
}

export default Drop
