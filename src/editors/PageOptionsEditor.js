import React, {PropTypes} from 'react';
import TruncateString from '../utils/TruncateString.js';
import {Modal} from 'react-overlays';
import _ from 'lodash';

import EmptyValue from '../utils/EmptyValue.js';
import ModalStyles from '../utils/ModalStyles.js';
import PageSizes from '../utils/standardPageSizes';

const IMAGE_FACTOR = 10;
const PgeSizesList = _.map(PageSizes, function (value, key, index) {
		return {
			key: key,
			width: Math.round((value[0] / 72) * 96, 0),
			height: Math.round((value[1] / 72) * 96, 0),
			value: value
		}
	}
);

class PageSizeOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	pageSizeSelect(width, height) {
		var value = _.clone(this.props.value);
		if (this.props.onChange !== undefined) this.props.onChange(_.extend(value || {}, {
			width: width,
			height: height
		}));
	}

	onChecked(e, name) {
		var value = _.clone(this.props.value);
		var newValue = {};
		newValue[name] = e.target.checked;
		if (this.props.onChange !== undefined) this.props.onChange(_.extend(value || {}, newValue));
	}

	onValueChange(e, name) {
		var value = _.clone(this.props.value);
		var newValue = {};
		newValue[name] = parseInt(e.target.value, 10);
		if (this.props.onChange !== undefined) this.props.onChange(_.extend(value || {}, newValue));
	}

	onMarginChange(e, name) {
		var value = _.clone(this.props.value);
		var newValue = {};
		newValue[name] = parseInt(e.target.value, 10);
		if (this.props.onChange !== undefined) this.props.onChange(_.extend(value || {}, {margin: _.extend(value && value.margin || {}, newValue)}));
	}

	render() {
		var currentValue = this.props.value || {};
		var margin = currentValue.margin || {};
		return (
			<div>
				<div className="form-horizontal">
					<div className="form-group">
						<label className="col-sm-2 control-label">Width</label>
						<div className="col-sm-2">
							<input type="number" className="form-control" placeholder="Width" value={currentValue.width}
								   onChange={(e)=> this.onValueChange(e,'width')}/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Height</label>
						<div className="col-sm-2">
							<input type="number" className="form-control" placeholder="Height"
								   value={currentValue.height} onChange={(e)=> this.onValueChange(e,'height')}/>
						</div>
						<div className="col-sm-8">
							<a onClick={()=>{this.pageSizeSelect(currentValue.height,currentValue.width)}}>switch width x height</a>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<div className="checkbox">
								<label>
									<input type="checkbox" checked={currentValue.landscape}
										   onClick={(e) => this.onChecked(e,'landscape')}/> Landscape
								</label>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Margin</label>
						<div className="col-sm-2">
							<input type="number" className="form-control" placeholder="Top" value={margin.top}
								   onChange={(e)=> this.onMarginChange(e,'top')}/>
						</div>
						<div className="col-sm-2">
							<input type="number" className="form-control" placeholder="Right" value={margin.right}
								   onChange={(e)=> this.onMarginChange(e,'right')}/>
						</div>
						<div className="col-sm-2">
							<input type="number" className="form-control" placeholder="Bottom" value={margin.bottom}
								   onChange={(e)=> this.onMarginChange(e,'bottom')}/>
						</div>
						<div className="col-sm-2">
							<input type="number" className="form-control" placeholder="Left" value={margin.left}
								   onChange={(e)=> this.onMarginChange(e,'left')}/>
						</div>
					</div>

					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<div className="checkbox">
								<label>
									<input type="checkbox" checked={currentValue.coverPage}
										   onClick={(e) => this.onChecked(e,'coverPage')}/> Cover page
								</label>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<div className="checkbox">
								<label>
									<input type="checkbox" checked={currentValue.doublePage}
										   onClick={(e) => this.onChecked(e,'doublePage')}/> Double page
								</label>
							</div>
						</div>
					</div>

					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button onClick={()=>{this.setState({showPages:!this.state.showPages})}}
									className="btn btn-default">Show formats
							</button>
						</div>
					</div>
				</div>
				{
					this.state.showPages ? <div className="flex-container">
						{PgeSizesList.map(function (item, index) {

							var flexItemStyle = {};

							var selected = currentValue !== undefined && currentValue.width === item.width && currentValue.height === item.height;
							var width = Math.round(item.value[0] / IMAGE_FACTOR);
							var height = Math.round(item.value[1] / IMAGE_FACTOR);

							if (selected) flexItemStyle.backgroundColor = '#48D1CC';

							return (
								<div style={flexItemStyle} key={'format' + index} className="flex-item"
									 onClick={this.pageSizeSelect.bind(this,item.width,item.height)}>
									<div
										style={{width:width,height:height,lineHeight:height+ 'px'}}
										className="thumb">
										<span>{item.key}</span>
									</div>
									<div className="footer">{item.width} x {item.height}</div>
								</div>)

						}, this)}
					</div> : null
				}
			</div>
		)
	}
}

export default class PageOptionsEditor extends React.Component {
	//static propTypes = {onClose: PropTypes.func}
	constructor(props) {
		super(props);
		this.state = {show: false};
	}

	close() {
		var parse = this.props.settings && this.props.settings.converter && this.props.settings.converter.parse;
		if (this.state.value !== undefined) this.props.onUpdated(parse !== undefined ? parse(this.state.value) : this.state.value);
		this.setState({showModal: false});
	}

	open() {
		var format = this.props.settings && this.props.settings.converter && this.props.settings.converter.format;
		var parse = this.props.settings && this.props.settings.converter && this.props.settings.converter.parse;
		var initialData = this.props.settings && this.props.settings.initialData;

		if (parse !== undefined) initialData = parse(initialData);

		var data = this.props.value === undefined ? initialData : this.props.value;
		this.setState({showModal: true, value: format !== undefined ? format(data) : _.cloneDeep(data)});

	}

	handleChange(e) {
		this.setState({value: e.target.value});
	}


	render() {
		return (
			<div>
				<EmptyValue value={this.props.value} open={this.open.bind(this)}><TruncateString
					value={this.props.value}/></EmptyValue>
				<Modal show={this.state.showModal} onHide={this.close.bind(this)} style={ModalStyles.modalStyle}
					   backdropStyle={ModalStyles.backdropStyle}>
					<div style={ModalStyles.dialogStyle}>
						{<PageSizeOptions value={this.state.value} onChange={(data)=> {this.setState({value:data})}}/>}

					</div>
				</Modal>
			</div>
		);
	}
};
