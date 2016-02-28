import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import PropertyEditor from 'react-property-editor';
import Binder from 'react-binding';
import Json from 'react-json-fork';
import WidgetFactory from './WidgetFactory.js';
import WidgetRenderer from './WidgetRenderer.js';

var options = _.mapValues(WidgetFactory,function(value,key,object){return {value:key,name:key}  });
var widgets = WidgetFactory;
var defaultTheme = {};
var defaultSelectedItem = 'Panel';

class App extends React.Component
{
	constructor(props){
		super(props);
		var widget = widgets[defaultSelectedItem];
		this.state = {
			data: { text:'hello world'},
			selected: defaultSelectedItem,
			current: {
				widget: widget,
				props: _.cloneDeep(widget.metaData && widget.metaData.props),
				binding:{value:{path:''}}
			}
		}
	}
	logChange(value){
		this.setState({
				current: {
					widget: this.state.current.widget,
					props: value.props,
					binding:value.binding
				}
			}
		);
	}
	selectChange(e){
		var widget = widgets[e.target.value];
		this.setState({
			selected: e.target.value,
			current: {
				widget: widget,
				props: _.cloneDeep(widget.metaData && widget.metaData.props),
				binding:{}
			}
		})
	}
	render() {
		var dataBinder = Binder.bindToState(this,'data');
		var widget = this.state.current.widget;
		var customSettings = widget.metaData && widget.metaData.settings || {};
		var customStyle = defaultTheme[this.state.selected];
		return (
			<div>
				<div className="row">
					<div className="col-md-8">
						<select value={this.state.selected} onChange={this.selectChange.bind(this)}>
							{
								_.map(options,function (option, i) {
									return (<option key={i} value={option.value}>{option.name}</option>)
								})
							}
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8">
						<WidgetRenderer widget={widget} node={this.state.current}
										dataBinder={dataBinder} customStyle={customStyle} />
					</div>
					<div className="col-md-4">
						<PropertyEditor value={ this.state.current } settings={customSettings}
										onChange={ this.logChange.bind(this)}   />
						<hr/>
						<pre>{JSON.stringify(this.state.current.props, null, 2)}</pre>
						<pre>{JSON.stringify(this.state.current.binding, null, 2)}</pre>
					</div>
				</div>
			</div>
		)
	}
};
ReactDOM.render(<App />, document.getElementById('app'));
