import React from 'react';
import _ from 'lodash';
import PropertyEditor from 'react-property-editor';
import BindToMixin from 'react-binding';
import Json from 'react-json';
import WidgetFactory from './WidgetFactory.js';
import WidgetRenderer from './WidgetRenderer.js';
import DataTemplates from './DataTemplates.js';

//react bootstrap
import {Button,Input,Panel,Glyphicon,Label,Alert,Well} from 'react-bootstrap';

//react-pathjs-chart
import {Pie,Bar, SmoothLine,StockLine,Scatterplot,Tree,Radar} from 'react-pathjs-chart';
import ChartProps from './ChartProps.js';

//react-designer-widgets

import JSXBox from './JSXBox.js';
import ImagePanel from './ImagePanel.js'

var widgetFactory = new WidgetFactory();

widgetFactory.registerWidget('JSXBox', _.extend(JSXBox,{
    metaData: {
        props: {
            content: {
                code:'return (<div>type your code</div>)',
                compiled:'(function(){return React.createElement("div",null,"type your code")})();'
            },
            input:{},
            output:{Mode:'TwoWay'},
            locales:{},
            style:{
                top:0,
                left:0,
                width:100,
                height:100,
                position:'relative'
            }
        },
        settings:{
            fields:{
                content:{type:'codeEditor'},
                input:{type:'bindingEditor',settings:{mode:'TwoWay'}},
                output:{type:'bindingEditor',settings:{mode:'OneWay'}},
                locales:{type:'bindingEditor',settings:{mode:'OneWay'}}
            },
        }
    }
}));


widgetFactory.registerWidget('Chart.Pie', _.extend(Pie, {metaData: ChartProps['Chart.Pie']}));
widgetFactory.registerWidget('Chart.SmoothLine', _.extend(SmoothLine, {metaData: ChartProps['Chart.SmoothLine']}));
widgetFactory.registerWidget('Chart.Bar', _.extend(Bar, {metaData: ChartProps['Chart.Bar']}));

const defaultImageUrl = "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
//widgetFactory.registerWidget('ImageBox', _.extend(designerWidgets['ImageBox'], {
//    metaData: {
//        props: {
//            style: {},
//            url: defaultImageUrl,
//            radius: 5
//        }
//    }
//}));
widgetFactory.registerWidget('ImagePanel', _.extend(ImagePanel, {
    metaData: {
        props: {
            width: 700,
            height: 400,
            content: 'type your content',
            bgColor: '#f7c10c',
            margin:{},
            padding:{
                top:10,
                right:10,
                bottom:10,
                left:10
            },
            border:{
                width: 3,
                radius: 10,
                color:'#000000',
                style:'solid'
            },
            imageAlign: 'topLeft',
            image: {
                url: defaultImageUrl,
                width: 100,
                height: 100,
                border:{
                    width: 2,
                    radius: 20,
                    color:'#000000',
                    style:'solid'
                },
                margin: {
                    top:5,
                    left:5,
                    bottom:5,
                    right:5
                },

            }
        },
        settings: {
            fields: {
                imageAlign: {
                    type: 'select',
                    settings: {options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']}
                },
                image: {
                    fields: {
                        padding:{type:'boxSizeEditor'},
                        margin:{type:'boxSizeEditor'},
                        border:{type:'borderEditor'}
                    }
                },
                bgColor: {type: 'colorPicker'}
            }
        }

    }
}));

var bootstrapSettings = {
    fields:{
        //content:{type:'string'},
        bsSize:{type:'select',settings: {
            options: _.map(['large','medium','small','xsmall'], function (key, value) {
                return {value: key, label: key};
            })
        }},
        bsStyle:{type:'select',settings: {
            options: _.map(['default','primary','success','info','warning','danger','link'], function (key, value) {
                return {value: key, label: key};
            })
        }}
    }
};

widgetFactory.registerWidget('react-bootstrap.Button', _.extend(Button, {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
}));
widgetFactory.registerWidget('react-bootstrap.Label', _.extend(Label, {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
}));

widgetFactory.registerWidget('react-bootstrap.Panel', _.extend(Panel, {
    metaData: {
        props: {
            header:"Header",bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
}));

widgetFactory.registerWidget('react-bootstrap.Glyphicon', _.extend(Glyphicon, {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', glyph: 'star'
        },
        settings:bootstrapSettings
    }
}));

widgetFactory.registerWidget('react-bootstrap.Alert', _.extend(Alert, {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
}));

widgetFactory.registerWidget('react-bootstrap.Well', _.extend(Well, {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
}));

widgetFactory.registerWidget('react-bootstrap.Input', _.extend(Input, {
    metaData: {
        props: {
            type: 'text',placeholder:'type your text', label:'label', help:'',value:''
        },
        settings:bootstrapSettings
    }
}));

var widgets = widgetFactory.widgets;
//Json.registerType('colorPicker',ColorPickerWrapper);


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

// Create the custom field type component
var DataComponent = React.createClass({
    render: function () {
        return (<div>{JSON.stringify(this.props.data,null,2)}</div>)
    },
});

widgetFactory.registerWidget('Data', _.extend(DataComponent, {
    metaData: {
        props: {
            data: {},
            style:{
                top:0,
                left:0
            }
        },
        settings:{
            fields:{data:{type:'dataTemplateEditor', settings:{templates:DataTemplates}}}
        }
    }
}));

// form: true
// make objects not extensible,
// fields not removable
// and inputs always visible
var chartSettings = {
    fields: {
        options: {
            fields: {
                data: {type: 'bindingEditor'},
                fill: {type: 'colorPicker'},
                color: {type: 'colorPicker'},
                stroke: {type: 'colorPicker'},
                margin: {type: 'boxEditor'},
                legendPosition: {
                    type: 'select',
                    settings: {options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']}
                },
                label: {type: 'fontEditor'},
                animate: {
                    fields: {type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}}}
                }
                ,
                axisY: {
                    fields: {
                        orient: {type: 'select', settings: {options: ['left', 'right']}},
                        tickValues: {type: 'tickValues'},
                        label: {type: 'fontEditor'},
                    }
                },
                axisX: {
                    fields: {
                        orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                        tickValues: {type: 'tickValues'},
                        label: {type: 'fontEditor'}
                    }
                }
            }
        }
    }
};

