import React, { useState, useEffect } from 'react'
import Drop from './Dropdown'
import { TreeNode } from './DataStructure'

const Placeholder = props => {
	const {
		text,
		setFocus,
		initNode,
		setInitNode,
		level = 0,
		ipCache,
		setIpCache,
		EditorData
	} = props
	const [drop, setDrop] = useState(setFocus || false)
	const [node, setNode] = useState(new TreeNode(null))
	const handleFocus = e => {
		setDrop(!drop)
	}

	// console.log(EditorData, initNode, node)

	// useEffect(() => {
	// 	if (!initNode) {
	// 		EditorData.initRoot(node)
	// 	}
	// })

	if (!drop)
		return (
			<span tabIndex={0} onFocus={handleFocus} onBlur={handleFocus}>
				{text || 'hey there'}
			</span>
		)
	return (
		<Drop
			EditorData={EditorData}
			ipCache={ipCache}
			setIpCache={setIpCache}
			level={level}
			node={initNode || node}
			setNode={setNode}
			placeholder={text}
			setDrop={setDrop}
		/>
	)
}

export default Placeholder
