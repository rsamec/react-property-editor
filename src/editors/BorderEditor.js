import React from 'react';
import _ from 'lodash';
import Json from 'react-json-fork';

var defaultValues = {
    width:1,
    radius: 5,
    color:'#ffffff',
    style:'solid'
};
var emptyValues = {
    width:undefined,
    radius: undefined,
    color:undefined,
    style:undefined
}
var settings = {
    form: true,
    fixedFields: true,
    adder: false,
    editing: true,
    fields:{
        width:{type:'number'},
        radius:{type:'number'},
        color:{type:'colorPicker'},
        style:{type:'select',settings:{options:['solid','dashed']}}
    }
};

export default class BorderEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false};
    }
    toogle(){
        this.setState({show:!this.state.show});
    }
    render() {
        var value = _.extend(_.clone(emptyValues),this.props.value);
        var text = _.reduce(value,function(result,value,key){ return result+= " " + (value!==undefined?value:'--')},"");
        return (
            <div className={this.state.show?'open':''}>
                <span className="compoundToggle" onClick={this.toogle.bind(this)}>{text}</span>
                {this.state.show?<Json value={value} settings={settings} onChange={ this.props.onUpdated} />:null}
            </div>
        );
    }
}
