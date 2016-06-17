import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EarthquakeListService} from '../services/earthquake-list.service';
import {Data} from '../../providers/data/data';

@Component({
  templateUrl: 'build/pages/about-page/earthquake-list.html'
})
export class AboutPage {
  private earthquakes: any;
  private errorMessage: any;
  private earthquakeService = null;

  private savedEarthquakes = [];
  private markedEarthquakes = [];

  constructor(private navController: NavController,
      _quakeService : EarthquakeListService,
      private dataService: Data) {

      this.earthquakeService = _quakeService;
      this.getSavedEarthquakes();

  }

  ngOnInit() {
    this.getEarthquakeList();
  }

  getEarthquakeList() {
    this.earthquakeService.findEarthquakes('')
    .subscribe(eqf => this.earthquakes = eqf,
    error => this.errorMessage = <any>error);

  }

  saveItem(item) {
    this.savedEarthquakes.push(item);
    this.dataService.save(this.savedEarthquakes);
  }

  viewSaved() {
      this.getSavedEarthquakes();
      if (this.savedEarthquakes) {
        this.earthquakes = this.savedEarthquakes;
      }

  }

  getSavedEarthquakes() {
    this.dataService.getData().then((earthquakes) => {
      if (earthquakes) {
        this.savedEarthquakes = JSON.parse(earthquakes);

      }
    });
  }

  markToSave(item, $event) {
    let t = $event.currentTarget;
    t.name = "star-outline";
    this.markedEarthquakes.push(item);

  }



}
