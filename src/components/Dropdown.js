import React, { useRef, useState, useEffect } from 'react'
import Exp from './Expression'
import { TreeNode } from './DataStructure'
import fn from '../helpers/functions'

const Drop = props => {
	const { setDrop, placeholder, node, setNode, level, EditorData } = props

	const [value, setValue] = useState('')
	const [exp, setExp] = useState(false)
	const [valid, setValid] = useState(true)
	const dropRef = useRef(null)

	useEffect(() => {
		if (dropRef.current) dropRef.current.focus()
		// console.log(document.activeElement)
	}, [dropRef])

	const fnKeys = fn.map(fn => fn.key)
	const stringRegex = /"([^\\"]|\\")*"/
	const handleBlur = e => {
		if (!value) setDrop(false)
	}

	const handleValueChange = e => {
		console.log(EditorData.buildExpression())
		const val = e.target.value.toLowerCase()
		// const newNode = new TreeNode(val)
		node.setValue({ data: val, type: 'string' })
		runValidation(val)
		setValue(val)
		if (fnKeys.includes(val)) {
			setExp(true)
			node.setValue({ data: fn.find(f => f.key === val), type: 'fn' }) // todo
		}
	}

	const runValidation = val => {
		setTimeout(() => {
			if (!isNaN(val) || stringRegex.test(val)) {
				setValid(true)
			} else setValid(false)
		}, 2000)
	}

	const getNextNode = () => {
		return dropRef.current.parentNode.nextElementSibling.firstElementChild
			? dropRef.current.parentNode.nextElementSibling.firstElementChild
			: dropRef.current.parentNode.nextElementSibling
	}

	const getPrevNode = () => {
		return dropRef.current.parentNode.previousElementSibling.firstElementChild
			? dropRef.current.parentNode.previousElementSibling.firstElementChild
			: dropRef.current.parentNode.previousElementSibling
	}

	const handleDir = e => {
		e.stopPropagation()
		console.log(e.keyCode, e.key, dropRef.current)
		if (dropRef.current) {
			switch (e.keyCode) {
				case 39:
					const nextNode = getNextNode()
					nextNode && nextNode.focus()
					return
				case 37:
					const prevNode = getPrevNode()
					prevNode && prevNode.focus()
					return
				default:
					return
			}
		}
	}

	if (!exp) {
		// this is an approximation
		let inputLen = `${(value
			? value.length
			: placeholder && placeholder.length) * 8}px`
		// if (dropRef.current) inputLen = dropRef.current.scrollWidth

		return (
			<div onBlur={handleBlur}>
				<input
					ref={dropRef}
					placeholder={placeholder}
					style={{
						color: valid ? 'black' : 'red',
						width: inputLen,
						border: '2px solid red'
					}}
					type="text"
					list="functions"
					onKeyDown={e => handleDir(e)}
					onChange={handleValueChange}
				/>
				<datalist id="functions">
					<option>Extract</option>
					<option>Split</option>
					<option>Sub</option>
					<option>Concat</option>
				</datalist>
			</div>
		)
	}
	return (
		<Exp
			EditorData={EditorData}
			setExp={setExp}
			node={node}
			setNode={setNode}
			fname={value}
		/>
	)
}

export default Drop
