import React, {PropTypes} from 'react';
import TinyMce from 'react-tinymce';
import TruncateString from '../utils/TruncateString.js';
import {Modal} from 'react-overlays';
import _ from 'lodash';

import ModalStyles from '../utils/ModalStyles.js';
import TooltipStyles from '../utils/TooltipStyles.js';
import EmptyValue from '../utils/EmptyValue.js';

export default class HtmlEditor extends React.Component {
    //static propTypes = {onClose: PropTypes.func}
    constructor(props) {
        super(props);
        this.state = {showModal: false, value: this.props.value};
    }

    close() {
        this.props.onUpdated(this.state.value);
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true,value:this.props.value});
    }

    handleChange(e) {
        this.setState({value: e.target.getContent()});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.showModal !== nextState.showModal || this.props.value !== nextProps.value;
    }
    render() {
        var dialogStyle = _.extend(ModalStyles.dialogStyle,{minWidth:800});
        return (
            <div>
                <EmptyValue value={this.props.value} open={this.open.bind(this)}><TruncateString value={this.props.value}/></EmptyValue>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} style={ModalStyles.modalStyle}
                       backdropStyle={ModalStyles.backdropStyle} enforceFocus={false}>
                    <div style={dialogStyle}>
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
                    </div>
                </Modal>
            </div>
        );
    }
};
