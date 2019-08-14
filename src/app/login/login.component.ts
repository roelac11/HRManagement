import { AppComponent } from '../app.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = false;

  constructor(private fb: FormBuilder, private router: Router) {
    // localStorage.clear();

    this.loginForm = fb.group({
      username: ['laura', [Validators.required]],
      password: ['password', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (
      this.loginForm.get('username').value === 'laura' &&
      this.loginForm.get('password').value === 'password'
    ) {
      localStorage.setItem('loggedIn', 'true');
      // console.log('loginComponent... ' + localStorage.getItem('loggedIn'));
      this.loginError = false;

      this.router.navigateByUrl('/main');
    } else {
      localStorage.setItem('loggedIn', 'false');
      this.loginError = true;
    }
  }
}
