import React from 'react';

export default class TruncateString extends React.Component
{
    render() {
        const n = 25;
        var s = this.props.value;
        var truncated = s.length > n ? s.substr(0, n - 1) + "..." : s;
        return (<span>{truncated}</span>);
    }
};
