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
    render() {
        var value = _.extend(_.clone(defaultValues),this.props.value);
        var text = _.reduce(_.omit(value,['bold','italic','underline']),function(result,value,key){ return result+= " " + value},"");
        return (
            <div className={this.state.show?'open':''}>
                <span className="compoundToggle" onClick={this.toogle.bind(this)}>{text}</span>
                {this.state.show?<Json value={value} settings={settings} onChange={this.props.onUpdated} />:null}
            </div>
        );
    }
}
