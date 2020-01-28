import React, { useState, useEffect, useRef } from 'react'
import { useCombobox } from 'downshift'

const menuStyles = {
	backgroundColor: 'white',
	highlightedIndex: '#f2f2f2',
	fontWeight: 'normal',
	position: 'absolute'
}

const textContentStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
}

const DropdownCombobox = props => {
	const {
		inputRef,
		inputPlaceholder,
		onKeyDown,
		handleValueChange,
		options,
		validationFn,
		inputValue,
		expressionInputClass
	} = props
	const [inputItems, setInputItems] = useState(options)
	const [valid, setValid] = useState(true)
	const [valueType, setValueType] = useState('string')
	const matchesAnInput = inputItems.find(item => item.label === inputValue)
	const textRef = useRef()
	useEffect(() => {
		setInputItems(
			options.filter(item => {
				return item.key.toLowerCase().startsWith(inputValue.toLowerCase())
			})
		)
		if (validationFn) {
			validationFn(inputValue) || matchesAnInput
				? setValid(true)
				: setValid(false)
		}
	}, [inputValue])

	const handleValueTypeChange = val => {
		// check if the input value is present in any of the option
		const isPresentInOptions = options.find(option => option.label === val)
		if (isPresentInOptions) {
			setValueType(isPresentInOptions.type)
		} else {
			setValueType('string') // can also use typeof formattedInputValue but it will result in string anyways
		}
	}

	const stateReducer = (state, actionAndChanges) => {
		// this prevents the menu from being closed when the user selects an item with 'Enter' or mouse
		// console.log(state, actionAndChanges)
		const { stateChangeTypes } = useCombobox
		switch (actionAndChanges.type) {
			case stateChangeTypes.InputChange:
				// if (validationFn) {
				// 	if (!matchesAnInput) {
				// 		validationFn(actionAndChanges.changes.inputValue)
				// 			? setValid(true)
				// 			: setValid(false)
				// 	}
				// }
				return {
					// return normal changes.
					...actionAndChanges.changes,
					// but taking the change from default reducer and uppercasing it.
					inputValue: actionAndChanges.changes.inputValue
				}
			// also on selection.
			case stateChangeTypes.ItemClick:
			case stateChangeTypes.InputKeyDownEnter:
				// case useCombobox.stateChangeTypes.InputBlur:
				handleValueChange({
					target: {
						value:
							state.highlightedIndex > -1
								? actionAndChanges.changes.selectedItem.label
								: actionAndChanges.changes.inputValue || ''
					}
				})
				if (state.highlightedIndex > -1) {
					handleValueTypeChange(actionAndChanges.changes.selectedItem.label)
				}
				return {
					...actionAndChanges.changes,
					// if we had an item highlighted in the previous state.
					...(state.highlightedIndex > -1 && {
						inputValue: actionAndChanges.changes.selectedItem.key.toUpperCase()
					})
				}
			case useCombobox.stateChangeTypes.InputBlur:
				return {
					action: actionAndChanges.changes
				}
			default:
				return actionAndChanges.changes // otherwise business as usual.
		}
	}

	const {
		isOpen,
		openMenu,
		selectedItem,
		getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		highlightedIndex,
		getItemProps
	} = useCombobox({
		items: inputItems,
		defaultIsOpen: true,
		initialIsOpen: true,
		initialHighlightedIndex: 0,
		// onInputValueChange: ({ inputValue }) => {
		// 	setInputItems(
		// 		options.filter(item => {
		// 			return item.key.toLowerCase().startsWith(inputValue.toLowerCase())
		// 		})
		// 	)
		// 	handleValueTypeChange()
		// },
		stateReducer
	})

	const handleValueChangeWrapper = e => {
		const val = e.target.value

		handleValueChange(e)
		handleValueTypeChange(val)
	}

	const getInputWidth = () => {
		if (textRef.current) {
			return textRef.current.scrollWidth
		}
		return '10rem'
	}

	const showMenu = isOpen && !matchesAnInput && inputItems.length > 0

	return (
		<>
			{/* <label {...getLabelProps()}>Choose an element:</label> */}
			<div
				style={{ display: 'inline-block' }}
				data-type="expression-input-root"
				{...getComboboxProps()}
				className={expressionInputClass}
			>
				<input
					{...getInputProps({
						onChange: handleValueChangeWrapper,
						onKeyDown: onKeyDown,
						value: inputValue,
						ref: inputRef,
						placeholder: inputPlaceholder,
						onFocus: () => openMenu()
					})}
					style={{
						width: getInputWidth()
					}}
					data-valid={valid}
					data-value-type={valueType}
				/>
				<div ref={textRef} style={textContentStyle}>
					{inputValue || inputPlaceholder}
				</div>
				{showMenu && (
					<ul
						data-type="expression-list"
						{...getMenuProps()}
						style={menuStyles}
					>
						{inputItems.map((item, index) => (
							<li
								data-type="expression-list-item"
								style={
									highlightedIndex === index
										? { backgroundColor: '#f2f2f2' }
										: {}
								}
								key={`${item.key}${index}`}
								{...getItemProps({ item, index })}
							>
								{item.label}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	)
}

export default DropdownCombobox
