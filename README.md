Ember Chartjs
==============================================================================

This Ember CLI addon is a simple wrapper for [ChartJS](http://www.chartjs.org/) (v2.1.6). This addon uses Ember-CLI v2.6.2.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


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
