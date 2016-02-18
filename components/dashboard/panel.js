'use strict';

var React = require('react-native'),
        _ = require('lodash');

var {
  Children,
  StyleSheet,
  View,
  Text,
  Image
} = React;

var PanelView = React.createClass({
  render: function () {
    var title = this.props.title;
    var align = this.props.align;

    return (
	<View style={[styles.container, {alignItems: align}]}>
	  <Text style={styles.title}>{title}</Text>
	  {this.props.children}
	</View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#fff233',
    borderWidth: 1,
    flexDirection: 'column'
  },
  title: {
    color: '#999',
    fontSize: 28
  }
});

module.exports = PanelView;
