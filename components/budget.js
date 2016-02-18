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
  Image,
  ART,
} = React;

var {
  Surface,
  Path,
  Group,
  Transform,
  Shape
} = ART;

console.log("HW ART " + Object.keys(ART));

var BudgetIcons = {
  entertainment: require('image!tellur'),
  food: require('image!tellur'),
  generic: require('image!tellur'),
  personal: require('image!tellur')
};

function budgetIcon (budget) {
  if (budget.category === 'entertainment') {
    return BudgetIcons.entertainment;
  } else if (budget.category === 'food') {
    return BudgetIcons.food;
  } else if (budget.category === 'personal') {
    return BudgetIcons.personal;
  } else {
    return BudgetIcons.generic;
  }
}

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

var DONUT = "M50,0 A50,50,0,1,1,0,50 L15,50 A35,35,0,1,0,50,15 L50,0";

var CircleView = React.createClass({
  render: function() {
    return (
      <View style={this.props.style}>
	<Surface width={100} height={100}>
	  <Group>
	    <Shape fill="white" d={DONUT} />
          </Group>
        </Surface>
      </View>
    );
  }
});

//	    <Image source={budgetIcon(budget)} style={styles.view.image}/>

var BudgetView = React.createClass({
  render: function () {
    var budget = this.props.budget;
    return (
	<View style={styles.view.container}>
	  <View style={{borderColor: 'purple', borderWidth: 1, height: 100, alignItems: 'center', justifyContent: 'center'}}>
	    <CircleView />
	  </View>
	  <Text style={styles.view.text}>{Currency.format(budget.remaining, 0)} left</Text>
	</View>
    );
  }
});

var BudgetList = React.createClass({
  render: function () {
    var budgets = filterBudgets(this.props.notes);
    console.log("HW budgets " + budgets);
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
      borderColor: 'yellow',
      borderWidth: 1,
      flexDirection: 'column',
      alignItems: 'center'
    },
    image: {
      height: 35,
      width: 35
    },
    text: {
      color: '#fff',
      fontSize: 30
    }
  }),
  list: StyleSheet.create({
    container: {
      borderColor: 'red',
      borderWidth: 1,
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
