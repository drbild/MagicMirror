'use strict';

var React = require('react-native');
var Styles = require('../styles.js');
var Config = require('../env.js');
var PanelView = require('./dashboard/panel.js');
var _ = require('lodash');
var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

function parseCurrency (string) {
  return Number(string.replace(/[^0-9\.]+/g,""));
}

function formatCurrency(number) {
  number = number.toFixed(0) + '';
  var x = number.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return "$" + x1 + x2;
}

var BalanceView = React.createClass({
  getBalances: function () {
    return _.chain(this.props.notes)
      .filter(function (note) {
	return note.type === 'balance';
      })
      .map(function (note) {
	note.balance = parseCurrency(note.balance);
	return note;
      })
      .groupBy(function (note) {
	return note.account;
      })
      .pairs()
      .map(function (pair) {
	var notes = pair[1]
	return _.head(notes);
      })
      .sortBy('account')
      .take(3)
      .value();
  },
  render: function () {
    var balances = this.getBalances(),
      balancesViews;
    if (balances.length > 0) {
      balancesViews = _.map(balances, function (balance, index) {
        return (
          <View style={styles.row} key={'balance_' + index}>
	    <Image source={require('image!tellur')} style={styles.image}/>
            <Text style={styles.balance}> {formatCurrency(balance.balance)}</Text>
          </View>
        );
      });
    } else {
      balancesViews = (<View></View>);
    }

    return (
	<PanelView title="Balances">
	  <View style={styles.container}>
            {balancesViews}
          </View>
	</PanelView>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    height: 40,
    width: 40
  },
  balance: {
    color: '#fff',
    fontSize: Styles.fontSize.large
  }
});

module.exports = BalanceView;
