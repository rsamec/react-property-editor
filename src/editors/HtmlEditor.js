import React, {PropTypes} from 'react';
import TinyMce from 'react-tinymce';
import TruncateString from '../utils/TruncateString.js';
import {Modal,Button} from 'react-bootstrap';

//import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class HtmlEditor extends React.Component {
    //static propTypes = {onClose: PropTypes.func}
    constructor(props) {
        super(props);
        this.state = {show: false, value: this.props.value};
    }

    close() {
        this.props.onUpdated(this.state.value);
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    handleChange(e) {
        this.setState({value: e.target.getContent()});
    }

    render() {
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
                                <TinyMce content={this.props.value}
                                         config={{
                            menubar: false,
                            height:300,
                            plugins: 'autolink link image lists code',
                            toolbar: 'bold italic underline | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | formatselect fontsizeselect | code',
                            style_formats: [
                                {title: 'Bold text', inline: 'b'},
                                {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
                                {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
                                {title: 'Example 1', inline: 'span', classes: 'example1'},
                                {title: 'Example 2', inline: 'span', classes: 'example2'},
                                {title: 'Table styles'},
                                {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
                            ]
                        }}
                                         onChange={this.handleChange.bind(this)}
                                    />
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
};
