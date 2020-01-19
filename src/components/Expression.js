import React, { useState, useEffect } from 'react'
import Placeholder from './Placeholder'
import fn from '../helpers/functions'
import { TreeNode } from './DataStructure'

const Exp = props => {
	const { fname, node, setNode, EditorData, setExp } = props
	const [refiNode, setRefNode] = useState([])
	const [rootFocus, setRootFocus] = useState(false)
	const fnData = fn.find(f => f.key === fname)

	useEffect(() => {
		const newNode = new TreeNode(fnData)
		const { params } = fnData
		params.forEach(param => {
			const refNode = new TreeNode({ data: param, type: 'string' }) // change it later
			node.addChild(refNode)
		})
		setRefNode(newNode)
		// console.log({ newNode }, newNode.children)
		// setNode(newNode)
		// node.addChild(newNode)
	}, [fnData, node])

	const handleKeyDown = e => {
		e.stopPropagation()
		if (e.key === 'Backspace' && rootFocus) {
			setExp(false)
		}
	}

	const PHDom = () => {
		const { params } = fnData
		const domData = params.map((param, i) => {
			return (
				<>
					{' '}
					<Placeholder
						initNode={node.children && node.children[i]}
						setInitNode={setNode}
						setFocus={i === 0}
						text={param}
						EditorData={EditorData}
					/>
					{i === params.length - 1 ? ' ' : ' , '}{' '}
				</>
			)
		})
		return domData
	}
	if (fname) {
		return (
			<>
				<span
					onKeyDown={handleKeyDown}
					onFocus={e => setRootFocus(true)}
					onBlur={e => setRootFocus(false)}
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