var options = [
    {value: 'Data', name: 'Data'},
    {value: 'JSXBox', name: 'JSXBox'},
    {value: 'Chart.Pie', name: 'Pie'},
    {value: 'Chart.SmoothLine', name: 'SmoothLine'},
    {value: 'Chart.Bar', name: 'Bar'},
    {value: 'ImageBox', name: 'ImageBox'},
    {value: 'ImagePanel', name: 'ImagePanel'},
    {value: 'react-bootstrap.Button', name: 'Button'},
    {value: 'react-bootstrap.Label', name: 'Label'},
    {value: 'react-bootstrap.Panel', name: 'Panel'},
    {value: 'react-bootstrap.Alert', name: 'Alert'},
    {value: 'react-bootstrap.Glyphicon', name: 'Glyphicon'},
    {value: 'react-bootstrap.Input', name: 'Input'},
    {value: 'react-bootstrap.Well', name: 'Well'}

];


var App = React.createClass({
    mixins: [BindToMixin],
    getInitialState(){
        var widget = widgets['Data'];
        return {
            data: {
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
            selected: 'Data',
            current: {
                widget: widget,
                props: widget.metaData.props
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
                props: widget.metaData.props
            }
        })
    },
    render() {
        var dataBinder = this.bindToState('data');
        var widget = this.state.current.widget;
        var customSettings = widget.metaData !== undefined ? widget.metaData.settings:undefined;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <select value={this.state.selected} onChange={this.selectChange}>
                            {
                                options.map(function (option, i) {
                                    return (<option key={i} value={option.value}>{option.name}</option>)
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <WidgetRenderer widget={widget} value={this.state.current.props}
                                        dataBinder={dataBinder}/>
                    </div>
                    <div className="col-md-4">
                        <PropertyEditor value={ this.state.current.props } settings={customSettings}
                                        onChange={ this.logChange }/>
                        <hr/>
                        <pre>{JSON.stringify(this.state.current.props, null, 2)}</pre>
                    </div>
                </div>
            </div>
        )
    }
});

React.render(<App />, document.getElementById('app'));
