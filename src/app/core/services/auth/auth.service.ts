import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  userData: any = null;

  baseURL: string = 'https://ecommerce.routemisr.com';

  sendRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/auth/signup`,
      data
    );
  }
  sendLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/auth/signin`,
      data
    );
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') != null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }

  setEmailVerify(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/auth/forgotPasswords`,
      data
    );
  }


  setCodeVerify(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/auth/verifyResetCode`,
      data
    );
  }




  setResetPass(data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseURL}/api/v1/auth/resetPassword`,
      data
    );
  }





}
