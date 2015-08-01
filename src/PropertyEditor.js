import React from 'react';
import Json from 'react-json';

import ColorPickerEditor from './editors/ColorPickerEditor.js';
import HtmlEditor from './editors/HtmlEditor.js';
import CodeEditor from './editors/CodeEditor.js';


// Register the type in react-json
Json.registerType('colorPicker', ColorPickerEditor);
Json.registerType('htmlEditor', HtmlEditor);
Json.registerType('codeEditor',CodeEditor);

var settings = {
    form: true,
    fixedFields:true,
    adder:false,
    editing:true,
    fields:{
        color:{type:'colorPicker'},
        fill:{type:'colorPicker'},
        stroke:{type:'colorPicker'},
        html:{type:'htmlEditor'},
        content:{type:'htmlEditor'},
        code:{type:'codeEditor'}
    }
};

export default class PropertyEditor {
    render(){
        return (<Json value={this.props.value} settings={settings} onChange={this.props.onChange} /> )
    }
}
