'use strict';

var React    = require('react-native'),
    Styles   = require('../styles.js'),
    Config   = require('../env.js'),
    Currency = require('../modules/currency.js'),
    _        = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

var TransactionIcons = {
  checking: require('image!tellur'),
  credit: require('image!tellur'),
  savings: require('image!tellur'),
  investment: require('image!tellur'),
  general: require('image!tellur')
};

function transactionIcon (tx) {
  if (tx.account === 'My Checking') {
    return TransactionIcons.checking;
  } else if (tx.account === 'My Credit Card') {
    return TransactionIcons.credit;
  } else if (tx.account === 'My Savings') {
    return TransactionIcons.savings;
  } else if (tx.account === 'My Brokerage') {
    return TransactionIcons.invesment;
  } else {
    return TransactionIcons.general;
  }
}

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

var TimelinePoint = React.createClass({
  render: function() {
    var image = this.props.image;
    var style = this.props.style;
    return (
	<View style={style}> 
    	  <Image source={image} style={styles.timeline.image}/>
	</View>
    );
  }
});  

var TransactionView =  React.createClass({
  render: function() {
    var tx = this.props.transaction;
    return (
	<View style={styles.util.column}>
	  <View style={[styles.util.row, {alignItems: 'center', paddingTop: 8}]}>
	    <View style={{alignItems: 'stretch'}}>
	      <Text style={styles.view.amount}>{Currency.format(tx.amount, 2)}</Text>
	    </View>
	    <TimelinePoint image={transactionIcon(tx)} style={styles.timeline.point}/>
    	  </View>
    	  <View style={styles.util.row}>
    	    <Text style={styles.view.merchant}>Merchant merchant</Text>
	    <View style={styles.timeline.space}/>
    	  </View>
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


var timelineWidth = 20;
var timelineMarginLeft = 10;

var styles = {
  util: StyleSheet.create({
    column: {
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }
  }),
  timeline: {
    image: {
      width: timelineWidth,
      height: timelineWidth
    },
    point: { 
      width: timelineWidth,
      marginLeft: timelineMarginLeft
    },
    space: {
      width: timelineWidth,
      marginLeft: timelineMarginLeft
    }
  },
  view: StyleSheet.create({  
    amount: {
      color: '#fff',
      fontSize: 32
    },
    merchant: {
      color: '#fff',
      fontSize: 18
    }
  }),
  list: StyleSheet.create({
    container: {
      flexDirection: 'column'
    }
  })
}


module.exports = {
  TransactionView,
  TransactionList
};
