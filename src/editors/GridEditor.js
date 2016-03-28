import React, {PropTypes} from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal} from 'react-overlays';
import _ from 'lodash';

import SpreadsheetComponent from 'react-spreadsheet-component';
import EmptyValue from '../utils/EmptyValue.js';
import ModalStyles from '../utils/ModalStyles.js';
//var Dispatcher = require('react-spreadsheet-component/lib/Dispatcher');

const DefaultGridConfig = {
	// Initial number of row
	rows: 5,
	// Initial number of columns
	columns: 8,
	// True if the first column in each row is a header (th)
	hasHeadColumn: true,
	// True if the data for the first column is just a string.
	// Set to false if you want to pass custom DOM elements.
	isHeadColumnString: true,
	// True if the first row is a header (th)
	hasHeadRow: true,
	// True if the data for the cells in the first row contains strings.
	// Set to false if you want to pass custom DOM elements.
	isHeadRowString: true,
	// True if the user can add rows (by navigating down from the last row)
	canAddRow: true,
	// True if the user can add columns (by navigating right from the last column)
	canAddColumn: true,
	// Override the display value for an empty cell
	emptyValueSymbol: '-',
	// Fills the first column with index numbers (1...n) and the first row with index letters (A...ZZZ)
	hasLetterNumberHeads: true
};
class SpreadSheet extends React.Component
{
	componentDidMount(){
		var self  = this;
		SpreadsheetComponent.Dispatcher.subscribe('dataChanged', function (data) {
			if (self.props.onChange!== undefined) self.props.onChange(data);
		}, "spreadsheet-1");
	}
	render() {
		var gridConfig = _.extend(_.clone(DefaultGridConfig),this.props.settings && this.props.settings.config);
		return <SpreadsheetComponent initialData={this.props.value} config={gridConfig} spreadsheetId="spreadsheet-1" />
	}
}
export default class GridEditor extends React.Component {
    //static propTypes = {onClose: PropTypes.func}
    constructor(props) {
        super(props);
        this.state = {show: false};
    }

    close() {
		var parse = this.props.settings && this.props.settings.converter && this.props.settings.converter.parse;
		if (this.state.value !== undefined) this.props.onUpdated(parse!==undefined?parse(this.state.value):this.state.value);
        this.setState({showModal: false});
    }

    open() {
		var format = this.props.settings && this.props.settings.converter && this.props.settings.converter.format;
		var parse = this.props.settings && this.props.settings.converter && this.props.settings.converter.parse;
		var initialData = this.props.settings && this.props.settings.initialData;
		
		if (parse!== undefined) initialData = parse(initialData);
		
		var data = this.props.value===undefined?initialData:this.props.value;
        this.setState({showModal: true,value:format!==undefined?format(data):_.cloneDeep(data)});
		
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
						<div className="excel">
							<SpreadSheet value={this.state.value} settings={this.props.settings} onChange={(data)=> {this.setState({value:data})}} />
						</div>
                    </div>
                </Modal>
            </div>
        );
    }
};
