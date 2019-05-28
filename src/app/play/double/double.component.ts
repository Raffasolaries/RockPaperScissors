import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  params = {};
  generated = false;
  urlSecondPlayer = '';
  activatedSecond = false;
  formFirst: FormGroup;
  formSecond: FormGroup;
  resultMessage = '';
  result = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private results: ResultService
  ) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
    console.log('params', this.route.snapshot.params, 'uuid in storage', { uuid : localStorage.getItem('secondPlayer') })
    console.log(location.origin)
    console.log('begin ?', localStorage.getItem('begin'), this.begin)

    if (this.params['uuid'] === localStorage.getItem('secondPlayer')) {
      console.log('second player')
      this.activatedSecond = true;
      this.begin = false;
      localStorage.setItem('begin', 'false');
    }
    else {
      this.activatedSecond = false;
    }
    /* if ((!this.activatedSecond && localStorage.getItem('firstChosen') === 'true') 
      || (this.activatedSecond && localStorage.getItem('secondChosen') === 'true'))
      this.getResult();
    else this.result = false; */
    this.createForm();
  }

  createForm() {
    this.formFirst = this.fb.group({
      option: ['', [Validators.required]]
    });
    this.formSecond = this.fb.group({
      option: ['', [Validators.required]]
    });
    this.getResult().subscribe(res => {
      this.result = res['result'];
      this.resultMessage = res['message'];
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

  postValue() {
    /* localStorage.setItem('firstChoice', this.formFirst.value.option);
    localStorage.setItem('firstChosen', 'true'); */
    this.getResult().subscribe(res => {
      this.result = res['result'];
      this.resultMessage = res['message'];
    });
  }

  postSecond() {
    console.log('second response')
    localStorage.setItem('secondChoice', this.formSecond.value.option);
    localStorage.setItem('secondChosen', 'true');
    this.getResult().subscribe(res => {
      this.result = res['result'];
      this.resultMessage = res['message'];
      location.reload();
    });
  }

  getResult() {
    return new Observable(observer => {
      console.log('forms', this.formFirst, this.formSecond)
      if (!this.activatedSecond && this.formFirst.value.option) {
        localStorage.setItem('firstChoice', this.formFirst.value.option);
        localStorage.setItem('firstChosen', 'true');
      }
      if (this.activatedSecond && this.formSecond.value.option) {
        localStorage.setItem('secondChoice', this.formSecond.value.option);
        localStorage.setItem('secondChosen', 'true');
      }
      if ((!this.activatedSecond && localStorage.getItem('firstChosen') === 'true') 
      || (this.activatedSecond && localStorage.getItem('secondChosen') === 'true'))
        this.result = true;
      else this.result = false;
      switch (true) {
        case localStorage.getItem('firstChosen') !== 'true' 
          && localStorage.getItem('secondChosen') === 'true': {
          this.resultMessage = 'waiting for first player ...';
          break;
        }
        case localStorage.getItem('firstChosen') === 'true' 
          && localStorage.getItem('secondChosen') !== 'true': {
          this.resultMessage = 'waiting for second player ...';
          break;
        }
        case localStorage.getItem('firstChosen') === 'true' 
          && localStorage.getItem('secondChosen') === 'true': {
          this.resultMessage = this.results.getResult(localStorage.getItem('firstChoice'), localStorage.getItem('secondChoice'));
          break;
        }
      }
      observer.next({
        message: this.resultMessage,
        result: this.result
      });
      observer.complete();
    })
    
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
    localStorage.setItem('secondPlayer', '123456');
    localStorage.setItem('firstChoice', '');
    localStorage.setItem('secondChoice', '');
    localStorage.setItem('firstChosen', 'false');
    localStorage.setItem('secondChosen', 'false');
  }

  dismiss() {
    this.reset();
    this.location.back();
  }

}
