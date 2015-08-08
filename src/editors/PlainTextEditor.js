import React, {PropTypes} from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal} from 'react-overlays';

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
        this.setState({showModal: true});
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div>
                <a onClick={this.open.bind(this)}><TruncateString value={this.props.value}/></a>
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
