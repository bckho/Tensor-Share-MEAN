import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormErrorStateMatcher } from 'src/app/util/FormErrorStateMatcher';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginModel } from '../../../services/models/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000)
    ]),
  });

  matcher = new FormErrorStateMatcher();

  ngOnInit(): void { }

  openErrorSnackBar(message: string): void {
    this._snackbar.open(message, 'OK');
  }

  openSuccessSnackbar(): void {
    this._snackbar.open(
      'Login successful, you will be automatically redirected!'
    );
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const loginModel = new LoginModel(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      );

      this.authService.login(loginModel).subscribe(
        (result) => {
          const { authtoken, user } = result;
          const { _id, username } = user;

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('authtoken', authtoken);
          localStorage.setItem('_id', _id);

          this.openSuccessSnackbar();

          setTimeout(() => {
            this._snackbar.dismiss()
            this.router.navigate([`/${username}/TensorModels`]);
          }, 2000);

        },
        () => {
          this.openErrorSnackBar(
            'Authentication failed, try login again with the correct credentials!'
          );
        }
      );
    }
  }
}
