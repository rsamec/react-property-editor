import React, {PropTypes} from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal,Button} from 'react-bootstrap';
import Json from 'react-json';

//import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class JsonEditor extends React.Component {
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

    handleChange(value) {
        this.setState({value: value});
    }

    render() {
        return (
            <table>
                <tr>
                    <td>
                        <a onClick={this.open.bind(this)}>[...]</a>
                        <Modal show={this.state.showModal} onHide={this.close.bind(this)} bsSize='large'
                               aria-labelledby='contained-modal-title-lg'>
                            <Modal.Header closeButton>
                                <Modal.Title id='contained-modal-title-lg'>Json editor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Json value={this.state.value} onChange={this.handleChange.bind(this)} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.close.bind(this)}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </td>
                    <td>
                        <div>
                            <TruncateString value={this.props.value}/>
                        </div>
                    </td>
                </tr>
            </table>
        );
    }
};
