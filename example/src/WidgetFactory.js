import _ from 'lodash';
import React from 'react';
var ReactBootstrap = require('react-bootstrap');

var bgStyle = function (source, panelSize) {
	var bg = source;
	var bgStyle = {};
	if (source === undefined) return bgStyle;
	//size
	if (!!bg.size) {
		if (panelSize !== undefined && (bg.size === "leftHalf" || bg.size === "rightHalf")) {
			bgStyle.backgroundSize = `${panelSize.width * 2}px ${panelSize.height}px`;
			bgStyle.backgroundPosition = bg.size === "leftHalf" ? '0% 0%' : '100% 0%';
			//console.log(bgStyle);
		}
		else {
			bgStyle.backgroundSize = bg.size;
			if (!!bg.position) bgStyle.backgroundPosition = bg.position;
		}
	}
	//gradient 
	var bgGradient = bg.gradient;
	if (bgGradient !== undefined) {
		//gradient
		if (bgGradient.stops !== undefined) {
			var gradientStops = _.reduce(bgGradient.stops, function (memo, stop) {
				return memo + ', ' + stop.color + ' ' + (stop.offset * 100) + '%'
			}, '');

			var orientation = bgGradient.orientation || 'top';
			var grandientType = bgGradient.orientation === 'center, ellipse cover' ? '-webkit-radial-gradient' : '-webkit-linear-gradient';
			bgStyle.background = grandientType + '(' + orientation + gradientStops + ')';
		}
	}

	//color
	var bgColor = bg.color;
	if (bgColor !== undefined) {
		if (!!bgColor.color) bgStyle.backgroundColor = bgColor.color;
		if (!!bgColor.alpha) bgStyle.opacity = bgColor.alpha / 100;
	}

	if (!!bg.image) bgStyle.backgroundImage = 'url(' + bg.image + ')';
	if (!!bg.repeat) bgStyle.backgroundRepeat = bg.repeat;
	if (!!bg.attachment) bgStyle.backgroundAttachment = bg.attachment;

	var filter = bg.filter || {};
	var cssFilter = "";
	if (!!filter.blur) cssFilter += ' blur(' + filter.blur + 'px)';
	if (!!filter.brightness) cssFilter += ' brightness(' + filter.brightness + '%)';
	if (!!filter.contrast) cssFilter += ' contrast(' + filter.contrast + '%)';
	if (!!filter.grayscale) cssFilter += ' grayscale(' + filter.grayscale + '%)';
	if (!!filter.hueRotate) cssFilter += ' hue-rotate(' + filter.hueRotate + 'deg)';
	if (!!filter.invert) cssFilter += ' invert(' + filter.invert + '%)';
	if (!!filter.opacity) cssFilter += ' opacity(' + filter.opacity + '%)';
	if (!!filter.saturate) cssFilter += ' saturate(' + filter.saturate + '%)';
	if (!!filter.sepia) cssFilter += ' sepia(' + filter.sepia + '%)';

	if (!!cssFilter) {
		bgStyle.WebkitFilter = cssFilter;
		bgStyle.filter = cssFilter;
	}
	//bgStyle.position = 'absolute';
	return bgStyle;
}

var Panel = (props) => {

	var style = _.extend(bgStyle(props.background), {width: 200, height: 200});
	return <div style={style}>
	</div>
};

var Widgets = {Panel: Panel};

var bootstrapWidgets = ['Input', 'Button', 'Panel', 'Glyphicon', 'Tooltip', 'Alert', 'Label', 'Well'];
_.each(bootstrapWidgets, function (widgetName) {
	var name = 'react-bootstrap.' + widgetName;
	Widgets[name] = ReactBootstrap[widgetName];
});


var bootstrapSettings = {
	fields: {
		//content:{type:'string'},
		bsSize: {
			type: 'select', settings: {
				options: _.map(['lg', 'large', 'sm', 'small'], function (key, value) {
					return {value: key, label: key};
				})
			}
		},
		bsStyle: {
			type: 'select', settings: {
				options: _.map(['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'], function (key, value) {
					return {value: key, label: key};
				})
			}
		}
	}
};

