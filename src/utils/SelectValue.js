import React from 'react';

export default class SimpleSelect extends React.Component {
	onChange(e) {
		this.props.onChange(e.target.value);
	}

	render() {
		let {options,value} = this.props;

		return (<select value={value} onChange={this.onChange.bind(this)}>
				{options.map(function (option, i) {
					return (
						<option key={i} value={option.value}>{option.label}</option>)
				})}
			</select>
		)
	}
}
