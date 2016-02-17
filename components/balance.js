'use strict';

var React = require('react-native');
var Styles = require('../styles.js');
var Config = require('../env.js');
var _ = require('lodash');
var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

var BalanceView = React.createClass({
  getBalances: function () {
    return _.chain(this.props.notes)
      .filter(function (note) {
	return note.type === 'balance';
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
      .value();
  },
  render: function () {
    var balances = this.getBalances(),
      balancesViews;
    if (balances.length > 0) {
      balancesViews = _.map(balances, function (balance, index) {
        return (
          <View style={styles.row} key={'balance_' + index}>
            <Text style={styles.balance}>{balance.account}: </Text>
            <Text style={styles.balance}>{balance.balance}</Text>
          </View>
        );
      });
    } else {
      balancesViews = (<View></View>);
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Account Balances</Text>
          <Image source={require('image!tellur')} style={styles.image} />
        </View>
        {balancesViews}
      </View>
    );
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
  image: {
    height: 40,
    width: 40
  },
  title: {
    marginRight: 15,
    color: '#fff',
    fontSize: Styles.fontSize.medium
  },
  text: {
    color: '#fff',
    fontSize: Styles.fontSize.normal,
    textAlign: 'right'
  },
  balance: {
    color: '#fff',
    fontSize: Styles.fontSize.normal,
    marginLeft: 10
  }
});

module.exports = BalanceView;
