import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  options = ['rock', 'paper', 'scissors'];

  constructor() { }

  getRandom() {
    return this.options[Math.floor(Math.random()*this.options.length)];
  }

}
