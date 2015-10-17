import React from 'react';
import _ from 'lodash';
import Json from 'react-json-fork';

var defaultValues = {
    value:undefined,
    binding: {
        mode: 'OneWay',
        path: undefined,
        converter: undefined
    }
};
var settings = {
    form: true,
    fixedFields: true,
    adder: false,
    editing: true,
    fields: {
        binding: { type:'bindingEditor'}
    }
};

export default class BindingEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {checked: props.value===undefined};
    }
    checkedChanged(e){
        this.setState({checked:e.target.checked});
    }
    valueChanged(value){
        this.props.onUpdated(value);
    }
    render() {
        var value = _.extend(_.clone(defaultValues), this.props.value);
        settings.hiddenFields = [this.state.checked?'value':'binding'];
        var valueType = this.props.settings && this.props.settings.type;
        if (valueType !== undefined) settings.fields.value = {type:valueType};
        return (
            <div className='bindingEditor'>
                <input type="checkbox" checked={this.state.checked} onChange={ this.checkedChanged.bind(this)} style={{display:'inline'}}/>
                <Json value={value} settings={settings} onChange={ this.valueChanged.bind(this)}/>
            </div>);
    }
}
