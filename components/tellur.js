'use strict';

var React = require('react-native');
var Styles = require('../styles.js');
var Config = require('../env.js');
var SetIntervalMixin = require('../mixins/set_interval_mixin.js');

var BalanceView = require('./balance.js');
var BudgetView = require('./budget.js');
var TransactionView = require('./transaction.js');

var _ = require('lodash');
var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

function getPushbulletPushes () {
  return fetch('https://api.pushbullet.com/v2/pushes?limit=100&active=true', {
    headers: {
      'Access-Token': Config.pushbullet.access_token
    }
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    return data.pushes;
  });
}

function isJson (data) {
  try {
    JSON.parse(data);
    return true;
  } catch(e) {
    return false;
  }
}

function getTellurNotes () {
  return getPushbulletPushes().then(function (pushes) {
    return _.chain(pushes)
      .filter(function (push) {
	return push.type === 'note' && push.body && isJson(push.body);
      })
      .map(function (push) {
	return JSON.parse(push.body);
      })
    .filter(function (note) {
      return note.hasOwnProperty('type');
    });
  });
}

var TellurView = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function () {
    return {notes: []};
  },
  componentDidMount: function () {
    this.setInterval(this.refreshNotes, 1000 * 60); // 1 minute updates
    this.refreshNotes();
  },
  refreshNotes: function() {
    getTellurNotes().then(function (notes) {
      this.setState({notes: notes})
    }.bind(this));
  },
  render: function () {
      return (
	<View style={styles.container}>
	  <View style={[styles.row, styles.margin]}>
	    <BalanceView notes={this.state.notes}/>
	  </View>
	  <View style={[styles.row, styles.margin]}>
	    <TransactionView notes={this.state.notes}/>
	  </View>
	  <View style={styles.row}>
            <BudgetView notes={this.state.notes}/>
	  </View>
        </View>
      )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  margin: {
    marginBottom: 30
  },
  image: {
    height: 40,
    width: 40
  },
  title: {
    marginRight: 15,
    color: '#fff',
    fontSize: 36
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'right'
  },
  notes: {
    color: '#fff',
    fontSize: Styles.fontSize.small,
    marginLeft: 10
  }
});

module.exports = TellurView;
