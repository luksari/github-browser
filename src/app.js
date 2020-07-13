import './assets/scss/app.scss';
import $ from 'cash-dom';
import { AppController } from './controllers/AppController';
import { DataModel } from './models/DataModel';


export class App {
  constructor() {
    this.controller;
  }
  
  initializeApp() {
    this.controller = new AppController();
  }

  initializeListeners() {
    
  }

}
