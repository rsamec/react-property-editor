import React, {PropTypes} from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal} from 'react-overlays';
import Json from 'react-json-fork';
import _ from 'lodash'

import EmptyValue from '../utils/EmptyValue.js';
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
        this.setState({showModal: true,value:this.props.value});
    }

    handleChange(value) {
        this.setState({value: value});
    }

    render() {
        var dialogStyle = _.extend(ModalStyles.dialogStyle,{minWidth:800});
        return (
            <div>
                <EmptyValue value={this.props.value} open={this.open.bind(this)}><TruncateString value={this.props.value}/></EmptyValue>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} style={ModalStyles.modalStyle}
                       backdropStyle={ModalStyles.backdropStyle}>
                    <div style={dialogStyle}>
                        <Json value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </div>
                </Modal>
            </div>
        );
    }
};
