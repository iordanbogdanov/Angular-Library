import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { ProfileDetails } from 'src/app/types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  showEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    username: '',
    email: '',
    _id: '',
  };

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.user) {
      const { username, email, _id } = this.userService.user;
      this.profileDetails = {
        username,
        email,
        _id,
      };
      console.log(this.profileDetails);

      this.form.setValue({
        username,
        email,
      });
    }
  }
}
