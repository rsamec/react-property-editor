import React, {PropTypes} from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal,Button} from 'react-bootstrap';

//import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class PlainJsonEditor extends React.Component {
    //static propTypes = {onClose: PropTypes.func}
    constructor(props) {
        super(props);
        this.state = {show: false, value: JSON.stringify(this.props.value,null,2)};
    }

    close() {
        this.props.onUpdated(JSON.parse(this.state.value));
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    handleChange(e) {
        this.setState({value: e.target.value});
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
                                <Modal.Title id='contained-modal-title-lg'>Simple json editor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <textarea rows="10" cols="70" value={this.state.value}  onChange={this.handleChange.bind(this)} />
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
