import React from 'react';
import {Modal} from 'react-overlays';
import ModalStyles from '../utils/ModalStyles.js';
import EmptyValue from '../utils/EmptyValue.js';

var _ = require('lodash');
var babel = require('babel-core');
var CodeMirror = require('react-codemirror');
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

     handleChange(newCode) {
         this.setState({value: newCode});
     }
     componentWillReceiveProps(nextProps) {
         this.setState({value:  nextProps.value && nextProps.value.code || '' });
     }
    render() {
        var codeEditor = React.createElement(CodeMirror, {
			value: this.state.value,
			onChange: this.handleChange.bind(this),
			options: {
				// style: {border: '1px solid black'},
				// textAreaClassName: ['form-control'],
				// textAreaStyle: {minHeight: '10em'},
				mode: 'javascript',
				theme: 'solarized',
				lineNumbers: true
			}
		});
		
		//var codeEditor = <textarea rows="10" cols="70" value={this.state.value} onChange={this.handleChange.bind(this)}/>;
        var dialogStyle = _.extend(ModalStyles.dialogStyle,{minWidth:800});
        return (
            <div>
                <EmptyValue value={this.props.value} open={this.open.bind(this)}>Show code</EmptyValue>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} style={ModalStyles.modalStyle}
                       backdropStyle={ModalStyles.backdropStyle}>
                    <div style={dialogStyle}>{codeEditor}</div>
                </Modal>
            </div>
        );
    }
}







