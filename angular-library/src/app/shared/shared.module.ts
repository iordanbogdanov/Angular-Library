import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeMsgComponent } from './welcome-msg/welcome-msg.component';
import { RouterModule } from '@angular/router';
import { SlicePipe } from './pipes/slice.pipe';

@NgModule({
  declarations: [WelcomeMsgComponent, SlicePipe],
  imports: [CommonModule, RouterModule],
  exports: [WelcomeMsgComponent, SlicePipe],
})
export class SharedModule {}
