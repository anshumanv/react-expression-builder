<h1 align="center"> react-expression-builder </h1>
<p align="center">
<a href="https://www.npmjs.com/package/react-expression-builder">
  <img src="https://img.shields.io/npm/v/react-expression-builder.svg?style=for-the-badge" align="center">
</a>

<a href="https://www.npmjs.com/package/react-expression-builder">
  <img src="https://img.shields.io/npm/dt/react-expression-builder.svg?style=for-the-badge" align="center">
</a>

<a href="https://github.com/anshumanv/react-expression-builder">
  <img src="https://img.shields.io/github/workflow/status/anshumanv/react-expression-builder/test?style=for-the-badge" align="center">
</a>

</p>

<hr>

<p align="center">A bare-bones react component to build function expressions with your data.</p>

### Features

- Typeahead support
- Full keyboard navigation and deletion
- Easy custom styling as per input
- Input validation at granular level
- Customizable options

### Installation

Install the package -

```sh
npm i react-expression-builder

OR

yarn add react-expression-builder
```

### Usage

```js
import ExpressionBuilder from 'react-expression-builder'

//1. accumulate your options
// fn must have an additional property 'params' -  eg `params: ['dim', 'delimiter', 'occurrence_number']`
const options = [{..., key: '...', type: '...', label: '...',...}, {...}]

// regex to match entires within ""
const stringRegex = /"([^\\"]|\\")*"/

// Optional - Function called on every state change, store your changes on the server
const onChangeFn = editorState => console.log(editorState, editorState.buildExpression())

// Optional - class for the expression element, use for optional styling
const expressionRootClass = 'root-class'

// Optional - class for the input container
const expressionInputClass = 'input-class'

// Optional - Function which validates all the input values and returns a bool.
const validationFn = val => {
	return !isNaN(val) || stringRegex.test(val)
}

<ExpressionBuilder
  onChangeFn={onChangeFn}
  options={options}
  expressionRootClass={expressionRootClass} // Optional
  expressionInputClass={expressionInputClass} // Optional
  placeholder="Enter your expression" // Optional
  initialFocus={true} // if you want your input to be focussed on mount by default
  validationFn={validationFn} // Optional
/>

```

### Data Structure

Uses an N-Ary tree to store/manipulate the expression data, simple recursive function gives you the complete string. You can check [DataStructure.ts](https://github.com/anshumanv/react-expression-builder/blob/master/src/utils/DataStructure.ts) for the simple implementation, if curious.

Note - This only gives the skeleton and functionality, styling is upto the user, you can either make use of respective classes or wrap this component in a CSS-in-JS solution. For example, a nicely styled solution would look somewhat like [this](https://knitui.design/?path=/story/extractor--basic). This is not complete yet, need more work. Meanwhile, suggestions are appreciated.

## Author

[Anshuman Verma](https://github.com/anshumanv)

[<img src="https://image.flaticon.com/icons/svg/185/185961.svg" width="35" padding="10">](https://twitter.com/Anshumaniac12)
[<img src="https://image.flaticon.com/icons/svg/185/185964.svg" width="35" padding="10">](https://linkedin.com/in/anshumanv12)
[<img src="https://image.flaticon.com/icons/svg/185/185981.svg" width="35" padding="10">](https://www.facebook.com/anshumanv12)
[<img src="https://image.flaticon.com/icons/svg/985/985680.svg" width="35" padding="10">](https://www.paypal.me/AnshumanVerma)

## Contribute

Found a bug, please [create an issue](https://github.com/anshumanv/react-expression-builder/issues/new)

## License

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/anshumanv/react-expression-builder/blob/master/LICENSE)

> © Anshuman Verma
