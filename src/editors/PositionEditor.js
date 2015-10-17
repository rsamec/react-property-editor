import React from 'react';
import _ from 'lodash';
import Json from 'react-json-fork';


var defaultValues = {
    top: 0,
    left: 0,
    height: 0,
    width: 0
};
var settings = {
    form: true,
    fixedFields: true,
    adder: false,
    editing: true,
    fields:{
        top:{type:'number'},
        left:{type:'number'},
        height:{type:'number'},
        width:{type:'number'},
        position: {
            type: 'select', settings: {options:['static','relative','absolute','fixed','initial','inherit']}
        },
        'z-index': {type: 'number'},
        transform: {
            fields: {
                tx: {type: 'number'},
                ty: {type: 'number'},
                sx: {type: 'number'},
                sy: {type: 'number'},
                rz: {type: 'number'},
                ox: {type: 'number'},
                oy: {type: 'number'}
            }
        }
    }
};

export default class PositionEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false};
    }
    toogle(){
        this.setState({show:!this.state.show});
    }
    render() {
        var value = _.clone(this.props.value);
        var text = _.reduce(_.omit(value,'transform'),function(result,value,key){ return result+= " " + (value!==undefined?value:'--')},"");
        return (
            <div className={this.state.show?'open':''}>
                <span className="compoundToggle" onClick={this.toogle.bind(this)}>{text}</span>
                {this.state.show?<Json value={value} settings={settings} onChange={ this.props.onUpdated} />:null}
            </div>
        );
    }
}
