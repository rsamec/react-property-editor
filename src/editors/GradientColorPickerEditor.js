import React, {PropTypes} from 'react';
import _ from 'lodash';
import ReactGradientColorPicker from 'react-gradient-color-picker';
import SelectValue from '../utils/SelectValue';

const options = [
	{label: 'horizontal', value: 'top'},
	{label: 'vertical', value: 'left'},
	{label: 'diagonal 45%', value: '45deg'},
	{label: 'diagonal -45%', value: '-45deg'},
	{label: 'radial', value: 'center, ellipse cover'}
];

const DEFAULT_STOPS = [
	{
		offset: 0,
		color: "#f7ff00",
		opacity: 1.0
	},
	{
		offset: 0.5,
		color: "#db36a4",
		opacity: 1.0
	},
	{
		offset: 1,
		color: "#f00",
		opacity: 1.0
	}];

export default class GradientColorPickerEditor extends React.Component {
	unset() {
		this.props.onUpdated(undefined);
	}

	handleChangeGrandient(stops) {
		stops = _.map(stops,function(stop){ return _.omit(stop,['idx','x'])});
		this.props.onUpdated(_.extend(_.clone(this.props.value) || {}, {stops: stops}));
	}

	orientationChange(selectedValue) {
		this.props.onUpdated(_.extend(_.clone(this.props.value) || {}, {orientation: selectedValue}));
	}

	render() {
		var noValueComp = <a onClick={()=> {this.props.onUpdated({stops:DEFAULT_STOPS})}} className='jsonNovalue'>No value</a>;
		if (this.props.value === undefined) return noValueComp;

		var value = this.props.value || {};
		var selectedValue = value.orientation;
		return (
			<div>
				<SelectValue options={options} value={selectedValue}
							 onChange={this.orientationChange.bind(this)}/>
				<ReactGradientColorPicker onChange={this.handleChangeGrandient.bind(this)} stops={value.stops}/>
				<div style={{margin:'20', textAlign: 'center'}}></div>
			</div>

		);
	}
}
