import React from 'react';
import _ from 'lodash';
import BindToMixin from 'react-binding';

var WidgetRenderer = React.createClass({
    mixins:[BindToMixin],
    applyBinding(widget,box,dataBinder){
        //go through all properties
        for (var propName in box){
            var prop = box[propName];


            //TODO: find better way how to detect binding
            var field = widget.metaData && widget.metaData.settings && widget.metaData.settings.fields[propName];
            var isBinding = field!== undefined && field.type === 'bindingEditor';

            //if binding -> replace binding props
            if (isBinding){
                if (prop.checked) {
                    var bindingProp = prop;

                    //one-way binding
                    var converter;
                    if (!!bindingProp.Converter && !!bindingProp.Converter.compiled) {
                        converter = eval(bindingProp.Converter.compiled);
                    };

                    var binding = this.bindTo(dataBinder, bindingProp.Path, converter);

                    if (!!!bindingProp.Path)
                    {
                        box[propName] = undefined;
                    }
                    else {
                        if (bindingProp.Mode === 'TwoWay') {
                            //box.valueLink = this.bindTo(dataBinder, prop.Path,converter);
                            box[propName] = undefined;
                        }
                        else {
                            //box[propName] = dataBinder.value[prop.Path];
                            box[propName] = binding.value;
                        }
                    }
                }
                else{
                    box[propName] = prop.value;
                }
            }

        }
    },
    render(){
        var box = this.props.node;
        var widget  = this.props.widget;
        if (widget === undefined) {
            return React.DOM.span(null, 'Component ' + box.elementName + ' is not register among widgets.');
        }

        var props = _.merge(_.cloneDeep(widget.metaData.props),box);
        if (this.props.dataBinder !== undefined)  this.applyBinding(widget,props,this.props.dataBinder);

        return  React.createElement(widget,props,props.content !== undefined ? React.DOM.div({ dangerouslySetInnerHTML: {__html: props.content } }) : null);
    }
});
export default  WidgetRenderer;
//WidgetRenderer.propTypes = { widget:  React.PropTypes.node, value:React.PropTypes.object,dataBinder:React.PropTypes.object };
