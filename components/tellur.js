'use strict';

var React = require('react-native');
var Styles = require('../styles.js');
var Config = require('../env.js');
var SetIntervalMixin = require('../mixins/set_interval_mixin.js');
var PanelView = require('./dashboard/panel.js');
var RowView = require('./dashboard/row.js');

var Balance = require('./balance.js');
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

var BalanceList = Balance.BalanceList;

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
	  <RowView>
	    <PanelView title="Balances" align='flex-start'>
	      <BalanceList notes={this.state.notes} />
	    </PanelView>
            <TransactionView notes={this.state.notes} />
          </RowView>
	  <RowView>
            <BudgetView notes={this.state.notes}/>
	  </RowView>
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
    justifyContent: 'space-between'
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  margin: {
    marginBottom: 30
  },
  image: {
    height: 40,
    width: 40
  },
  title: {
    color: '#888',
    fontSize: 28
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
