import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule, ActivatedRoute, Routes } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule, MatRadioModule } from '@angular/material';
import { Subject, Observable, of } from 'rxjs';

import { DoubleComponent } from './double.component';

const routes: Routes = [
  {
    path: 'double/:uuid',
    component: DoubleComponent
  }
];

describe('DoubleComponent', () => {
  let component: DoubleComponent;
  let fixture: ComponentFixture<DoubleComponent>;
  let mockRoute: any = {
    parent: { params: of({ uuid: '11234234' }) },
    params: of({ uuid: '11234234' }),
    queryParams: new Subject<any>(),
    snapshot: {
      params: of({ uuid: '11234234' })
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        RouterModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatGridListModule
      ],
      declarations: [ DoubleComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockRoute
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
