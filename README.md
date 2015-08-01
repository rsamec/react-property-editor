React property editor
=======================

It is based on [react-json](https://github.com/arqex/react-json) and offers some predefined editors.

+   html editor - [react-tinymce](https://github.com/mzabriskie/react-tinymce)
+   code editor - [react-code-mirror](https://github.com/ForbesLindesay/react-code-mirror)
+   color picker - [react-color-picker](https://github.com/zippyui/react-color-picker)
+   binding editor - [react-binding](https://github.com/rsamec/react-binding)


## Demo & Examples

[Live demo](http://rsamec.github.io/react-property-editor/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use this component is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-pathjs-chart.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-pathjs-chart --save
```


## Usage

```
import PropertyEditor from 'react-property-editor';

var App = React.createClass({
    getInitialState(){
        return {
            value: {
                name: "amigo",
                color: '',
                html: '',
                code: '',
                chart: {
                    showLines: true,
                    axisX: {
                        showLines: true
                    },
                },
                array: [1, 2, 3]
            }
        }
    },
    logChange(value){
        console.log(value);
        this.setState({value:value});
        console.log(this.state.value);

    },
    render() {
        return (<div>
            <PropertyEditor value={ this.state.value }  onChange={ this.logChange } />
        </div>)
    }
});
```

### Properties

+   value - value object - map the structure of your property grid to your object.
+   onChange(value) - when any property is changed the changed value object is passed as parameter

### Notes



### License

MIT. Copyright (c) 2015 Roman Samec

