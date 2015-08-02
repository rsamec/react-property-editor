import React from 'react';
//import {Button,OverlayTrigger,Popover} from 'react-bootstrap';

export default class TruncateString extends React.Component
{
    render() {
        var n = this.props.length || 20;
        var s = this.props.value;
        if (s === undefined) return (<span></span>);

        if (!(typeof s === 'string' || s instanceof String)){
            s = JSON.stringify(s);
        }

        var truncated = s.length > n;
        var text =  truncated? s.substr(0, n - 1):s;

        //var text,component;
        //if (typeof s === 'string' || s instanceof String){
        //    component = {s};
        //    text =  truncated? s.substr(0, n - 1):s;
        //}
        //else{
        //
        //    component = <pre>{JSON.stringify(s,null,2)}</pre>;
        //    text = truncated?JSON.stringify(s).substr(0,n-1):JSON.stringify(s);
        //}
        if (truncated) return (<span>{text}...</span>);
        return (<span>{text}</span>);

        //return (<OverlayTrigger trigger='hover' placement='left' overlay={<Popover title='Popover left'>{component}</Popover>}>
        //    <Button bsStyle='link'>{text}...</Button>
        //</OverlayTrigger>)

    }
};
