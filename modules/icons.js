"use strict";

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

function iconForCategory (name) {
  if (name === 'entertainment') {
    return CategoryIcons.entertainment;
  } else if (name === 'food') {
    return CategoryIcons.food;
  } else if (name === 'shopping' | name === 'clothing') {
    return CategoryIcons.shopping;
  } else {
    return CategoryIcons.generic;
  }
}

module.exports = {
  forAccount: iconForAccount,
  forCategory: iconForCategory
};
