import React from 'react'
import Drop, { EditorState, TreeNode } from './components'
import { functions, staticValues } from './helpers/functions'

const options = [...functions, ...staticValues]

const stringRegex = /"([^\\"]|\\")*"/

const cb1 = () => alert('valid!')
const cb2 = () => alert('invalid!')

const onChangeFn = st => console.log('change', st)
const expressionRootClass = 'root-class'
const expressionInputClass = 'input-class'

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
				onChangeFn={onChangeFn}
				node={rootNode}
				expressionRootClass={expressionRootClass}
				expressionInputClass={expressionInputClass}
				options={options}
				placeholder="Enter your expression"
				initialFocus={true}
				validationFn={validationFn}
			/>
		</>
	)
}

export default Root
