'use strict';

var React = require('react-native'),
        _ = require('lodash');

var {
  Children,
  StyleSheet,
  View
} = React;

var RowView = React.createClass({
  render: function () {
    return (
	<View style={styles.container}>
	  {this.props.children}
	</View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
});

module.exports = RowView;
