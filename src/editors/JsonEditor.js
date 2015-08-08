import React, {PropTypes} from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal} from 'react-overlays';
import Json from 'react-json';

import ModalStyles from '../utils/ModalStyles.js';

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
            <div>
                <a onClick={this.open.bind(this)}><TruncateString value={this.props.value}/></a>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} style={ModalStyles.modalStyle}
                       backdropStyle={ModalStyles.backdropStyle}>
                    <div style={ModalStyles.dialogStyle}>
                        <Json value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </div>
                </Modal>
            </div>
        );
    }
};
