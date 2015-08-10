import React from 'react';

export default class ImagePanel extends React.Component{
    render() {
        var style = {};
        //margin
        var size = this.props.margin || {};
        style.marginTop = size.top;
        style.marginRight = size.right;
        style.marginBottom = size.bottom;
        style.marginLeft = size.left;

        //padding
        size = this.props.padding || {};
        style.paddingTop = size.top;
        style.paddingRight = size.right;
        style.paddingBottom = size.bottom;
        style.paddingLeft = size.left;

        //border
        var border = this.props.border || {};
        style.borderWidth = border.width;
        style.borderRadius = border.radius;
        style.borderColor = border.color;
        style.borderStyle = border.style;

        //size
        style.height = this.props.height || 0;
        style.width = this.props.width || 0;

        if (this.props.bgColor !== undefined) style.backgroundColor = this.props.bgColor;

        var pStyle = {};
        var float = this.props.imageAlign === "topRight" || this.props.imageAlign === "bottomRight" ? "right" : "left";
        var bottom = this.props.imageAlign === "bottomLeft" || this.props.imageAlign === "bottomRight" ? true : false;

        var image = this.props.image || {};

        var imgStyle = {float: float, clear: float};
        if (!!!image.width && !!!image.height){
            imgStyle.height = '50%'
        };
        if (!!image.width) imgStyle.width = image.width;
        if (!!image.height) imgStyle.height = image.height;


        //margin
        size = image.margin || {};
        imgStyle.marginTop = size.top;
        imgStyle.marginRight = size.right;
        imgStyle.marginBottom = size.bottom;
        imgStyle.marginLeft = size.left;

        //padding
        size = image.padding || {};
        imgStyle.paddingTop = size.top;
        imgStyle.paddingRight = size.right;
        imgStyle.paddingBottom = size.bottom;
        imgStyle.paddingLeft = size.left;

        //border
        border = image.border || {};
        imgStyle.borderWidth = border.width;
        imgStyle.borderRadius = border.radius;
        imgStyle.borderColor = border.color;
        imgStyle.borderStyle = border.style;


        var spacerStyle = {height: 0};
        if (bottom) {
            spacerStyle = {float: float, width: 0};

            var imgHeight = image.height;
            var boxHeight = this.props.height - (2 * (this.props.border.width || 0));
            if (boxHeight !== undefined) {
                if (imgHeight === undefined) imgHeight = parseInt(image.height / 2,10);

                // equal to the height of the content minus the height of the image and minus some margin.
                spacerStyle.height = (boxHeight - imgHeight) - (image.margin!==undefined?image.margin.bottom || 0 + image.margin.top || 0:0) - ((this.props.padding.top || 0) + (this.props.padding.bottom || 0));
            }
        }
        return (
            <div style={style}>
                <div style={spacerStyle}></div>
                <img src={image.url} style={imgStyle} />
                <div style={pStyle} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </div>)
    }
};
