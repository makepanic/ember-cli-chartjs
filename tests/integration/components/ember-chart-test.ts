import {module, test} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
import {render} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {testData} from 'dummy/tests/helpers/ember-chart-data';
import Chart from 'chart.js';
import EmberObject, {computed} from '@ember/object';


module('Integration | Component | ember-chart', function (hooks) {
  setupRenderingTest(hooks);

  test('it can be a pie chart', async function (assert) {
    this.set('data', testData.pieData);
    this.set('onChartCreated', (chart: Chart) => {
      assert.equal(chart.config.type, 'pie');
      assert.equal(chart.data.datasets![0].data!.length, 3);
    });
    await render(hbs`{{ember-chart
      type='pie'
      data=data
      onChartCreated=(action onChartCreated)
    }}`);
  });

  test('it can be a line chart', async function (assert) {
    this.set('data', testData.lineData);
    this.set('onChartCreated', (chart: Chart) => {
      assert.equal(chart.config.type, 'line');
      assert.equal(chart.data.datasets!.length, 2);
    });
    await render(hbs`{{ember-chart
      type='line'
      data=data
      onChartCreated=(action onChartCreated)
    }}`);
  });

  test('it can be a bar chart', async function (assert) {
    this.set('data', testData.barData);
    this.set('onChartCreated', (chart: Chart) => {
      assert.equal(chart.config.type, 'bar');
      assert.equal(chart.data.datasets!.length, 2);
    });
    await render(hbs`{{ember-chart
      type='bar'
      data=data
      onChartCreated=(action onChartCreated)
    }}`);
  });

  test('it can be a radar chart', async function (assert) {
    this.set('data', testData.lineData);
    this.set('onChartCreated', (chart: Chart) => {
      assert.equal(chart.config.type, 'radar');
      assert.equal(chart.data.datasets!.length, 2);
    });
    await render(hbs`{{ember-chart
      type='radar'
      data=data
      onChartCreated=(action onChartCreated)
    }}`);
  });

  test('it can be a polarArea chart', async function (assert) {
    this.set('data', testData.pieData);
    this.set('onChartCreated', (chart: Chart) => {
      assert.equal(chart.config.type, 'polarArea');
      assert.equal(chart.data.datasets![0].data!.length, 3);
    });
    await render(hbs`{{ember-chart
      type='polarArea'
      data=data
      onChartCreated=(action onChartCreated)
    }}`);
  });

  test('it should update pie charts dynamically', async function (assert) {
    let chart!: Chart;

    const dataHolder = EmberObject.extend({
      trasher: 300,
      data: computed('trasher', function(){
        const data = testData.pieData;
        data.datasets[0].data[0] = this.trasher;
        return data;
      }),
    }).create();

    this.set('dataHolder', dataHolder);
    this.set('onChartCreated',
      (newChart: Chart) => chart = newChart);
    await render(hbs`{{ember-chart
      type='pie'
      data=dataHolder.data
      onChartCreated=(action onChartCreated)
    }}`);

    assert.equal(chart!.data.datasets![0].data![0], 300);
    this.set('dataHolder.trasher', 600);
    assert.equal(chart!.data.datasets![0].data![0], 600);
  });

  test('it should update line charts dynamically', async function (assert) {
    let chart!: Chart;
    const dataHolder = EmberObject.extend({
      lineValue1: 65,
      labelValue1: 'January',
      data: computed('lineValue1', 'labelValue1', function(){
        const data = testData.lineData;
        data.datasets[0].data[0] = this.lineValue1;
        data.labels[0] = this.labelValue1;
        return data;
      }),
    }).create();
    this.set('dataHolder', dataHolder);
    this.set('onChartCreated',
      (newChart: Chart) => chart = newChart);
    await render(hbs`{{ember-chart
      type='line'
      data=dataHolder.data
      onChartCreated=(action onChartCreated)
    }}`);

    assert.equal(chart.data.datasets![0].data![0], 65);
    this.set('dataHolder.lineValue1', 105);
    assert.equal(chart.data.datasets![0].data![0], 105);
    this.set('dataHolder.labelValue1', 'December');
    assert.equal(chart.data.labels![0], 'December');
  });

  test('it should update chart options dynamically', async function (assert) {
    let chart!: Chart;
    const dataHolder = EmberObject.extend({
      options: { responsive: true },
      data: testData.lineData,
    }).create();
    this.set('dataHolder', dataHolder);
    this.set('onChartCreated',
      (newChart: Chart) => chart = newChart);
    await render(hbs`{{ember-chart
      type='bar'
      options=dataHolder.options
      data=dataHolder.data
      onChartCreated=(action onChartCreated)
    }}`);

    assert.equal(chart.config.type, 'bar');
    assert.equal(chart.data.datasets!.length, 2);
    // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/pull/36893
    assert.equal(chart.options!.responsive, true);
    assert.equal(chart.config.options!.responsive, true);
    this.set('dataHolder.options', { responsive: false });
    // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/pull/36893
    assert.equal(chart.options!.responsive, false);
    assert.equal(chart.config.options!.responsive, false);
  });

  test('it should rebuild the chart (line -> bar) if the chart type changes', async function (assert) {
    let chart!: Chart;
    const dataHolder = EmberObject.extend({
      type: 'line',
      data: testData.lineData,
    }).create();
    this.set('dataHolder', dataHolder);
    this.set('onChartCreated',
      (newChart: Chart) => chart = newChart);
    await render(hbs`{{ember-chart
      type=dataHolder.type
      data=dataHolder.data
      onChartCreated=(action onChartCreated)
    }}`);

    assert.equal(chart.config.type, 'line');
    this.set('dataHolder.type', 'bar');
    assert.equal(chart.config.type, 'bar');
  });
});
