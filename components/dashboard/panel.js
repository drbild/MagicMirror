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
    return (
	<View style={styles.container}>
	  <Text style={styles.title}>{title}</Text>
	  {this.props.children}
	</View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    color: '#999',
    fontSize: 28
  }
});

module.exports = PanelView;
