import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SingleComponent } from './play/single/single.component';
import { DoubleComponent } from './play/double/double.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  }, {
    path: 'single',
    component: SingleComponent
  }, {
    path: 'double/:uuid',
    component: DoubleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
