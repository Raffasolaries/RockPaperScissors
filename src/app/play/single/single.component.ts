import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { RobotService } from '../../services/robot.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  chosen = false;
  formChoose: FormGroup;
  yourChoice = '';
  opponentChoice = '';
  resultMessage = '';

  constructor(
    private fb: FormBuilder,
    private robot: RobotService,
    private results: ResultService
  ) { }

  ngOnInit() {
    this.formChoose = this.fb.group({
      option: ['', [Validators.required]]
    })
  }

  getOpponent() {
    console.log('opponent response')
    this.yourChoice = this.formChoose.value.option;
    this.opponentChoice = this.robot.getRandom();
    this.resultMessage = this.results.getResult(this.yourChoice, this.opponentChoice);
    this.chosen = true;
  }

  reset() {
    this.chosen = false;
  }

}
