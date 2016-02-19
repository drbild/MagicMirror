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

function c(x, y) {
  return {'x':x, 'y':y};
}

function p(r, t) {
  return {'r':r, 't':t};
}

function p2c(v) {
  var r = v.r,
      t = v.t,
      x = r * Math.cos(t),
      y = r * Math.sin(t);
  return c(x, y)
}

function d2r(d) {
  return d * (Math.PI / 180);
}

function subT(v, t) {
  return p(v.r, v.t - t);
}

var DonutView = React.createClass({
  render: function() {
    var amount    = this.props.amount,
        fillColor = this.props.fillColor,
        thickness = this.props.thickness,
        radius    = this.props.radius;

    var angle     = amount * d2r(360);
    var largeA = (angle > Math.PI) ? 1 : 0;

    var ro = radius,
        ri = radius - thickness,
        sop = p(ro, d2r(90)),
        sip = p(ri, d2r(90)),
        fop = subT(sop, angle),
        fip = subT(sip, angle),
        soc = p2c(sop),
        sic = p2c(sip),
        foc = p2c(fop),
        fic = p2c(fip)

    function tx(a) {
      return a + radius + 1;
    }

    function ty(a) {
      return (-a) + radius + 1;
    }

    var M  = ['M', tx(soc.x), ty(soc.y)],
        A0 = ['A', ro, ro, 0, largeA, 1, tx(foc.x), ty(foc.y)], 
        L1 = ['L', tx(fic.x), ty(fic.y)],
        A1 = ['A', ri, ri, 0, largeA, 0, tx(sic.x), ty(sic.y)],
        L2 = ['L', tx(soc.x), ty(soc.y)]

    var PATH = _(_.flatten([M, A0, L1, A1, L2])).join(" ");

    return (
      <View style={this.props.style}>
	<Surface width={2 * radius + 2} height={2 * radius + 2}>
	  <Shape fill={fillColor} d={PATH} />
        </Surface>
      </View>
    );
  }
});


module.exports = DonutView;
