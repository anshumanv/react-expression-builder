import { useCombobox } from 'downshift'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { OptionType, SelectorPropTypes } from '../utils/Types'

const menuStyles: CSSProperties = {
	backgroundColor: 'white',
	fontWeight: 'normal',
	position: 'absolute'
}

const textContentStyle: CSSProperties = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
}

const DropdownCombobox: React.FC<SelectorPropTypes> = (
	props: SelectorPropTypes
) => {
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

	const [inputItems, setInputItems] = useState<OptionType[]>(options)
	const [valid, setValid] = useState<boolean>(true)
	const [valueType, setValueType] = useState<string>('string')

	const matchesAnInput: boolean = options.some(
		item => item.label === inputValue
	)

	const textRef = useRef<HTMLDivElement>(null)

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

	const handleValueTypeChange = (val: string): void => {
		// check if the input value is present in any of the option
		const isPresentInOptions = options.find(option => option.label === val)
		if (isPresentInOptions) {
			setValueType(isPresentInOptions.type)
		} else {
			setValueType('string') // can also use typeof formattedInputValue but it will result in string anyways
		}
	}

	const stateReducer = (state, actionAndChanges) => {
		const { stateChangeTypes } = useCombobox
		switch (actionAndChanges.type) {
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
					// handleValueTypeChange(actionAndChanges.changes.selectedItem.label)
					setValueType(actionAndChanges.changes.selectedItem.type)
				}

				return {
					...actionAndChanges.changes,
					// if we had an item highlighted in the previous state.
					...(state.highlightedIndex > -1 && {
						inputValue: actionAndChanges.changes.selectedItem.key
					})
				}
			default:
				return actionAndChanges.changes // otherwise business as usual.
		}
	}

	const {
		isOpen,
		openMenu,
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
		stateReducer
	})

	const updateValueAndType = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const val = (e.target as HTMLInputElement).value

		handleValueChange(e)
		handleValueTypeChange(val)
	}

	const getInputWidth = () => {
		if (textRef.current) {
			return textRef.current.scrollWidth + 8
		}
		return '10rem'
	}

	const showMenu = isOpen && !matchesAnInput && inputItems.length > 0

	return (
		<>
			{/* <label {...getLabelProps()}>Choose an element:</label> */}
			<div
				data-type="expression-input-root"
				{...getComboboxProps()}
				className={expressionInputClass}
			>
				<input
					{...getInputProps({
						onChange: updateValueAndType,
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
								data-item-type={item.type}
								style={
									highlightedIndex === index
										? //  TODO: Make this configurable
										  { backgroundColor: '#f2f2f2' }
										: {}
								}
								key={`${item.key}${index}`}
								{...getItemProps({ item, index })}
							>
								<span>{item.label}</span>
								{/*TODO: Will enable this sometime in future to show the type of expression */}
								{/* <span>{item.keyLabel || ''}</span> */}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	)
}

export default DropdownCombobox
