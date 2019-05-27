import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';

import { RobotService } from '../../services/robot.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-double',
  templateUrl: './double.component.html',
  styleUrls: ['./double.component.css']
})
export class DoubleComponent implements OnInit {

  begin = JSON.parse(localStorage.getItem('begin'));
  generated = false;
  urlSecondPlayer = '';
  activatedSecond = false;
  formFirst: FormGroup;
  formSecond: FormGroup;
  resultMessage = '';
  result = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private robot: RobotService,
    private results: ResultService
  ) { }

  ngOnInit() {
    console.log('params', this.route.snapshot.params, 'uuid in storage', { uuid : localStorage.getItem('secondPlayer') })
    console.log(location.origin)
    console.log('begin ?', localStorage.getItem('begin'), this.begin)

    if (this.route.snapshot.params.uuid.localeCompare(localStorage.getItem('secondPlayer')) === 0) {
      console.log('second player')
      this.activatedSecond = true;
      this.begin = false;
      localStorage.setItem('begin', 'false');
    }
    else {
      this.activatedSecond = false;
    }
    if ((!this.activatedSecond && localStorage.getItem('firstChosen').localeCompare('true') === 0) 
      || (this.activatedSecond && localStorage.getItem('secondChosen').localeCompare('true') === 0))
      this.getResult();
    else this.result = false;
    this.formFirst = this.fb.group({
      option: ['', [Validators.required]]
    });
    this.formSecond = this.fb.group({
      option: ['', [Validators.required]]
    });
  }

  generateLink() {
    localStorage.setItem('secondPlayer', uuid());
    this.urlSecondPlayer = location.origin+'/double/'+localStorage.getItem('secondPlayer');
    this.generated = true;
  }

  startSession() {
    this.begin = false;
    localStorage.setItem('begin', 'false');
    localStorage.setItem('firstChosen', 'false');
    localStorage.setItem('secondChosen', 'false');
  }

  postFirst() {
    localStorage.setItem('firstChoice', this.formFirst.value.option);
    localStorage.setItem('firstChosen', 'true');
    this.getResult();
  }

  postSecond() {
    console.log('second response')
    localStorage.setItem('secondChoice', this.formSecond.value.option);
    localStorage.setItem('secondChosen', 'true');
    this.getResult();
  }

  getResult() {
    if ((!this.activatedSecond && localStorage.getItem('firstChosen').localeCompare('true') === 0) 
      || (this.activatedSecond && localStorage.getItem('secondChosen').localeCompare('true') === 0))
      this.result = true;
    else this.result = false;
    switch (true) {
      case localStorage.getItem('firstChosen').localeCompare('true') !== 0 
        && localStorage.getItem('secondChosen').localeCompare('true') === 0: {
        this.resultMessage = 'waiting for first player ...';
        break;
      }
      case localStorage.getItem('firstChosen').localeCompare('true') === 0 
        && localStorage.getItem('secondChosen').localeCompare('true') !== 0: {
        this.resultMessage = 'waiting for second player ...';
        break;
      }
      case localStorage.getItem('firstChosen').localeCompare('true') === 0 
        && localStorage.getItem('secondChosen').localeCompare('true') === 0: {
        this.resultMessage = this.results.getResult(localStorage.getItem('firstChoice'), localStorage.getItem('secondChoice'));
        break;
      }
    }
  }

  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }

  reset() {
    this.begin = true;
    this.generated = false;
    this.result = false;
    this.resultMessage = '';
    this.activatedSecond = false;
    localStorage.clear();
    localStorage.setItem('begin', 'true');
    localStorage.setItem('firstChosen', 'false');
    localStorage.setItem('secondChosen', 'false');
  }

}
