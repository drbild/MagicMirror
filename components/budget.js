'use strict';

var React     = require('react-native'),
    Styles    = require('../styles.js'),
    Config    = require('../env.js'),
    Currency  = require('../modules/currency.js'),
    DonutView = require('./donut'),
    Icons     = require('../modules/icons.js'),
    _         = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  Image,
} = React;

function filterBudgets (notes) {
  return _.chain(notes)
    .filter(function (note) {
      return note.type === 'budget';
    })
    .map(function (note) {
      note.used = Currency.parse(note.used);
      note.remaining = Currency.parse(note.remaining);
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
    .take(3)
    .value();
}

var BudgetView = React.createClass({
  render: function () {
    var budget = this.props.budget;
    var amount = (budget.remaining / budget.total);
    return (
	<View style={styles.view.container}>
	  <View style={{flexDirection: 'column', height: 102, width: 102}}>
	    <DonutView style={{position: 'absolute', left: 0, right: 0}} amount={amount} fillColor={'#fff'} thickness={14} radius={50} />
	    <Image source={Icons.forCategory(budget.category)} style={styles.view.image} resizeMode={'contain'} />
	  </View>
	  <Text style={styles.view.text}>{Currency.format(budget.remaining, 0)} left</Text>
	</View>
    );
  }
});

var BudgetList = React.createClass({
  render: function () {
    var budgets = filterBudgets(this.props.notes);

    var budgetsViews;
    if (budgets.length > 0) {
      budgetsViews = _.map(budgets, function (budget, index) {
        return (
	  <BudgetView key={index} budget={budget}/>
        );
      });
    } else {
      budgetsViews = (<View></View>);
    }

    return (
	<View style={styles.list.container}>
	  {budgetsViews}	
	</View>
    );
  }
});


var styles = {
  view: StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    image: {
      height: 32,
      width: 32,
      position: 'absolute',
      left: 35,
      top: 35
    },
    text: {
      color: '#fff',
      fontSize: 30
    }
  }),
  list: StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'stretch'
    }
  })
};


module.exports = {
  BudgetView,
  BudgetList
};
