'use strict';

var React    = require('react-native'),
    Styles   = require('../styles.js'),
    Config   = require('../env.js'),
    Currency = require('../modules/currency.js'),
    Icons    = require('../modules/icons.js'),
    Timeline = require('./timeline.js'),
    _        = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

function filterTransactions (notes) {
  return _.chain(notes)
    .filter(function (note) {
      return note.type && note.type === 'transaction';
    })
    .map(function (note) {
      note.amount = Currency.parse(note.amount);
      return note;
    })
    .take(4)
    .value();
}

var TIMELINE_WIDTH      = 25,
    TIMELINE_MARGIN     = 10,
    AMOUNT_ROW_HEIGHT   = 40,
    MERCHANT_ROW_HEIGHT = 20,
    ICON_SIZE           = 15;

var AmountRowView = React.createClass({
  render: function() {
    var tx = this.props.transaction;

    return (
      <View style={styles.row.amount}>
	<Text style={styles.view.amount}>{Currency.format(tx.amount, 2)}</Text>
	<View style={[styles.view.timeline, {height: AMOUNT_ROW_HEIGHT}]}>
	  <Timeline.Point height      = {AMOUNT_ROW_HEIGHT}
                          width       = {TIMELINE_WIDTH}
                          radius      = {TIMELINE_WIDTH / 2}
                          fillColor   = {'#fff'}
                          strokeColor = {'#fff'}
                          strokeWidth = {2}
	                  style       = {{position: 'absolute'}} />
	  <Image source={Icons.forAccount(tx.account, 'black')} resizeMode={'contain'} style={styles.view.icon} />
	</View>
      </View>
    );
  }
});

var MerchantRowView = React.createClass({
  render: function() {
    var tx = this.props.transaction;

    return (
	<View style={styles.row.merchant}>
	  <Text style={styles.view.merchant}>{tx.merchant}</Text>
          <View style={styles.view.timeline}>
	  <Timeline.Spacer height      = {MERCHANT_ROW_HEIGHT}
                          width       = {TIMELINE_WIDTH}
                          strokeColor = {'#fff'}
                          strokeWidth = {2} />
	  </View>
        </View>
    );
  }
});

//    	  <Image source={Icons.forAccount(tx.account)} style={[styles.timeline.image]}/>


var TransactionView =  React.createClass({
  render: function() {
    var tx = this.props.transaction;
    return (
	<View style={styles.view.container}>
	  <AmountRowView transaction={tx} />
	  <MerchantRowView transaction={tx} />
    	</View>
    );
  }
});

var TransactionList = React.createClass({
  render: function () {
    var transactions = filterTransactions(this.props.notes);
    
    var transactionsViews;
    if (transactions.length > 0) {
      transactionsViews = _.map(transactions, function (transaction, index) {
	return (
	  <TransactionView key={index} transaction={transaction}/>
	);
      });
    } else {
      transactionsViews = (<View></View>);
    }

    return (
	<View style={styles.list.container}>
	  {transactionsViews}
	</View>
    );
  }
});


var styles = {
  row: StyleSheet.create({
    amount: {
      height: AMOUNT_ROW_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center'
    },
    merchant: {
      height: MERCHANT_ROW_HEIGHT,
      flexDirection: 'row',
      alignItems: 'flex-end'
    }
  }),
  view: StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    amount: {
      color: '#fff',
      fontSize: 32
    },
    merchant: {
      color: '#fff',
      fontSize: 18
    },
    icon: {
      height: ICON_SIZE,
      width: ICON_SIZE,
      position: 'absolute',
      left: (TIMELINE_WIDTH - ICON_SIZE) / 2,
      top: (AMOUNT_ROW_HEIGHT - ICON_SIZE) / 2
    },
    timeline: {
      width: TIMELINE_WIDTH,
      marginLeft: TIMELINE_MARGIN
    }
  }),
  list: StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'flex-end'
    }
  })
}


module.exports = {
  TransactionView,
  TransactionList
};
