import React from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal} from 'react-overlays';
import ModalStyles from '../utils/ModalStyles.js';
import _ from 'lodash';

var babel = require('babel-core');
var CodeMirror = require('react-code-mirror');
var SyntaxHighLight = require('codemirror/mode/javascript/javascript');


export default class CodeEditor extends React.Component {

    //static propTypes = {onClose: PropTypes.func}
    constructor(props) {
        super(props);
        var code = this.props.value && this.props.value.code || '';
        this.state = {show: false, value: code};
    }

    close() {
        //var editor = React.findDOMNode(this.refs.editor);
        var codeToCompile = '(function() {' + this.state.value + '})();';
        //var code = ReactTools.transform(codeToCompile,{harmony: true});
        //var code = JSXTransformer.transform(codeToCompile,{harmony: true}).code;

        var result = babel.transform(codeToCompile, {});
        var newValue = {code: this.state.value, compiled: result.code};
        this.props.onUpdated(newValue);
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {

        var codeMirrorComponent = React.createElement(CodeMirror, {
            style: {border: '1px solid black'},
            textAreaClassName: ['form-control'],
            textAreaStyle: {minHeight: '10em'},
            value: this.state.value,
            mode: 'javascript',
            theme: 'solarized',
            lineNumbers: true,
            onChange: this.handleChange.bind(this)
        });
        var dialogStyle = _.extend(ModalStyles.dialogStyle,{minWidth:800});
        return (
            <div>
                <a onClick={this.open.bind(this)}><TruncateString value={this.props.value}/></a>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} style={ModalStyles.modalStyle}
                       backdropStyle={ModalStyles.backdropStyle}>
                    <div style={dialogStyle}>{codeMirrorComponent}</div>
                </Modal>
            </div>
        );
    }
}
