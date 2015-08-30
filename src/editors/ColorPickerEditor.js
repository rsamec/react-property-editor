import React, {PropTypes} from 'react';
import {Modal} from 'react-overlays';
import ColorPicker,{Picker} from 'react-colors-picker';

import EmptyValue from '../utils/EmptyValue.js';
import ModalStyles from '../utils/ModalStyles.js';

export default class CodeEditor extends React.Component {

    //static propTypes = {onClose: PropTypes.func}
    constructor(props) {
        super(props);
        this.state = {show: false};
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }
    unset(){
        this.props.onUpdated(undefined);
    }
    handleChange(color) {
        this.props.onUpdated(color.hex);
    }
    render() {
        var color = this.props.value;
        return (
            <div>
                <EmptyValue value={this.props.value} open={this.open.bind(this)} unset={this.unset.bind(this)}>
                    <div style={{background: color, width: 100, height: 20, color: 'white'}}>
                        {color}
                    </div>
                </EmptyValue>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} style={ModalStyles.modalStyle}
                       backdropStyle={ModalStyles.backdropStyle}>
                    <div style={ModalStyles.dialogStyle}>
                        <Picker defaultColor={this.props.value} onChange={this.handleChange.bind(this)}/>
                    </div>
                </Modal>
            </div>

        );
    }
}
