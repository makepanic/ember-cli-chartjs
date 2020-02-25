
import Route from '@ember/routing/route';
import { ensureChartjs } from '@makepanic/ember-cli-chartjs/components/ember-chart';

export default class Application extends Route {
  beforeModel(){
    return ensureChartjs();
  }
}
