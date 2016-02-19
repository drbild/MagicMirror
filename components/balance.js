'use strict';

var React = require('react-native'),
    Styles = require('../styles.js'),
    Config = require('../env.js'),
    Currency = require('../modules/currency.js'),
    _ = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

var AccountIcons = {
  checking: require('image!checkbook'),
  credit: require('image!credit_card'),
  investment: require('image!line_chart'),
  savings: require('image!savings'),
  general: require('image!savings')
};

function accountIcon (balance) {
  var name = balance.account;
  if (name === "My Checking") {
    return AccountIcons.checking;
  } else if (name === "My Savings") {
    return AccountIcons.savings;
  } else if (name === "My Credit Card") {
    return AccountIcons.credit;
  } else if (name === "My Retirement") {
    return AccountIcons.investment;
  } else {
    return AccountIcons.general;
  }
}

function filterBalances (notes) {
  return _.chain(notes)
    .filter(function (note) {
      return note.type === 'balance';
    })
    .map(function (note) {
      note.balance = Currency.parse(note.balance);
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
}

var BalanceView = React.createClass({
  render: function () {
    var balance = this.props.balance;
    return (
	<View style={styles.view.container}>
	  <Image source={accountIcon(balance)} style={styles.view.image} resizeMode={'contain'} />
	  <Text style={styles.view.text}>{Currency.format(balance.balance, 0)}</Text>
	</View>
    );
  }
});

var BalanceList = React.createClass({
  render: function () {
    var balances = filterBalances(this.props.notes);

    var balancesViews;
    if (balances.length > 0) {
      balancesViews = _.map(balances, function (balance, index) {
        return (
       	    <BalanceView key={index} balance={balance}/>
        );
      });
    } else {
      balancesViews = (<View></View>);
    }

    return (
	  <View style={styles.list.container}>
            {balancesViews}
          </View>
    );
  }
});

var styles = {
  view: StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    text: {
      color: '#fff',
      fontSize: 64
    },
    image: {
      width: 50,
      marginRight: 12
    }
  }),
  list: StyleSheet.create({
    container: {
      flexDirection: 'column'
    }
  })
};

module.exports = {
  BalanceView,
  BalanceList
}
