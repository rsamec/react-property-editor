import React, {PropTypes} from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal} from 'react-overlays';

import EmptyValue from '../utils/EmptyValue.js';
import ModalStyles from '../utils/ModalStyles.js';

export default class PlainTextEditor extends React.Component {
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
        this.setState({showModal: true, value:this.props.value});
    }
    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div>
                <EmptyValue value={this.props.value} open={this.open.bind(this)}><TruncateString value={this.props.value}/></EmptyValue>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} style={ModalStyles.modalStyle}
                       backdropStyle={ModalStyles.backdropStyle}>
                    <div style={ModalStyles.dialogStyle}>
                        <textarea rows="10" cols="70" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </div>
                </Modal>
            </div>
        );
    }
};
