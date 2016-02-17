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

function getTransactions () {
  return getPushbulletPushes().then(function (pushes) {
    return _.chain(pushes)
  });
}

var TransactionView = React.createClass({
  getTransactions: function () {
    return _.chain(this.props.notes)
      .filter(function (note) {
	return note.type && note.type === 'transaction';
      })
      .take(5)
      .value();
  },
  render: function () {
    var transactions = this.getTransactions(),
      transactionsViews;
    if (transactions.length > 0) {
      transactionsViews = _.map(transactions, function (transaction, index) {
        return (
          <View style={styles.row} key={'transaction_' + index}>
            <Text style={styles.text}>[{transaction.account}] {transaction.amount} from {transaction.merchant}</Text>
          </View>
        );
      });
    } else {
      transactionsViews = (<View></View>);
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Latest Transactions</Text>
          <Image source={require('image!tellur')} style={styles.image} />
        </View>
        {transactionsViews}
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

module.exports = TransactionView;
