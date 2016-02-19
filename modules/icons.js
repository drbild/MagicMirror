"use strict";

var Config = require('../env.js'),
    _      = require('lodash')

var AccountIcons = {
  checking: require('image!checkbook'),
  credit: require('image!credit_card'),
  investment: require('image!line_chart'),
  savings: require('image!savings'),
  general: require('image!savings')
};

var CategoryIcons = {
  entertainment: require('image!ticket'),
  food: require('image!cutlery'),
  shopping: require('image!shopping_basket'),
  generic: require('image!tellur'),
};

function iconForAccount (name) {
  var accounts = Config.accounts;

  if (_.includes(accounts.checking, name)) {
    return AccountIcons.checking;
  } else if (_.includes(accounts.credit, name)) {
    return AccountIcons.credit;
  } else if (_.includes(accounts.investment, name)) {
    return AccountIcons.investment;
  } else if (_.includes(accounts.savings, name)) {
    return AccountIcons.savings;
  } else {
    return AccountIcons.general;
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
