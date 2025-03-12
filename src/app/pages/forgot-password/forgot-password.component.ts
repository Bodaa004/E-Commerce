import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  step: number = 1;
  isLoading: boolean = false;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
  });

  verifyEmailSubmit(): void {
    let emailValue = this.verifyEmail.get('email')?.value;

    this.resetPassword.get('email')?.patchValue(emailValue);

    this.isLoading = true;
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          setTimeout(() => {
            this.step = 2;
          }, 500);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  verifyCodeSubmit(): void {
    this.isLoading = true;
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          setTimeout(() => {
            this.step = 3;
          }, 500);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  resetPasswordSubmit(): void {
    this.isLoading = true;
    this._AuthService.setResetPass(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData();

        setTimeout(() => {
          this._Router.navigate(['/home']);
        }, 500);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
