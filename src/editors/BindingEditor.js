import React from 'react';
import _ from 'lodash';
import Json from 'react-json-fork';

var defaultValues = {
    path: undefined,
    converter: undefined,
    converterArgs:undefined,
    mode: 'OneWay'
};
var settings = {
    form: true,
    fixedFields: true,
    adder: false,
    editing: true,
    fields: {
        mode: {
            type: 'select', settings: {
                editing:false,
                options: _.map(['OneWay', 'TwoWay'], function (key, value) {
                    return {value: key, label: key};
                })
            }
        },
        converter: {
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
    render() {
        var value = _.extend(_.clone(defaultValues), this.props.value);
        var textClass = !!value.path?"":"jsonNovalue";
        var text = !!value.path?'= ' + value.path:"No value";
        return (
                <div className={this.state.show?'open':''}>
                    <span className="compoundToggle" onClick={this.toogle.bind(this)}><span className={textClass}>{text}</span></span>
                    {this.state.show ?
                        <Json value={value} settings={settings} onChange={ this.props.onUpdated}/> : null}
                </div>
        );
    }
}
