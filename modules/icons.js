"use strict";

var Config = require('../env.js'),
    _      = require('lodash')

var AccountIcons = {
  checking: {
    white: require('image!checkbook'),
    black: require('image!checkbook_black')
  },
  credit: {
    white: require('image!credit_card'),
    black: require('image!credit_card_black')
  },
  investment: {
    white: require('image!line_chart'),
    black: require('image!line_chart_black')
  },
  savings: {
    white: require('image!savings'),
    black: require('image!savings_black')
  },
  general: {
    white: require('image!savings'),
    black: require('image!savings_black')
  }
};

var CategoryIcons = {
  entertainment: require('image!ticket'),
  food: require('image!cutlery'),
  shopping: require('image!shopping_basket'),
  generic: require('image!tellur'),
};

function iconForAccount (name, color = 'white') {
  var accounts = Config.accounts;

  if (_.includes(accounts.checking, name)) {
    return AccountIcons.checking[color];
  } else if (_.includes(accounts.credit, name)) {
    return AccountIcons.credit[color];
  } else if (_.includes(accounts.investment, name)) {
    return AccountIcons.investment[color];
  } else if (_.includes(accounts.savings, name)) {
    return AccountIcons.savings[color];
  } else {
    return AccountIcons.general[color];
  }
}

function iconForCategory (name) {
  var categories = Config.categories;

  if (_.includes(categories.entertainment, name)) {
    return CategoryIcons.entertainment;
  } else if (_.includes(categories.food, name)) {
    return CategoryIcons.food;
  } else if (_.includes(categories.shopping, name)) {
    return CategoryIcons.shopping;
  } else {
    return CategoryIcons.generic;
  }
}

module.exports = {
  forAccount: iconForAccount,
  forCategory: iconForCategory
};
