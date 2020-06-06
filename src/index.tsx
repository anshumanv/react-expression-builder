import React, { FC } from 'react'
import Dropdown from './components/Dropdown'
import { EditorState, TreeNode } from './utils/DataStructure'
import { EditorType, ExtractorProps } from './utils/Types'

export { EditorState, TreeNode } from './utils/DataStructure'

const ExpressionBuilder: FC<ExtractorProps> = props => {
	// create a root node for the component
	const rootNode = new TreeNode(null)
	// initialize the editor state with root node
	const EditorData: EditorType = new EditorState(rootNode)

	return <Dropdown {...props} node={rootNode} EditorData={EditorData} />
}

export default ExpressionBuilder
