import React from 'react';
import _ from 'lodash';
import Json from 'react-json-fork';
import toEmptyProps from '../utils/toEmptyProps';
import SelectValue from '../utils/SelectValue';

var settings = {form: false,
	fixedFields:false,
	adder:false,
	editing:true
};
export default class WidgetStyleEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	selectChange(selectedValue){
		this.setState({selectedKey:selectedValue});
	}
	exist(){
		var value = this.props.value || {};
		return value[ this.state.selectedKey] !== undefined;
	}
	add() {

		if (this.exist()) return;

		//update value
		var key = this.state.selectedKey;
		if (key === undefined) return;

		var newValue = _.cloneDeep(this.props.value) || {};
		newValue[key] = toEmptyProps(this.props.settings.widgets[key].metaData.settings);
		this.props.onUpdated(newValue);

		
	}
	render() {
		
		var widgets = this.props.settings.widgets || {};

		
		var options = _.map(widgets,
			function(value,key,object){
				var widget =object[key];
				return {label:key,value:key}
			}
		);
		options.unshift({label:'none',value:''});
		
		var customFields= _.reduce(this.props.value,function(memo,value,key){
			memo[key] = {fields:widgets[key].metaData.settings && widgets[key].metaData.settings.fields};
			return memo;
		},{});
		settings.fields = customFields;
		
		
		var notExist = !!this.state.selectedKey && !this.exist();
		var value = _.reduce(this.props.value,function(memo,value,key){
			memo[key] = _.merge(toEmptyProps(widgets[key].metaData.settings),value);
			return memo;
		},{});

		return (
			<div>

				<Json value={value} onChange={this.props.onUpdated} settings={settings}></Json>
				<SelectValue options={options} value={this.state.selectedKey}
							 onChange={this.selectChange.bind(this)}/>
				{notExist?<a onClick={this.add.bind(this)}>add</a>:null}
			</div>
		);
	}
};

