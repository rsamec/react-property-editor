import _ from 'lodash';
import React from 'react';
var ReactBootstrap = require('react-bootstrap');

var bgStyle =  function(source,panelSize) {
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
		else{
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
		
		var style = _.extend(bgStyle(props.background),{width:200,height:200});
		return <div style={style}>
	</div>
};

var Widgets = {Panel:Panel};

var bootstrapWidgets = ['Input', 'Button', 'Panel', 'Glyphicon', 'Tooltip', 'Alert', 'Label','Well'];
_.each(bootstrapWidgets, function (widgetName) {
    var name = 'react-bootstrap.' + widgetName;
    Widgets[name] = ReactBootstrap[widgetName];
});


var bootstrapSettings = {
    fields:{
        //content:{type:'string'},
        bsSize:{type:'select',settings: {
            options: _.map(['lg','large','sm','small'], function (key, value) {
                return {value: key, label: key};
            })
        }},
        bsStyle:{type:'select',settings: {
            options: _.map(['default','primary','success','info','warning','danger','link'], function (key, value) {
                return {value: key, label: key};
            })
        }}
    }
};

_.extend(Widgets['react-bootstrap.Button'], {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
});
_.extend(Widgets['react-bootstrap.Label'], {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Panel'], {
    metaData: {
        props: {
            header:"Header",bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Glyphicon'], {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', glyph: 'star'
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Alert'], {
    metaData: {
        props: {
            bsSize: 'medium', bsStyle: 'default', content: 'Type content'
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Well'], {
    metaData: {
        props: {
            bsSize: 'lg', bsStyle: 'default', content: 'Type content', color:undefined
        },
        settings:bootstrapSettings
    }
});

_.extend(Widgets['react-bootstrap.Input'], {
    metaData: {
        props: {
            type: 'text',placeholder:'type your text', label:'label', help:undefined,value:''
        },
        settings:bootstrapSettings
    }
});

_.extend(Panel,{  metaData: {
	props: {
		color: undefined,
		gradient:undefined,
		background:undefined,
		styles:undefined
	},
	settings:{
		fields: {
			styles: {type: 'widgetStyleEditor',settings:{widgets:Widgets}},
		}
	}
}});

export default Widgets;
