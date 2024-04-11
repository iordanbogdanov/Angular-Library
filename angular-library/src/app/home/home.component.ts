import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { WelcomeMsgComponent } from '../shared/welcome-msg/welcome-msg.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
}
