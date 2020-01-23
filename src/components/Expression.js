import React, { useState, useEffect, useRef } from 'react'
import Drop from './Dropdown'
import { TreeNode } from './DataStructure'

const Exp = props => {
	const { fname, node, EditorData, setExp, options, setValue } = props
	const [rootFocus, setRootFocus] = useState(false)
	const expressionRoot = useRef(null)
	// find function metadata as per the given key.
	const fnData = options.find(f => f.key === fname)

	useEffect(() => {
		// create nodes for all children of the given function
		const { params } = fnData
		params.forEach(param => {
			const refNode = new TreeNode({ data: '', type: 'string' })
			node.addChild(refNode)
		})
	}, [fnData, node])

	const findNextNode = () => {
		const initNode = expressionRoot.current.firstElementChild
		if (initNode.dataset.type === 'expression-root') return initNode
		else return initNode.firstElementChild
	}

	const findPrevNode = () => {
		let initNode = expressionRoot.current
		if (initNode.previousElementSibling) {
			initNode = initNode.previousElementSibling
			while (initNode.lastElementChild) initNode = initNode.lastElementChild
		} else {
			if (initNode.parentElement.dataset.type === 'expression-root')
				initNode = initNode.parentElement
		}
		return initNode
	}

	const handleKeyDown = e => {
		e.stopPropagation()
		// remove node when backspace is pressed and expression is in focus
		switch (e.keyCode) {
			case 8:
				if (rootFocus) {
					setExp(false)
					node.clearChildren()
					setValue('')
				}
				break
			case 39:
				const nextNode = findNextNode()
				nextNode.focus()
				break
			case 37:
				const prevNode = findPrevNode()
				prevNode.focus()
				break
			default:
				return
		}
	}

	// Build the dom with dropdowns for the parameters of the function
	const PHDom = () => {
		const { params } = fnData
		return params.map((param, i) => {
			return (
				<Drop
					EditorData={EditorData}
					key={i + param}
					options={options}
					node={node.children && node.children[i]}
					initialFocus={i === 0}
					placeholder={param}
				/>
			)
		})
	}
	if (fname) {
		return (
			<>
				<span
					ref={expressionRoot}
					data-type="expression-root"
					onKeyDown={handleKeyDown}
					onFocus={() => setRootFocus(true)}
					onBlur={() => setRootFocus(false)}
					tabIndex="0"
					style={{ display: 'flex' }}
				>
					{fnData.label} ( {PHDom()} ){' '}
				</span>
			</>
		)
	}
	return <span>loading</span>
}

export default Exp
