import React from 'react';
import _ from 'lodash';
import PropertyEditor from 'react-property-editor';
import BindToMixin from 'react-binding';
import Json from 'react-json';
import WidgetFactory from './WidgetFactory.js';
import WidgetRenderer from './WidgetRenderer.js';
import DataTemplates from './DataTemplates.js';

var TickValues = React.createClass({
    mixins: [BindToMixin],
    onChange(){
        if (this.props.onChange !== undefined) this.props.onChange();
    },
    add(){
        this.props.tickValues.add({value: 0});
        this.onChange();
    },
    remove(item){
        this.props.tickValues.remove(item);
        this.onChange();
    },
    clear(){

        var source = this.props.tickValues.sourceObject;
        source.splice(0, source.length);
        this.props.tickValues.notifyChange();

        this.onChange();

    },

    render(){
        var items = this.props.tickValues.items;
        return (<div>
            <input type='button' value="add" onClick={this.add}/>
            <input type='button' value="clear" onClick={this.clear}/>
            <table>
                <tr>
                    {items.map(function (item, index) {
                        var valueLink = this.bindTo(item, 'value');
                        var handleChange = function (e) {
                            valueLink.value = e.target.value;
                            this.onChange();
                        }.bind(this);
                        return (
                            <td>
                                <input type='number' style={{width:50,display:'inline'}} key={index}
                                       value={valueLink.value} onChange={handleChange}/>
                            </td>)
                    }, this)}
                </tr>
            </table>
        </div>);
    }
});
// Create the custom field type component
var TickValuesWrapper = React.createClass({
    mixins: [BindToMixin],
    getInitialState(){
        return {
            tickValues: _.map(this.props.value, function (item) {
                return _.clone(item)
            })
        }
    },
    render: function () {
        var bindToArray = this.bindArrayToState('tickValues');
        return (<TickValues tickValues={bindToArray} onChange={this.handleChange}></TickValues>)
    },
    handleChange: function () {
        this.props.onUpdated(this.state.tickValues);
    }
});


Json.registerType('tickValues', TickValuesWrapper);

var cleanObjProps = function(obj){
    return cleanObjPropsEx(_.cloneDeep(obj));
}
var cleanObjPropsEx = function (obj) {
    for(var k in obj) {
        if(typeof obj[k] == "object"
            && obj[k] !== null
            && !(obj[k] instanceof Array)
            && !(obj[k] instanceof String)
            && !(obj[k] instanceof Number)) {

            cleanObjPropsEx(obj[k]);
            continue;
        }

        switch(typeof obj[k]) {
            case 'undefined':
            case 'boolean':
            case 'string':
            case 'number':
                obj[k] = undefined;
                break;
            default:
                obj[k] = [];
        }
    }
    return  obj;
};
var options = _.mapValues(WidgetFactory,function(value,key,object){return {value:key,name:key}  });
var widgets = WidgetFactory;
var font = {
    fontFamily: 'Papyrus',
    fontSize: 20
}
var defaultTheme = {
    'Core.TextBox':{
        font:font
    },
    'Core.HtmlBox':{
        font:font
    },
    'Core.ImagePanel':{
        bgColor:'#00ff09',
        font:font
    }
}
var defaultSelectedItem = 'Core.ImagePanel';
var App = React.createClass({
    mixins: [BindToMixin],
    getInitialState(){
        var widget = widgets[defaultSelectedItem];
        return {
            data: {
                text:'hello world',
                pie: [
                    {
                        "name": "Goiás",
                        "population": 6347114
                    },
                    {
                        "name": "Ceará",
                        "population": 7333886
                    },
                    {
                        "name": "Acre",
                        "population": 9498281
                    },
                    {
                        "name": "Goiás",
                        "population": 9362211
                    },
                    {
                        "name": "Acre",
                        "population": 4775630
                    }
                ],
                bar: [
                    [
                        {
                            "v": 15,
                            "name": "apple"
                        },
                        {
                            "v": 41,
                            "name": "apple"
                        },
                        {
                            "v": 41,
                            "name": "apple"
                        },
                        {
                            "v": 10,
                            "name": "apple"
                        }
                    ],
                    [
                        {
                            "v": 69,
                            "name": "banana"
                        },
                        {
                            "v": 57,
                            "name": "banana"
                        },
                        {
                            "v": 48,
                            "name": "banana"
                        },
                        {
                            "v": 41,
                            "name": "banana"
                        }
                    ],
                    [
                        {
                            "v": 12,
                            "name": "grape"
                        },
                        {
                            "v": 17,
                            "name": "grape"
                        },
                        {
                            "v": 19,
                            "name": "grape"
                        },
                        {
                            "v": 12,
                            "name": "grape"
                        }
                    ]
                ],
                smoothLine: [
                    [
                        {
                            "x": -10,
                            "y": -1000
                        },
                        {
                            "x": -9,
                            "y": -729
                        },
                        {
                            "x": -8,
                            "y": -512
                        },
                        {
                            "x": -7,
                            "y": -343
                        },
                        {
                            "x": -6,
                            "y": -216
                        },
                        {
                            "x": -5,
                            "y": -125
                        },
                        {
                            "x": -4,
                            "y": -64
                        },
                        {
                            "x": -3,
                            "y": -27
                        },
                        {
                            "x": -2,
                            "y": -8
                        },
                        {
                            "x": -1,
                            "y": -1
                        },
                        {
                            "x": 0,
                            "y": 0
                        },
                        {
                            "x": 1,
                            "y": 1
                        },
                        {
                            "x": 2,
                            "y": 8
                        },
                        {
                            "x": 3,
                            "y": 27
                        },
                        {
                            "x": 4,
                            "y": 64
                        },
                        {
                            "x": 5,
                            "y": 125
                        },
                        {
                            "x": 6,
                            "y": 216
                        },
                        {
                            "x": 7,
                            "y": 343
                        },
                        {
                            "x": 8,
                            "y": 512
                        },
                        {
                            "x": 9,
                            "y": 729
                        },
                        {
                            "x": 10,
                            "y": 1000
                        }
                    ],
                    [
                        {
                            "x": -10,
                            "y": 100
                        },
                        {
                            "x": -9,
                            "y": 81
                        },
                        {
                            "x": -8,
                            "y": 64
                        },
                        {
                            "x": -7,
                            "y": 49
                        },
                        {
                            "x": -6,
                            "y": 36
                        },
                        {
                            "x": -5,
                            "y": 25
                        },
                        {
                            "x": -4,
                            "y": 16
                        },
                        {
                            "x": -3,
                            "y": 9
                        },
                        {
                            "x": -2,
                            "y": 4
                        },
                        {
                            "x": -1,
                            "y": 1
                        },
                        {
                            "x": 0,
                            "y": 0
                        },
                        {
                            "x": 1,
                            "y": 1
                        },
                        {
                            "x": 2,
                            "y": 4
                        },
                        {
                            "x": 3,
                            "y": 9
                        },
                        {
                            "x": 4,
                            "y": 16
                        },
                        {
                            "x": 5,
                            "y": 25
                        },
                        {
                            "x": 6,
                            "y": 36
                        },
                        {
                            "x": 7,
                            "y": 49
                        },
                        {
                            "x": 8,
                            "y": 64
                        },
                        {
                            "x": 9,
                            "y": 81
                        },
                        {
                            "x": 10,
                            "y": 100
                        }
                    ]
                ]
            },
            selected: defaultSelectedItem,
            current: {
                widget: widget,
                props: cleanObjProps(widget.metaData && widget.metaData.props)
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
                props: cleanObjProps(widget.metaData && widget.metaData.props)
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
