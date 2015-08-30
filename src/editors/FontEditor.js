import React from 'react';
import TruncateString from '../utils/TruncateString.js';
import _ from 'lodash';
import Json from 'react-json';

var fontFamilies =[
    'Arial',
    'Verdana',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Papyrus'
]

var defaultValues = {
    fontFamily: 'Arial',
    fontSize: 14,
    bold: false,
    italic:false,
    underline:false,
    color: '#34495E'
};
var emptyValues = {
    fontFamily: undefined,
    fontSize: undefined,
    bold: undefined,
    italic:undefined,
    underline:undefined,
    color: undefined
}

var settings = {
    form: true,
    fixedFields: true,
    adder: false,
    editing: true,
    fields: {
        color: {type: 'colorPicker'},
        fontFamily: {
            type: 'select', settings: {
                options: _.map(fontFamilies, function (key, value) {
                    return {value: key, label: key};
                })
            }
        },
        fontSize:{type:'number'},
        bold:{type:'boolean'},
        italic:{type:'boolean'},
        underline:{type:'boolean'}
    }
}

export default class FontEditor extends React.Component {

    //static propTypes = {onClose: PropTypes.func}
    constructor(props) {
        super(props);
        this.state = {show: false};
    }
    //handleChange(value) {
    //    this.props.onUpdated(_.extend(value,
    //        {fontWeight: value.bold ? 'bold' : 'normal'}
    //    ));
    //}
    toogle(){
        this.setState({show:!this.state.show});
    }
    reset(){
        this.props.onUpdated(emptyValues);
    }
    render() {
        var value = _.extend(_.clone(emptyValues),this.props.value);
        var text = _.reduce(_.omit(value,['bold','italic','underline']),function(result,value,key){ return result+= " " + (value!==undefined?value:'--')},"");
        var reset = <a className='jsonReset' onClick={this.reset.bind(this)}>x</a>
        return (
            <div className={this.state.show?'open':''}>
                <span className="compoundToggle" onClick={this.toogle.bind(this)}>{text}</span>
                {this.props.value !== undefined  ? {reset}:null}
                {this.state.show?<Json value={value} settings={settings} onChange={this.props.onUpdated} />:null}
            </div>
        );
    }
}
