'use strict';

var React = require('react-native'),
    Config = require('../env.js'),
    Styles = require('../styles'),
    SetIntervalMixin = require('../mixins/set_interval_mixin');
var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

function fetchWeatherReport () {
  var requestEndpoint = 'https://api.forecast.io/forecast/' + Config.forecastio.access_token + '/';
  requestEndpoint += '43.918364,-78.683535';
  return fetch(requestEndpoint).then(function (response) {
    return response.json();
  });
}

var WeatherView = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function () {
    return {weather: null};
  },
  updateWeather: function () {
    fetchWeatherReport().then(function (weather) {
      var report = {
        now: {
          summary: weather.currently.summary,
          icon: weather.currently.icon.replace(/-/g, '_'),
          temperature: {
            f: parseInt(weather.currently.temperature),
            c: parseInt((weather.currently.temperature - 32) * (5/9))
          }
        },
        today: {
          // removed, may bring back later
        }
      }
      this.setState({weather: report});
    }.bind(this));
  },
  componentDidMount: function () {
    this.setInterval(this.updateWeather, 1000 * 60 * 15); // 15 minute updates
    this.updateWeather();
  },
  render: function () {
    var weather = this.state.weather,
        icon;
    if (weather) {
      if (weather.now.icon) {
        icon = (
          <Image source={require('image!clear_day')} style={styles.icon} />
        );
      }
      return (
        <View style={styles.root}>
          <View style={styles.row}>
            {icon}
            <View style={styles.temperature}>
              <Text style={styles.weather}>{weather.now.temperature.f}</Text>
              <Text style={styles.superscript}>o</Text>
              <Text style={styles.weather}>F ({weather.now.temperature.c}</Text>
              <Text style={styles.superscript}>o</Text>
              <Text style={styles.weather}>C)</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }
});

var styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  icon: {
    width: 70,
    height: 70
  },
  temperature: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  weather: {
    fontSize: Styles.fontSize.large - 0,
    color: '#fff'
  },
  superscript: {
    fontSize: Styles.fontSize.normal,
    color: '#fff'
  }
});

module.exports = WeatherView;
