'use strict';

var React = require('react-native');
var moment = require('moment');
var Styles = require('../styles.js');
var SetIntervalMixin = require('../mixins/set_interval_mixin.js');
var {
  StyleSheet,
  View,
  Text
} = React;

var TimeView = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function () {
    return {time: moment()};
  },
  componentDidMount: function () {
    this.setInterval(this.tick, 1000); // 1 second updates
  },
  tick: function () {
    this.setState({time: moment()});
  },
  render: function () {
    var time = this.state.time.format('h:mm a');
    return (
      <Text style={styles.time}>{time}</Text>
    );
  }
});

var styles = StyleSheet.create({
  time: {
    fontSize: Styles.fontSize.large,
    color: '#fff'
  }
});

module.exports = TimeView;
