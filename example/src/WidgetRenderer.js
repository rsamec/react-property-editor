import React from 'react';
import _ from 'lodash';

export default class WidgetRenderer{
    applyBinding(box,dataBinder){
        for (var propName in box){
            var prop = box[propName];

            if (_.isObject(prop) && !!prop.Path && prop.Mode !== 'TwoWay'){
                //one-way binding
                box[propName] = dataBinder.value[prop.Path];
            }
        }
    }
    render(){
        var value = _.cloneDeep(this.props.value);
        this.applyBinding(value,this.props.dataBinder);

        var widget = this.props.widget;
        var component = React.createElement(widget,value,value.content !== undefined ? React.DOM.span(null, value.content) : null);
        return (<div>{component}</div>)
    }
}