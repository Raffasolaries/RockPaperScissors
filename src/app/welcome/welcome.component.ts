import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  title = 'Rock Paper Scissors';
  formChoose: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formChoose = this.fb.group({
      option: ['single', [Validators.required]]
    });
  }

  begin() {
    if (this.formChoose.value.option.localeCompare('single') === 0)
      this.router.navigate(['/single']);
    if (this.formChoose.value.option.localeCompare('double') === 0) {
      localStorage.setItem('begin', 'true');
      localStorage.setItem('firstChosen', 'false');
      localStorage.setItem('secondChosen', 'false');
      this.router.navigate(['/double/'+uuid()]);
    }
  }

}
