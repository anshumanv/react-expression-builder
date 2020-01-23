import React from 'react'
import Drop, { EditorState, TreeNode } from './components'
import { functions, staticValues } from './helpers/functions'

const options = [...functions, ...staticValues]

const stringRegex = /"([^\\"]|\\")*"/

const cb1 = () => alert('valid!')
const cb2 = () => alert('invalid!')

const validationFn = val => {
	// mock api request
	const res = !isNaN(val) || stringRegex.test(val)
	// console.log(res)
	return res
}

const Root = props => {
	const EditorData = new EditorState()
	const rootNode = new TreeNode(null)
	EditorData.initRoot(rootNode)

	return (
		<>
			<Drop
				EditorData={EditorData}
				node={rootNode}
				options={options}
				placeholder="Enter your expression"
				initialFocus={true}
				validationFn={validationFn}
			/>
		</>
	)
}

export default Root
