import { EditorState, TreeNode } from './DataStructure'

export interface ExtractorProps {
	onChangeFn: (EditorType) => void
	options: OptionType[]
}

export interface EditorType extends EditorState {}

export interface NodeType extends TreeNode {}

export interface OptionType {
	key: string
	type: string
	params?: string[]
	keyLabel?: string
	label: string
}

export interface TreeNodeValueType {
	data: OptionType
	type: string
}

export interface DropdownProps {
	inputRef?: React.RefObject<HTMLInputElement>
	inputPlaceholder?: string
	placeholder: string
	onKeyDown?: () => void
	initialFocus?: boolean
	node: NodeType
	EditorData: EditorType
	handleValueChange?: () => void
	options: OptionType[]
	validationFn: (val: any) => boolean
	inputValue?: any
	onChangeFn: (state: EditorType) => void
	expressionRootClass: string | undefined
	expressionInputClass: string | undefined
}

export interface SelectorPropTypes {
	inputRef: React.RefObject<HTMLInputElement>
	inputPlaceholder: string
	onKeyDown: (e) => void
	handleValueChange: (e) => void
	options: OptionType[]
	validationFn: (value: any) => boolean
	inputValue: string
	expressionInputClass: string | undefined
}

export interface ExpressionRootPropTypes {
	// function name that matches the input
	fname: string
	// parent node on which we append child dropdown as per the fn param
	node: NodeType
	// Editor data which needs to be passed down to every level
	EditorData: EditorType
	setExp: (isExpression: boolean) => void
	options: OptionType[]
	setValue: (value: string) => void
	onChangeFn: (state: EditorType) => void
	expressionRootClass: string | undefined
	expressionInputClass: string | undefined
	validationFn: (val: string) => boolean
}
