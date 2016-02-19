"use strict";

var React = require('react-native'),
    _     = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  Image,
  ART
} = React;

var {
  Surface,
  Path,
  Group,
  Transform,
  Shape,
} = ART;

console.log("HW ART " + Object.keys(ART));

var TimelineSpacer = React.createClass({
  render: function() {
    var height      = this.props.height,
        width       = this.props.width,
        strokeColor = this.props.strokeColor,
        strokeWidth = this.props.strokeWidth;
    
    var PATH = ['M', (width / 2), 0, 'L', (width / 2), height].join(' ');

    return (
	<View style={this.props.style}>
	  <Surface height={height} width={width}>
	    <Shape stroke={strokeColor} strokeWidth={strokeWidth} d={PATH} />
          </Surface>
	</View>
    );
  }
});

var TimelinePoint = React.createClass({
  render: function() {
    var height      = this.props.height,
        width       = this.props.width,
        radius      = this.props.radius,
        fillColor   = this.props.fillColor,
        strokeColor = this.props.strokeColor,
        strokeWidth = this.props.strokeWidth;

    var cX = width / 2,
        cY = height / 2;

    var topX = cX,
        topY = cY - radius,
        botX = cX,
        botY = cY + radius;

    var PATH_LINE   = ['M', (width / 2), 0, 'L', (width / 2), height].join(' '),
        PATH_POINT  = ['M', topX, topY, 'A', radius, radius, 0, 1, 0, botX, botY, 'A', radius, radius, 0, 1, 0, topX, topY].join(' ');

    return (
	<View style={this.props.style}>
	  <Surface height={height} width={width}>
	    <Shape stroke={strokeColor} strokeWidth={strokeWidth} d={PATH_LINE} />
	    <Shape fill={fillColor} d={PATH_POINT} />
          </Surface>
	</View>
    );
  }
});

module.exports = {
  Spacer: TimelineSpacer,
  Point: TimelinePoint
};
