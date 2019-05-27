import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }

  getResult(first, second) {
    switch (true) {
      case first.localeCompare(second) === 0: {
        return 'Pair!';
      }
      case first.localeCompare('paper') === 0 
        && second.localeCompare('rock') === 0: {
        return 'First player win!'
      }
      case first.localeCompare('paper') === 0 
        && second.localeCompare('scissors') === 0: {
        return 'Second player win!'
      }
      case first.localeCompare('rock') === 0 
        && second.localeCompare('scissors') === 0: {
        return 'First player win!'
      }
      case first.localeCompare('rock') === 0 
        && second.localeCompare('scissors') === 0: {
        return 'First player win!'
      }
      case first.localeCompare('rock') === 0 
        && second.localeCompare('paper') === 0: {
        return 'Second player win!'
      }
      case first.localeCompare('scissors') === 0 
        && second.localeCompare('paper') === 0: {
        return 'First player win!'
      }
      case first.localeCompare('scissors') === 0 
        && second.localeCompare('rock') === 0: {
        return 'Second player win!'
      }
    }
  }

}
