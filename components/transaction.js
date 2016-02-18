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

var VerticalLine = React.createClass({
  render: function() {
    return (
	<View style={[styles.line.container, this.props.style]}>
	  <View style={[styles.line.spacer, {borderColor: 'yellow', borderWidth: 1}]} />
	  <View style={[styles.line.spacer, {borderColor: 'red', borderWidth: 1}]} />
	</View>
    )
  }
});

var TimelineSection = React.createClass({
  render: function() {
    return (
	<View style={[this.props.style, styles.timeline.section]}>
	  {this.props.children}
	</View>
    );
  }
});

var TransactionView =  React.createClass({
  render: function() {
    var tx = this.props.transaction;
    return (
	<View style={styles.util.column}>
	  <View style={[styles.util.row, {height: 45, alignItems: 'center'}]}>
	    <Text style={styles.view.amount}>{Currency.format(tx.amount, 2)}</Text>
	    <TimelineSection>
              <VerticalLine style={{position: 'absolute', left:0, right:0, bottom: 0}}/>
	      <View style={{alignSelf: 'stretch', borderColor: '#green', borderWidth: 1, position:'absolute', left: 0, right: 0}}>  
    	        <Image source={transactionIcon(tx)} style={[styles.timeline.image]}/>
	      </View>
            </TimelineSection>
    	  </View>
    	  <View style={[styles.util.row, {height: 25, marginTop: -7}]}>
 	    <Text style={styles.view.merchant}>Merchant merchant</Text>
            <TimelineSection>
              <VerticalLine style={{position: 'absolute', left:0, right:0}}/>
	    </TimelineSection>
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
      borderColor: 'purple',
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'stretch'
    }
  }),
  line: {
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    spacer: {
      flex: 1
    }
  },
  timeline: {
    section: {
      borderColor: 'yellow',
      borderWidth: 1,
      flexDirection: 'row',
      alignSelf: 'stretch',
      width: timelineWidth,
      marginLeft: timelineMarginLeft,
    },
    image: {
      width: timelineWidth,
      height: timelineWidth
    },
    point: { 
      width: timelineWidth,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
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
