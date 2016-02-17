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

function parseCurrency (string) {
  return Number(string.replace(/[^0-9\.]+/g,""));
}

function formatCurrency(number) {
  return '$' + number.toFixed(2);
}

var BudgetView = React.createClass({
  getBudgets: function () {
    return _.chain(this.props.notes)
      .filter(function (note) {
	return note.type === 'budget';
      })
      .map(function (note) {
	note.used = parseCurrency(note.used);
	note.remaining = parseCurrency(note.remaining);
	note.total = note.used + note.remaining;
	return note;
      })
      .groupBy(function (note) {
	return note.category;
      })
      .pairs()
      .map(function (pair) {
	var notes = pair[1];
	return _.head(notes);
      })
      .sortBy('category')
      .value();
  },
  render: function () {
    var budgets = this.getBudgets(),
      budgetsViews;
    if (budgets.length > 0) {
      budgetsViews = _.map(budgets, function (budget, index) {
        return (
          <View style={styles.row} key={'budget_' + index}>
            <Text style={styles.text}>[{budget.category}] {formatCurrency(budget.remaining)} of {formatCurrency(budget.total)} remaining</Text>
          </View>
        );
      });
    } else {
      budgetsViews = (<View></View>);
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Budget</Text>
          <Image source={require('image!tellur')} style={styles.image} />
        </View>
        {budgetsViews}
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

module.exports = BudgetView;
