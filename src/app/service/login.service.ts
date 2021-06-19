import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //generate token
  public generatetoken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }
  //getCurrent login user from backend
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/currentUser`);
  }
  //save token into local storage
  public loginUser(token) {
    localStorage.setItem("token", token);
    return true;
  }
  // user is login or not
  public isloggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == null || tokenStr == '') {
      return false;
    } else {
      return true;
    }
  }
  //log out user
  public logOutUser() {
    localStorage.removeItem("token");
    return true;
  }
  //get token from localStorage
  public getToken() {
    return localStorage.getItem("token");
  }
  //save userdetail
  public saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  //get userdetail
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logOutUser();
      return null;
    }
  }
  //get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
