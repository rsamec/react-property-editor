import React from 'react';
import _ from 'lodash';
import Json from 'react-json-fork';

var defaultValues = {
    margin:{},
    padding:{},
    border:{},
    content:{}
};
var settings = {
    form: true,
    fixedFields: true,
    adder: false,
    editing: true,
    fields:{
        margin:{type:'boxSizeEditor'},
        padding:{type:'boxSizeEditor'},
        border:{type:'borderEditor'},
        content:{type:'htmlEditor'}
    }
};

export default class BoxEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false};
    }
    toogle(){
        this.setState({show:!this.state.show});
    }
    render() {
        var value = _.extend(_.clone(defaultValues),this.props.value);
        var text = _.reduce(value,function(result,value,key){ return result+= " " + (value!==undefined?value:'--')},"");
        return (
            <div className={this.state.show?'open':''}>
                <span className="compoundToggle" onClick={this.toogle.bind(this)}>{text}</span>
                {this.state.show?<Json value={value} settings={settings} onChange={ this.props.onUpdated} />:null}
            </div>
        );
    }
}
