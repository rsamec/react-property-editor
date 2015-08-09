import React from 'react';
import _ from 'lodash';
import Json from 'react-json';

var defaultValues = {
    Path: '',
    Mode: 'OneWay',
    Converter: undefined
};
var settings = {
    form: true,
    fixedFields: true,
    adder: false,
    editing: true,
    fields: {
        Mode: {
            type: 'select', settings: {
                editing:false,
                options: _.map(['OneWay', 'TwoWay'], function (key, value) {
                    return {value: key, label: key};
                })
            }
        },
        Converter: {
            type: 'codeEditor'
        },
    }
};

export default class BindingEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false};
    }

    toogle() {
        this.setState({show: !this.state.show});
    }
    valueChanged(e){
        var value = _.cloneDeep(this.props.value);
        value.Path = e.target.value;
        this.props.onUpdated(value);
    }
    render() {
        var value = _.extend(_.clone(defaultValues), this.props.value);
        var textClass = !!value.Path?"":"jsonNovalue";
        var text = !!value.Path?value.Path:"No value";
        return (
                <div className={this.state.show?'open':''}>
                    <span className="compoundToggle" onClick={this.toogle.bind(this)}><span className={textClass}>{text}</span></span>
                    {this.state.show ?
                        <Json value={value} settings={settings} onChange={ this.props.onUpdated}/> : null}
                </div>
        );
    }
}
