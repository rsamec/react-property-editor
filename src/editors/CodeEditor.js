import React from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal,Button} from 'react-bootstrap';

var CodeMirror = require('react-code-mirror');
var SyntaxHighLight = require('codemirror/mode/javascript/javascript');

export default class CodeEditor extends React.Component {

    //static propTypes = {onClose: PropTypes.func}
    constructor(props) {
        super(props);
        this.state = {show: false, value: this.props.value};
    }

    close() {
        //var editor = React.findDOMNode(this.refs.editor);
        //var codeToCompile = '(function() {' + value + '})();';
        //var code = ReactTools.transform(codeToCompile,{harmony: true});
        //var code = JSXTransformer.transform(codeToCompile,{harmony: true}).code;

        this.props.onUpdated(this.state.value);
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
        return (
            <table>
                <tr>
                    <td>
                        <div>
                            <TruncateString value={this.props.value}/>
                        </div>
                    </td>
                    <td>
                        <a onClick={this.open.bind(this)}>[...]</a>
                        <Modal show={this.state.showModal} onHide={this.close.bind(this)} bsSize='large'
                               aria-labelledby='contained-modal-title-lg'>
                            <Modal.Header closeButton>
                                <Modal.Title id='contained-modal-title-lg'>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {codeMirrorComponent}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.close.bind(this)}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </td>
                </tr>
            </table>
        );
    }
}
