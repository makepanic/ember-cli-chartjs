// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/ember-chart';
import Component from '@ember/component';
import Chart from 'chart.js';

export default class EmberChart extends Component {
  layout = layout;

  private chart!: Chart;

  width: number = 600;

  height: number = 600;

  type!: Chart.ChartType | string;

  data!: Chart.ChartData;

  options!: Chart.ChartOptions;

  onChartCreated: (chart: Chart) => void = () => {};

  didInsertElement(): void {
    super.didInsertElement();

    this.chart = this.createChart();
    this.onChartCreated(this.chart);

    this.addObserver('data', this, this.updateChart);
    this.addObserver(
      // @ts-ignore
      'data.[]',
      this, this.updateChart);

    this.addObserver('options', this, this.redrawChart);
    this.addObserver('type', this, this.redrawChart);
  }

  createChart(): Chart {
    const context = this.element.querySelector('canvas');
    const {type, options, data} = this;

    return new Chart(context!, {
      type,
      data,
      options: options || {}
    });
  }

  updateChart() {
    const {data, chart} = this;
    chart.config.data = data;
    chart.update();
  }

  redrawChart() {
    const {chart} = this;
    if (chart) {
      chart.destroy();
    }
    this.chart = this.createChart();
    this.onChartCreated(this.chart);
  }
};
