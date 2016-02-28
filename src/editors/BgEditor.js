import React from 'react';
import _ from 'lodash';
import Json from 'react-json-fork';

import toEmptyProps from '../utils/toEmptyProps';

var settings = {
    form: true,
    fixedFields: true,
    adder: false,
    editing: true,
    fields:{
        image:{type:'string'},
        color:{type: 'colorPicker'},
		gradient:{type: 'gradientColorPicker'},
        size: {type: 'select', settings: {options: ['cover','contain','auto','leftHalf','rightHalf']}},
        position:{type:'number'},
        repeat: {type: 'select', settings: {options: ['repeat','repeat-x','repeat-y','no-repeat']}},
        attachment: {type: 'select', settings: {options: ['scroll','fixed','local']}},
        filter:{
            fields:{
                blur:{type:'number'},
                brightness:{type:'number'},
                contrast:{type:'number'},
                grayscale:{type:'number'},
                hueRotate:{type:'number'},
                invert:{type:'number'},
                opacity:{type:'number'},
                saturate:{type:'number'},
                sepia:{type:'number'}
            }
        }
    }
};
export default class BgEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false};
    }
    toogle(){
        this.setState({show:!this.state.show});
    }
    render() {
        var value = _.merge(toEmptyProps(settings),this.props.value);
        var text = '';//_.reduce(value,function(result,value,key){ return result+= " " + (value!==undefined?value:'--')},"");
        return (
            <div className={this.state.show?'open':''}>
                <span className="compoundToggle" onClick={this.toogle.bind(this)}>{text}</span>
                {this.state.show?<Json value={value} settings={settings} onChange={ this.props.onUpdated} />:null}
            </div>
        );
    }
}
