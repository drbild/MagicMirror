'use strict';

var React = require('react-native'),
    moment = require('moment'),
    Styles = require('../styles.js'),
    SetIntervalMixin = require('../mixins/set_interval_mixin.js');
var {
  StyleSheet,
  View,
  Text
} = React;

var DateView = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function () {
    return {date: moment()};
  },
  componentDidMount: function () {
    this.setInterval(this.tick, 1000 * 60); // 1 minute
  },
  tick: function () {
    this.setState({date: moment()});
  },
  render: function () {
    var date = this.state.date.format('dddd [the] Do');
    return (
      <View style={styles.row}>
        <Text style={styles.date}>{date}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  date: {
    fontSize: Styles.fontSize.normal,
    color: '#fff'
  }
});

module.exports = DateView;
