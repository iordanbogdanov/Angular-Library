import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-welcome-msg',
  templateUrl: './welcome-msg.component.html',
  styleUrls: ['./welcome-msg.component.css'],
})
export class WelcomeMsgComponent {
  constructor(private userService: UserService) {}

  @Input('isLoggedIn') isLoggedIn = this.isLogged;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
}
