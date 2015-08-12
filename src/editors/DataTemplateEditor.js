import React, {PropTypes} from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal} from 'react-overlays';
import Json from 'react-json';
import _ from 'lodash'
import genie from 'genie';

import DataTemplates from '../utils/DataTemplates.js';
import ModalStyles from '../utils/ModalStyles.js';

export default class DataTemplateEditor extends React.Component {
    //static propTypes = {onClose: PropTypes.func}
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            value: this.props.value.toJS(),
            selectedTemplate:{name:'bar',content:DataTemplates['bar']}
        };
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
    generate(){
        this.setState({result:genie(this.state.value)})
    }
    templateChanged(e){
        var newDataTemplate =  DataTemplates[e.target.value];
        if (newDataTemplate !== undefined)
            this.setState({selectedTemplate:{name:e.target.value,content:newDataTemplate}});
    }
    addTemplate(e) {
        var template = this.state.selectedTemplate;
        if (template !== undefined) {
            var addPart = {};
            addPart[template.name] = {min:1,max:1,template:template.content};
            this.setState({value: _.extend(this.state.value,addPart)});
        }
    }


    render() {
        var dialogStyle = _.extend(ModalStyles.dialogStyle,{minWidth:800});
        var options = _.map(_.keys(DataTemplates),function(option,i){return <option key={i} value={option}>{option}</option>});
        return (
            <div>
                <a onClick={this.open.bind(this)}><TruncateString value={this.props.value}/></a>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} style={ModalStyles.modalStyle}
                       backdropStyle={ModalStyles.backdropStyle}>
                    <div style={dialogStyle}>
                        <select onChange={this.templateChanged.bind(this)}>{options}</select>
                        <div>{JSON.stringify(this.state.selectedTemplate.content,null,2)}</div>
                        <button onClick={this.addTemplate.bind(this)}>Add</button>
                        <hr />
                        <Json value={this.state.value} onChange={this.handleChange.bind(this)}/>
                        <hr />
                        <button onClick={this.generate.bind(this)}>Generate</button>
                        <hr />
                        <div>{JSON.stringify(this.state.result,null,2)}</div>
                    </div>
                </Modal>
            </div>
        );
    }
};
