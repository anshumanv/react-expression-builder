export class TreeNode {
	constructor(value) {
		this.value = value
		this.children = []
	}

	addChild(node) {
		this.children.push(node)
	}

	setValue(val) {
		this.value = val
	}

	clearChildren() {
		this.children = []
	}
}

export class EditorState {
	constructor() {
		this.root = null
	}

	initRoot(node) {
		this.root = node
	}

	buildExpression = (node = this.root) => {
		// console.log(node)
		let str = ''
		if (node.value.type === 'string') return node.value.data
		node.children.forEach((child, idx) => {
			str += this.buildExpression(child)
			str += idx === node.children.length - 1 ? '' : ', '
		})
		return `${node.value.data.label} (${str})`
	}

	addNode(value) {
		if (!this.root) this.root = new TreeNode(value)
	}
}