_.extend(Widgets['react-bootstrap.Button'], {
	metaData: {
		props: {
			bsSize: 'medium', bsStyle: 'default', content: 'Type content'
		},
		settings: bootstrapSettings
	}
});
_.extend(Widgets['react-bootstrap.Label'], {
	metaData: {
		props: {
			bsSize: 'medium', bsStyle: 'default', content: 'Type content'
		},
		settings: bootstrapSettings
	}
});

_.extend(Widgets['react-bootstrap.Panel'], {
	metaData: {
		props: {
			header: "Header", bsStyle: 'default', content: 'Type content'
		},
		settings: bootstrapSettings
	}
});

_.extend(Widgets['react-bootstrap.Glyphicon'], {
	metaData: {
		props: {
			bsSize: 'medium', bsStyle: 'default', glyph: 'star'
		},
		settings: bootstrapSettings
	}
});

_.extend(Widgets['react-bootstrap.Alert'], {
	metaData: {
		props: {
			bsSize: 'medium', bsStyle: 'default', content: 'Type content'
		},
		settings: bootstrapSettings
	}
});

_.extend(Widgets['react-bootstrap.Well'], {
	metaData: {
		props: {
			bsSize: 'lg', bsStyle: 'default', content: 'Type content', color: undefined
		},
		settings: bootstrapSettings
	}
});

_.extend(Widgets['react-bootstrap.Input'], {
	metaData: {
		props: {
			type: 'text', placeholder: 'type your text', label: 'label', help: undefined, value: ''
		},
		settings: bootstrapSettings
	}
});
const GridConfig = {
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
	canAddRow: false,
	// True if the user can add columns (by navigating right from the last column)
	canAddColumn: false,
	// Override the display value for an empty cell
	emptyValueSymbol: '-',
	// Fills the first column with index numbers (1...n) and the first row with index letters (A...ZZZ)
	hasLetterNumberHeads: false
};

_.extend(Panel, {
	metaData: {
		props: {
			color: undefined,
			gradient: undefined,
			background: undefined,
			styles: undefined,
			cGrid: undefined,
			pageOptions:undefined,
			grid: undefined,
			html:undefined,
			code:undefined
		},
		settings: {
			fields: {
				styles: {type: 'widgetStyleEditor', settings: {widgets: Widgets}},
				cGrid: {
					type: 'gridEditor',
					settings: {
						config: GridConfig,
						initialData: {
							rows: [
								['Key', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG'],
								['COM', '0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6'],
								['DIV', '1,0', '1,1', '1,2', '1,3', '1,4', '1,5', '1,6'],
								['DEV', '2,0', '2,1', '2,2', '2,3', '2,4', '2,5', '2,6'],
								['ACC', '3,0', '3,1', '3,2', '3,3', '3,4', '3,5', '3,6']
							]
						},
						converter: {
							parse: function (value) {
								return _.map(_.rest(value.rows,1), function (row, r) {
									var name = row[0];
									return _.map(_.rest(row,1), function (cell, c) {
										var c = _.isString(cell) ? cell.replace(",", ".") : cell;
										var n = parseFloat(c);
										return {name: name, v: isNaN(n) ? c : n};
									})
								})
							},
							format: function (value) {
								var headRow = ['Key', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG'];
								var columns = ["COM","DIV","DEV","ACC"];
								
								return {
									rows: [headRow].concat(_.map(value, function (row, r) {
										var name = columns[r];
										return [name].concat(_.map(row, function (cell, c) {
											return cell.v;
										}))
									}))
								}
							}
						}
					}
				},
				grid: {type: 'gridEditor'},
				pageOptions:{type:'pageOptionsEditor'},
				data: {type: 'jsonEditor'},
				html: {type: 'htmlEditor'},
				code: {type: 'codeEditor'}
			}
		}
	}
});

export default Widgets;
