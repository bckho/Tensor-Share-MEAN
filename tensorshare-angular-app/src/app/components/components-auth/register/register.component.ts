import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterModel } from '../../../services/models/RegisterModel';

export class RegisterErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private _snackbar: MatSnackBar, private router: Router) { }

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9_-]{3,16}$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern("^.{5,100}$")
    ])
  })

  matcher = new RegisterErrorStateMatcher();

  openSuccessSnackbar(): void {
    this._snackbar.open("Account successfully created, you will be automatically redirected!");
    setTimeout(() => {
      this._snackbar.dismiss();
    }, 3000);
  }

  openErrorSnackbar(message: string): void {
    this._snackbar.open(message, "OK");
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registration = new RegisterModel(
        this.registerForm.get("email")!.value,
        this.registerForm.get("username")!.value,
        this.registerForm.get("password")!.value
      )

      this.authService.register(registration).subscribe(() => {
        this.openSuccessSnackbar();
        setTimeout(() => {
          this.router.navigate(['/Login'])
        }, 2000)
      }, () => {
        // Specify message
        this.openErrorSnackbar("Failed to register a new account, username and/or email are already taken!");
      });
    }
  }
}
