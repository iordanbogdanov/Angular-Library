import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeMsgComponent } from './welcome-msg/welcome-msg.component';



@NgModule({
  declarations: [WelcomeMsgComponent],
  imports: [
    CommonModule
  ],
  exports: [
    WelcomeMsgComponent,
  ],
})
export class SharedModule { }
