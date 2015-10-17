import React from 'react';
import _ from 'lodash';
import PropertyEditor from 'react-property-editor';
import BindToMixin from 'react-binding';
import Json from 'react-json-fork';
import WidgetFactory from './WidgetFactory.js';
import WidgetRenderer from './WidgetRenderer.js';

var options = _.mapValues(WidgetFactory,function(value,key,object){return {value:key,name:key}  });
var widgets = WidgetFactory;
var defaultTheme = {};
var defaultSelectedItem = 'react-bootstrap.Button';

var App = React.createClass({
    mixins: [BindToMixin],
    getInitialState(){
        var widget = widgets[defaultSelectedItem];
        return {
            data: { text:'hello world'},
            selected: defaultSelectedItem,
            current: {
                widget: widget,
                props: _.cloneDeep(widget.metaData && widget.metaData.props)
            }
        }
    },
    logChange(value){
        this.setState({
                current: {
                    widget: this.state.current.widget,
                    props: value
                }
            }
        );
    },
    selectChange(e){
        var widget = widgets[e.target.value];
        this.setState({
            selected: e.target.value,
            current: {
                widget: widget,
                props: _.cloneDeep(widget.metaData && widget.metaData.props)
            }
        })
    },
    render() {
        var dataBinder = this.bindToState('data');
        var widget = this.state.current.widget;
        var customSettings = widget.metaData && widget.metaData.settings || {};
        var customStyle = defaultTheme[this.state.selected];
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <select value={this.state.selected} onChange={this.selectChange}>
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
                        <WidgetRenderer widget={widget} node={{props:this.state.current.props}}
                                        dataBinder={dataBinder} customStyle={customStyle} />
                    </div>
                    <div className="col-md-4">
                        <PropertyEditor value={ this.state.current.props } settings={customSettings}
                                        onChange={ this.logChange }  />
                        <hr/>
                        <pre>{JSON.stringify(this.state.current.props, null, 2)}</pre>
                    </div>
                </div>
            </div>
        )
    }
});

React.render(<App />, document.getElementById('app'));
