import React from 'react';
import _ from 'underscore';
import PropertyEditor from 'react-property-editor';
import BindToMixin from 'react-binding';
import Json from 'react-json';
//import TinyMce from 'react-tinymce';

//Json.registerType('colorPicker',ColorPickerWrapper);

var fontFamilies =[
    'Arial',
    'Verdana',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Papyrus'
]

var TickValues = React.createClass({
    mixins: [BindToMixin],
    onChange(){
        if (this.props.onChange!== undefined) this.props.onChange();
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
        source.splice(0,source.length);
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
                        var valueLink =this.bindTo(item,'value');
                        var handleChange = function(e){
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
        return {tickValues:_.map(this.props.value,function(item){return _.clone(item)})}
    },
    render: function () {
        var bindToArray = this.bindArrayToState('tickValues');
        return (<TickValues tickValues={bindToArray}  onChange={this.handleChange}></TickValues>)
    },
    handleChange: function () {
        this.props.onUpdated(this.state.tickValues);
    }
});

Json.registerType('tickValues',TickValuesWrapper);

var labelOptions= {
    fields: {
        fontFamily: {
            type: 'select', settings: {
                options: _.map(fontFamilies, function (key, value) {
                    return {value: key, label: key};
                })
            }
        },
        fill: {type: 'colorPicker'}

    }
};

// form: true
// make objects not extensible,
// fields not removable
// and inputs always visible
var chartSettings = {
    fields: {
        options:{
            fields:{
                fill: {type: 'colorPicker'},
                color: {type: 'colorPicker'},
                stroke: {type: 'colorPicker'},
                legendPosition: {type: 'select', settings: {options: ['topLeft','topRight','bottomLeft','bottomRight']}},
                label:labelOptions,
                animate:{
                    fields:{type:{type:'select',  settings: {options: ['delayed','async','oneByOne']}}}}
                ,
                axisY: {
                    fields: {
                        orient: {type: 'select', settings: {options: ['left', 'right']}},
                        tickValues: {type: 'tickValues'},
                        label:labelOptions
                    }
                },
                axisX: {
                    fields: {
                        orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                        tickValues: {type: 'tickValues'},
                        label: labelOptions
                    }
                }
            }
        }
    }
};

var App = React.createClass({
    getInitialState(){
        return {
            value: {
                name: "amigo",
                color: '',
                html: '',
                code: '',
                options: {
                    width:600,
                    height:600,
                    color:'#2980B9',
                    margin: {top: 40, left: 60, bottom: 50, right: 20},
                    animate:{
                        type:'delayed',
                        duration:200
                    },
                    axisX: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'bottom',
                        tickValues:[],
                        label:{
                            fontFamily:'Arial',
                            fontSize:14,
                            fontWeight:true,
                            fill:'#34495E'
                        }
                    },
                    axisY: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'left',
                        tickValues:[],
                        label:{
                            fontFamily:'Arial',
                            fontSize:14,
                            fontWeight:true,
                            fill:'#34495E'
                        }
                    }
                },
                array: [1, 2, 3]
            }
        }
    },
    logChange(value){
        this.setState({value:value});
    },
    render() {
        return (<div>
            <PropertyEditor value={ this.state.value } settings={chartSettings} onChange={ this.logChange } />
        </div>)
    }
});

React.render(<App />, document.getElementById('app'));
