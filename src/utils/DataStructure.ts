import { NodeType, TreeNodeValueType } from './Types'

export class TreeNode {
	value: TreeNodeValueType
	children: NodeType[]
	constructor(value: TreeNodeValueType) {
		this.value = value
		this.children = []
	}

	addChild(node: NodeType) {
		this.children.push(node)
	}

	setValue(val: TreeNodeValueType) {
		this.value = val
	}

	clearChildren() {
		this.children = []
	}
}

export class EditorState {
	root: NodeType

	constructor(node: NodeType) {
		this.root = node
	}

	buildExpression = (node: NodeType = this.root): any => {
		let str = ''
		if (node.value.type !== 'fn') return node.value.data
		node.children.forEach((child, idx) => {
			str += this.buildExpression(child)
			str += idx === node.children.length - 1 ? '' : ', '
		})
		return `${node.value.data.label} (${str})`
	}
}
