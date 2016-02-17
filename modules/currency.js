'use strict';

function parseCurrency (string) {
  return Number(string.replace(/[^0-9\.]+/g,""));
}

function formatCurrency (number, precision = 2) {
  number = number.toFixed(precision) + '';
  var x = number.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return "$" + x1 + x2;
}

module.exports = {
  parse: parseCurrency,
  format: formatCurrency
};
