import React from 'react';
import _ from 'underscore';
import PropertyEditor from 'react-property-editor';
//import TinyMce from 'react-tinymce';

//Json.registerType('colorPicker',ColorPickerWrapper);


// form: true
// make objects not extensible,
// fields not removable
// and inputs always visible
//var settings = {
//    form: true,
//    fields: {
//        color:{type:'colorPicker',settings:{options:_.map(colors,function(key,value){return {value:key,label:value};})}},
//        fill:{type:'colorPicker',settings:{options:_.map(colors,function(key,value){return {value:key,label:value};})}},
//        stroke:{type:'colorPicker',settings:{options:_.map(colors,function(key,value){return {value:key,label:key};})}},
//        legendPosition: {type: 'select', settings: {options: ['topLeft','topRight','bottomLeft','bottomRight']}},
//        label:labelOptions,
//        animate:{
//            fields:{type:{type:'select',  settings: {options: ['delayed','async','oneByOne']}}}}
//        ,
//        axisY: {
//            fields: {
//                orient: {type: 'select', settings: {options: ['left', 'right']}},
//                tickValues: {type: 'tickValues'},
//                label:labelOptions
//            }
//        },
//        axisX: {
//            fields: {
//                orient: {type: 'select', settings: {options: ['top', 'bottom']}},
//                tickValues: {type: 'tickValues'},
//                label: labelOptions
//            }
//        },
//        data:{
//            fields:{
//                template:{
//                    fields:{
//                        title:{
//                            fields:{
//                                pattern:{ type:'select', settings:{options:patternsOptions}}
//                            }
//                        },
//                        name:{
//                            fields:{
//                                pattern:{ type:'select', settings:{options:patternsOptions}}
//                            }
//                        }
//                    }
//                }
//            }
//        },
//        children:{
//            fields:{
//                template:{
//                    fields:{
//                        name:{
//                            fields:{
//                                pattern:{ type:'select', settings:{options:patternsOptions}}
//                            }
//                        },
//                        children:{
//                            fields: {
//                                template: {
//                                    fields: {
//                                        name: {
//                                            fields: {
//                                                pattern: {type: 'select', settings: {options: patternsOptions}}
//                                            }
//                                        }
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//    }
//};

var App = React.createClass({
    getInitialState(){
        return {
            value: {
                name: "amigo",
                color: '',
                html: '',
                code: '',
                chart: {
                    showLines: true,
                    axisX: {
                        showLines: true
                    },
                },
                array: [1, 2, 3]
            }
        }
    },
    logChange(value){
        console.log(value);
        this.setState({value:value});
        console.log(this.state.value);

    },
    render() {
        return (<div>
            <PropertyEditor value={ this.state.value }  onChange={ this.logChange } />
        </div>)
    }
});

React.render(<App />, document.getElementById('app'));
