import React, { useState, useEffect } from 'react'
import Placeholder from './Placeholder'
// import './index.css'
import EditorState, { TreeNode } from './DataStructure'

const Root = props => {
	const [ipCache, setIpCache] = useState([])
	console.log('asd')
	const EditorData = new EditorState()
	const rootNode = new TreeNode(null)
	EditorData.initRoot(rootNode)

	return (
		<Placeholder
			ipRefs={ipCache}
			setIpRefs={setIpCache}
			EditorData={EditorData}
			initNode={rootNode}
		/>
	)
}

export default Root
