import React from 'react'
import ExpressionBuilder from './index'
import { functions, staticValues } from './utils/MockData'

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

const Root = () => {
	return (
		<>
			<ExpressionBuilder
				onChangeFn={onChangeFn}
				expressionRootClass={expressionRootClass}
				expressionInputClass={expressionInputClass}
				options={options}
				placeholder="Enter your expression"
				initialFocus
				validationFn={validationFn}
			/>
		</>
	)
}

export default Root
