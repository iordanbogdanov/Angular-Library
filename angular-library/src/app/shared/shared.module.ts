import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeMsgComponent } from './welcome-msg/welcome-msg.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WelcomeMsgComponent],
  imports: [CommonModule, RouterModule],
  exports: [WelcomeMsgComponent],
})
export class SharedModule {}
