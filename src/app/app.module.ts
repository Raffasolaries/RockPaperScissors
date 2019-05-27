import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule, MatGridListModule, MatRadioModule, MatButtonModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingleComponent } from './play/single/single.component';
import { DoubleComponent } from './play/double/double.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { RobotService } from './services/robot.service';

@NgModule({
  declarations: [
    AppComponent,
    SingleComponent,
    DoubleComponent,
    WelcomeComponent
  ],
  imports: [
    MatCardModule, MatGridListModule, MatRadioModule, MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RobotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
