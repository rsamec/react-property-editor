import React from 'react';
import Json from 'react-json-fork';
import _ from 'lodash';

import ColorPickerEditor from './editors/ColorPickerEditor.js';
import HtmlEditor from './editors/HtmlEditor.js';
import CodeEditor from './editors/CodeEditor.js';
import PlainTextEditor from './editors/PlainTextEditor.js';
import PlainJsonEditor from './editors/PlainJsonEditor.js';
import JsonEditor from './editors/JsonEditor.js';
import FontEditor from './editors/FontEditor.js';
import BoxEditor from './editors/BoxEditor.js';
import BoxSizeEditor from './editors/BoxSizeEditor.js';
import BorderEditor from './editors/BorderEditor.js';
import PositionEditor from './editors/PositionEditor.js';
import BindingEditor from './editors/BindingEditor.js';
import BindingValueEditor from './editors/BindingValueEditor.js';

import ModalStyles from './utils/ModalStyles.js';

// Register the type in react-json
Json.registerType('colorPicker', ColorPickerEditor);
Json.registerType('htmlEditor', HtmlEditor);
Json.registerType('codeEditor',CodeEditor);
Json.registerType('textEditor',PlainTextEditor);
Json.registerType('plainJsonEditor',PlainJsonEditor);
Json.registerType('jsonEditor',JsonEditor);
Json.registerType('fontEditor',FontEditor);
Json.registerType('boxEditor',BoxEditor);
Json.registerType('boxSizeEditor',BoxSizeEditor);
Json.registerType('positionEditor',PositionEditor);
Json.registerType('borderEditor',BorderEditor);
Json.registerType('bindingEditor',BindingEditor);
Json.registerType('bindingValueEditor',BindingValueEditor);
Json.registerType('dataEditor',JsonEditor);

var defaultSettings = {
    form: true,
    fixedFields:true,
    adder:false,
    editing:true,
    fields:{
        color:{type:'colorPicker'},
        fill:{type:'colorPicker'},
        stroke:{type:'colorPicker'},
        strokeWidth:{type:'number'},
        width:{type:'number'},
        height:{type:'number'},
        html:{type:'htmlEditor'},
        content:{type:'htmlEditor'},
        data:{type:'bindingEditor'},
        description:{type:'textEditor'},
        font:{type:'fontEditor'},
        border:{type:'borderEditor'},
        style:{type:'positionEditor'},
        margin:{type:'boxSizeEditor'},
        padding:{type:'boxSizeEditor'},
        box:{type:'boxEditor'},
        binding:{type:'bindingEditor'},
        value:{type:'bindingEditor'}
    }
};


export default class PropertyEditor {
    static registerType(type,editor){Json.registerType(type,editor);}
    static get ModalStyles(){return ModalStyles; }
    render(){
        var settings = _.merge(_.cloneDeep(defaultSettings),this.props.settings);
        return (<Json value={this.props.value} settings={settings} onChange={this.props.onChange} /> )
    }
}
