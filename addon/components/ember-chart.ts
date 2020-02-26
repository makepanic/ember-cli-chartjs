import Component from '@glimmer/component';
import {assert} from '@ember/debug';
import {action} from "@ember/object";

let ImportedChartJs: Chart | undefined = undefined;

export async function ensureChartjs(): Promise<Chart> {
  if (ImportedChartJs) return ImportedChartJs;

  // @ts-ignore
  ImportedChartJs = (await import('chart.js')).default as Chart;

  return ImportedChartJs;
}

export interface EmberChartArgs {
  type: Chart.ChartType | string;
  data: Chart.ChartData;
  options: Chart.ChartOptions;
  onChartCreated?: (chart: Chart) => void

  id?: string;
  width?: number;
  height?: number;
}

export default class EmberChart extends Component<EmberChartArgs> {
  private chart!: Chart;

  @action
  didInsert(element: HTMLCanvasElement): void {
    assert('Must have awaited `ensureChartjs`', ImportedChartJs !== undefined);

    this.chart = this.createChart(element);
    this.args.onChartCreated?.(this.chart);
  }

  createChart(element: HTMLCanvasElement): Chart {
    const {type, options, data} = this.args;

    // @ts-ignore
    return new ImportedChartJs(element, {
      type,
      data,
      options: options ?? {}
    });
  }

  @action
  updateChart() {
    const {chart} = this;
    chart.config.data = this.args.data;
    chart.update();
  }

  @action
  redrawChart(element: HTMLCanvasElement) {
    const {chart} = this;
    if (chart) {
      chart.destroy();
    }
    this.chart = this.createChart(element);
    this.args.onChartCreated?.(this.chart);
  }
};
