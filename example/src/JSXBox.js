var React = require('react');


export default class JSXBox extends React.Component {
    shouldComponentUpdate() {
        return true;
    }
    render(){
        //empty content
        if (this.props.content === undefined || this.props.content.compiled === undefined) return (React.createElement('span',{}, 'type your code'));

        try {
            var props = this.props;
            var self = this;
            return (React.createElement('div',{}, eval(this.props.content.compiled)));
        }
        catch (err) {
            //error content
            return (React.createElement('span',{}, err.message));
        }
    }
}