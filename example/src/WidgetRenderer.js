import React from 'react';
import _ from 'lodash';
import Binder from 'react-binding';

var WidgetRenderer = React.createClass({
    bindProps(node,dataBinder){
		
		var props = _.cloneDeep(node.props);
        //go through all properties
        for (var propName in props) {
            var prop = props[propName];

			var bindingProps =  node.binding[propName];
				
            //if binding -> replace binding props
            if (bindingProps !== undefined) {

                if (!!bindingProps.path) {
                    //apply binding
                    var converter;
                    if (!!bindingProps.converter && !!bindingProps.converter.compiled) {
                        converter = eval(bindingProps.converter.compiled);
                    }
                    var binding = Binder.bindTo(dataBinder, bindingProps.path, converter);

                    if (bindingProps.mode === 'TwoWay') {
                        //two-way binding
                        props.valueLink = Binder.bindTo(dataBinder, bindingProps.path, converter);
                        props[propName] = null;
                    }
                    else {
                        //one-way binding
                        //box[propName] = dataBinder.value[prop.Path];
                        props[propName] = binding.value;
                    }
                }
                else {
                    //binding is not correctly set - do not apply binding
                    props[propName] = undefined;
                }
            }
        }
		return props;
    },
    render(){
        var box = this.props.node;
        var widget  = this.props.widget;
        if (widget === undefined) {
            return React.DOM.span(null, 'Component ' + box.elementName + ' is not register among widgets.');
        }
		
		//apply binding
		var props =(this.props.dataBinder !== undefined) ? this.bindProps(box,this.props.dataBinder):box.props;
        
		
        //apply property resolution strategy -> default style -> custom style -> local style
		var customStyle= this.props.customStyle;
		var widgetStyle = _.cloneDeep(widget.metaData.props || {});
        if (customStyle !== undefined) widgetStyle = _.merge(widgetStyle,customStyle);
        props = _.merge(widgetStyle,props);
		
		//TODO: consider using 
        

        return  React.createElement(widget,props,props.content !== undefined ? React.DOM.div({ dangerouslySetInnerHTML: {__html: props.content } }) : null);
    }
});
export default  WidgetRenderer;
//WidgetRenderer.propTypes = { widget:  React.PropTypes.node, value:React.PropTypes.object,dataBinder:React.PropTypes.object };
