import React from 'react';
//import {Button,OverlayTrigger,Popover} from 'react-bootstrap';

export default class EmptyValue extends React.Component
{
    render() {
        var noValueComp = <a onClick={this.props.open} className='jsonNovalue'>No value</a>;
        if (this.props.value === undefined) return noValueComp;
        return (<div>
            <a onClick={this.props.open}>{this.props.children}</a>
        </div>);
    }
};
