/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} = React;

var Styles = require('./styles.js');


var WINDOW_WIDTH = Dimensions.get('window').width;

var DateView = require('./components/date'),
    TimeView = require('./components/time'),
    WeatherView = require('./components/weather'),
    StockView = require('./components/stock'),
    TellurView = require('./components/tellur'),
    QuoteView = require('./components/quote'),
    RowView = require('./components/dashboard/row');

var MagicMirror = React.createClass({
  render: function() {
    var stocks = ['FB', 'TWTR', 'AAPL', 'GOOGL', 'MSFT', 'TSLA']

    var InfoBar = (
        <View style={styles.infobar}>
          <View style={[styles.column]}>
            <WeatherView></WeatherView>
          </View>
          <View style={styles.column}>
            <View style={styles.row}>
              <DateView></DateView>
            </View>
            <View style={[styles.row, {marginTop: -15}]}>
              <TimeView></TimeView>
            </View>
          </View>
        </View>
    );

    var TellurHeader = (
	<View style={styles.tellurheader}>
          <Text style={styles.h1}>Banking Alerts</Text>
          <Text style={[styles.h2, {marginTop: -15}]}> by TELLUR</Text>
	</View>
    );

    return (
      <View style={styles.container}>
        {InfoBar}
	{TellurHeader}
        <View style={[styles.row, styles.margin]}>
           <TellurView />
        </View>
        <View style={styles.stocks}>
	  <QuoteView />
        </View>
      </View>
    );
  }
});

//          <StockView style={{width: '100%'}} symbols={stocks}></StockView>

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  infobar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  tellurheader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  h1: {
    color: '#fff',
    fontFamily: 'sans-serif-condensed',
    fontSize: Styles.fontSize.large,
    fontWeight: 'bold'
  },
  h2: {
    color: '#fff',
    fontFamily: 'sans-serif-condensed',
    fontSize: Styles.fontSize.medium,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 0
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 0
  },
  margin: {
    marginBottom: 30
  },
  stocks: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});

AppRegistry.registerComponent('MagicMirror', () => MagicMirror);
