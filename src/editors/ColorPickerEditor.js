import React, {PropTypes} from 'react';
import {Modal,Button} from 'react-bootstrap';
import ColorPicker from 'react-color-picker';

export default class CodeEditor extends React.Component {

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

    handleChange(color) {
        this.props.onUpdated(color);
        this.setState({value: color});
    }

    render() {
        var color = this.props.value === undefined ? "#000000" : this.props.value;
        return (
            <table>
                <tr>
                    <td>
                        <div style={{background: color, width: 100, height: 20, color: 'white'}}>
                            {color}
                        </div>
                    </td>
                    <td>
                        <a onClick={this.open.bind(this)}>[...]</a>
                        <Modal show={this.state.showModal} onHide={this.close.bind(this)} bsSize='large'
                               aria-labelledby='contained-modal-title-lg'>
                            <Modal.Header closeButton>
                                <Modal.Title id='contained-modal-title-lg'>Color picker</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ColorPicker value={this.props.value} onChange={this.handleChange.bind(this)}/>
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
