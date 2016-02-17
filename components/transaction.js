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
  number = number.toFixed(2) + '';
  var x = number.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return "$" + x1 + x2;
}

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
	    <View style={styles.column}  key={'transaction_' + index}>
              <View style={styles.row}>
  	        <Text style={styles.amount}>{transaction.amount}</Text>
	        <Image source={require('image!tellur')} style={[styles.image, {marginLeft: 15}]}/>
	      </View>
              <Text style={styles.merchant}>{transaction.merchant}</Text>
            </View>
        );
      });
    } else {
      transactionsViews = (<View></View>);
    }

    return (
	<PanelView title="Txs" align='flex-end'>
	  <View style={styles.container}>
	    {transactionsViews}
          </View>
	</PanelView>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  image: {
    height: 25,
    width: 25
  },
  title: {
    color: '#888',
    fontSize: Styles.fontSize.normal
  },
  amount: {
    color: '#fff',
    fontSize: Styles.fontSize.normal,
  },
  merchant: {
    color: '#fff',
    fontSize: Styles.fontSize.small,
    marginTop: -5,
    marginRight: 40
  }
});

module.exports = TransactionView;
