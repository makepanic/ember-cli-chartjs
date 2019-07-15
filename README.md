Ember Chartjs
==============================================================================

[![Build Status](https://travis-ci.org/makepanic/ember-cli-chartjs.svg?branch=master)](https://travis-ci.org/makepanic/ember-cli-chartjs)

This Ember CLI addon is a simple wrapper for [ChartJS](http://www.chartjs.org/).

It's a fork of [busy-web/ember-cli-chartjs](https://github.com/busy-web/ember-cli-chartjs) which removes most of the custom features (predefined styles, options) and ports it to typescript.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above

**Note**: you might need [ember-native-class-polyfill](https://github.com/pzuraq/ember-native-class-polyfill) if you're on ember-source < 3.6

Installation
------------------------------------------------------------------------------

```
ember install @makepanic/ember-cli-chartjs
```

Usage
------------------------------------------------------------------------------

In your handlebars template just do:

```
{{ember-chart type=CHARTTYPE data=CHARTDATA options=CHARTOPTIONS width=CHARTWIDTH height=CHARTHEIGHT}}
```

* CHARTTYPE: String; one of the following -- `line`, `bar`, `radar`, `polarArea`, `pie` or `doughnut`.
* CHARTDATA: Array; refer to the ChartJS documentation
* CHARTOPTIONS: Object; refer to the ChartJS documentation. This is optional.
* CHARTWIDTH: Number; pixel width of the canvas element. Only applies if the chart is NOT responsive.
* CHARTHEIGHT: Number; pixel height of the canvas element. Only applies if the chart is NOT responsive.

Example
------------------------------------------------------------------------------

```
{{ember-chart type='Pie' data=model.chartData width=200 height=200}}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
