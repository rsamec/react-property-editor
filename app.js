require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _reactPropertyEditor = require('react-property-editor');

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

var _reactPropertyEditor2 = _interopRequireDefault(_reactPropertyEditor);

var App = _react2['default'].createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
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
                    }
                },
                array: [1, 2, 3]
            }
        };
    },
    logChange: function logChange(value) {
        console.log(value);
        this.setState({ value: value });
        console.log(this.state.value);
    },
    render: function render() {
        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(_reactPropertyEditor2['default'], { value: this.state.value, onChange: this.logChange })
        );
    }
});

_react2['default'].render(_react2['default'].createElement(App, null), document.getElementById('app'));


},{"react":undefined,"react-property-editor":undefined,"underscore":undefined}]},{},[1]);
