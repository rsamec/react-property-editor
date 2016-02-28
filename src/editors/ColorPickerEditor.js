import React, {PropTypes} from 'react';
import ColorPicker from 'react-colors-picker';
import EmptyValue from '../utils/EmptyValue';

const DEFAULT_COLOR = "#ff0a0a";
export default class ColorPickerEditor extends React.Component {

    unset(){
        this.props.onUpdated(undefined);
    }
    render() {
		var noValueComp = <a onClick={() => {this.props.onUpdated({color:DEFAULT_COLOR})}} className='jsonNovalue'>No value</a>;
		if (this.props.value === undefined) return noValueComp;

		var value = this.props.value || {};
        return (
            <div>
				<ColorPicker  animation="slide-up" color={value.color ||DEFAULT_COLOR} alpha={value.alpha} onChange={this.props.onUpdated} />
            </div>
        );
    }
}
